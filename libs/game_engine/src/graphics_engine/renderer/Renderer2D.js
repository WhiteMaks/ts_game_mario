import { Vector4 } from "../maths/impl/Vector4";
import { ResourceFactory } from "../factories/ResourceFactory";
import { BufferLayout } from "../buffer/BufferLayout";
import { NewBufferElement } from "../buffer/BufferElement";
import { ShaderDataType } from "../shader/ShaderDataType";
import { BufferFactory } from "../factories/BufferFactory";
import { Vector3 } from "../maths/impl/Vector3";
import { Transformation } from "../maths/support/Transformation";
import { RendererStatistics } from "./RendererStatistics";
import { Vector2 } from "../maths/impl/Vector2";
export class Renderer2D {
    constructor() {
        this.quadVertexBuffer = new Float32Array(0);
        this.quadVertexBufferIndex = 0;
        this.quadIndexCount = 0;
        this.textureSlots = new Array(Renderer2D.maxTextureSlots);
        this.textureSlotIndex = 1;
        this.quadPositions = [
            new Vector4(-0.5, -0.5, 0.0, 1.0),
            new Vector4(0.5, -0.5, 0.0, 1.0),
            new Vector4(0.5, 0.5, 0.0, 1.0),
            new Vector4(-0.5, 0.5, 0.0, 1.0)
        ];
        this.textureCoordinates = [
            new Vector2(0.0, 0.0),
            new Vector2(1.0, 0.0),
            new Vector2(1.0, 1.0),
            new Vector2(0.0, 1.0)
        ];
        this.statistics = new RendererStatistics();
    }
    init(context, shaderProgram) {
        this.shaderProgram = shaderProgram;
        this.whiteColor = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.whiteTexture = ResourceFactory.create2DFullWhiteTexture(context);
        this.initImpl();
        const bufferLayout = new BufferLayout([
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Position"),
            NewBufferElement(ShaderDataType.FLOAT_4, "a_Color"),
            NewBufferElement(ShaderDataType.FLOAT_2, "a_TextureCoordinate"),
            NewBufferElement(ShaderDataType.FLOAT_1, "a_TextureIndex"),
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Translate"),
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Rotation"),
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Scale"),
        ]);
        this.vertexBuffer = BufferFactory.createFloat32VertexDynamicBuffer(context, Renderer2D.maxVertices * bufferLayout.sizeof());
        this.vertexBuffer.setLayout(bufferLayout);
        this.quadVertexBuffer = new Float32Array(Renderer2D.maxVertices * bufferLayout.sizeof());
        const indexes = new Uint16Array(Renderer2D.maxIndices);
        let offset = 0;
        for (let i = 0; i < indexes.length; i += 6) {
            indexes[i] = offset;
            indexes[i + 1] = offset + 1;
            indexes[i + 2] = offset + 2;
            indexes[i + 3] = offset + 2;
            indexes[i + 4] = offset + 3;
            indexes[i + 5] = offset;
            offset += 4;
        }
        const indexBuffer = BufferFactory.createUint16IndexStaticBuffer(context, indexes);
        this.vertexArray = BufferFactory.createVertexArrayBuffer(context);
        this.vertexArray.addVertexBuffer(this.vertexBuffer);
        this.vertexArray.setIndexBuffer(indexBuffer);
        this.vertexArray.unbind();
        this.vertexBuffer.unbind();
        indexBuffer.unbind();
        const samplers = new Array(Renderer2D.maxTextureSlots);
        for (let i = 0; i < Renderer2D.maxTextureSlots; i++) {
            samplers[i] = i;
        }
        this.shaderProgram.bind();
        this.shaderProgram.setValueArrayI("u_Textures", samplers);
        this.shaderProgram.unbind();
        this.textureSlots[0] = this.whiteTexture;
        this.statistics.increaseTextureSlotsCount();
    }
    begin(camera) {
        this.shaderProgram.bind();
        this.shaderProgram.setMatrix4f("u_ViewProjectionMatrix", camera.getViewProjectionMatrix());
        this.quadIndexCount = 0;
        this.quadVertexBufferIndex = 0;
        this.textureSlotIndex = 1;
    }
    drawQuadWithColor(position, rotation, scale, color) {
        this.drawQuad(position, rotation, scale, color, this.whiteTexture, this.textureCoordinates);
    }
    drawQuadWithTexture(position, rotation, scale, texture) {
        this.drawQuad(position, rotation, scale, this.whiteColor, texture, this.textureCoordinates);
    }
    drawQuadWithSprite(position, rotation, scale, sprite) {
        this.drawQuad(position, rotation, scale, this.whiteColor, sprite.getTexture(), sprite.getCoordinates());
    }
    drawQuad(position, rotation, scale, color, texture, textureCoordinates) {
        if (this.quadIndexCount >= Renderer2D.maxIndices) {
            this.newBatch();
        }
        let textIndex = -1;
        for (let i = 0; this.textureSlotIndex; i++) {
            if (!this.textureSlots[i]) {
                break;
            }
            if (this.textureSlots[i].equal(texture)) {
                textIndex = i;
                break;
            }
        }
        if (textIndex === -1) {
            textIndex = this.textureSlotIndex;
            this.textureSlots[this.textureSlotIndex] = texture;
            this.statistics.increaseTextureSlotsCount();
            this.textureSlotIndex++;
        }
        const rotationInRadians = new Vector3(Transformation.degreesToRadians(rotation.getX()), Transformation.degreesToRadians(rotation.getY()), Transformation.degreesToRadians(rotation.getZ()));
        this.fillQuadVertexBuffer(this.quadPositions[0], color, textureCoordinates[0], textIndex, position, rotationInRadians, scale);
        this.fillQuadVertexBuffer(this.quadPositions[1], color, textureCoordinates[1], textIndex, position, rotationInRadians, scale);
        this.fillQuadVertexBuffer(this.quadPositions[2], color, textureCoordinates[2], textIndex, position, rotationInRadians, scale);
        this.fillQuadVertexBuffer(this.quadPositions[3], color, textureCoordinates[3], textIndex, position, rotationInRadians, scale);
        this.quadIndexCount += 6;
        this.statistics.increaseQuadsCount();
    }
    end() {
        this.vertexBuffer.setFloat32Data(this.quadVertexBuffer.subarray(0, this.quadVertexBufferIndex));
        this.vertexArray.bind();
        for (let i = 0; i < Renderer2D.maxTextureSlots; i++) {
            const textureSlot = this.textureSlots[i];
            if (!textureSlot) {
                break;
            }
            textureSlot.bind(i);
        }
        this.drawTrianglesImpl(this.vertexArray, this.quadIndexCount);
        this.statistics.increaseDrawMethodCallsCount();
    }
    newBatch() {
        this.end();
        this.quadIndexCount = 0;
        this.quadVertexBufferIndex = 0;
        this.textureSlotIndex = 1;
    }
    fillQuadVertexBuffer(position, color, textureCoordinates, textureIndex, translate, rotation, scale) {
        this.quadVertexBuffer[this.quadVertexBufferIndex] = position.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 1] = position.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 2] = position.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 3] = color.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 4] = color.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 5] = color.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 6] = color.getW();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 7] = textureCoordinates.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 8] = textureCoordinates.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 9] = textureIndex;
        this.quadVertexBuffer[this.quadVertexBufferIndex + 10] = translate.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 11] = translate.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 12] = translate.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 13] = rotation.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 14] = rotation.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 15] = rotation.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 16] = scale.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 17] = scale.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 18] = scale.getZ();
        this.quadVertexBufferIndex += 19;
    }
    getStatics() {
        return this.statistics;
    }
    resetStatistics() {
        this.statistics.reset();
    }
    clean() {
        this.vertexBuffer.clean();
        this.vertexArray.clean();
        for (const textureSlot of this.textureSlots) {
            if (!textureSlot) {
                break;
            }
            textureSlot.clean();
        }
        this.shaderProgram.clean();
    }
}
Renderer2D.maxQuads = 10000;
Renderer2D.maxVertices = Renderer2D.maxQuads * 4;
Renderer2D.maxIndices = Renderer2D.maxQuads * 6;
Renderer2D.maxTextureSlots = 16;
