import { Time } from "./Time.js";
import { Layer } from "./layer/namespace/layer.js";
import { EventSystem } from "./events_system/namespace/event_system.js";
import { GraphicsEngine } from "./graphics_engine/namespace/graphics_engine.js";
export class Engine extends GraphicsEngine.GraphicsApplication {
    constructor(parentElement, api = GraphicsEngine.RendererAPI.WEB_GL) {
        super(parentElement);
        GraphicsEngine.Renderer.setAPI(api);
        this.shaderProgramLibrary = new GraphicsEngine.ShaderProgramLibrary();
        this.layerStack = new Layer.BaseLayerStack();
        this.element = new EventSystem.Element(16);
        this.mouse = new EventSystem.Mouse(16);
        this.keyboard = new EventSystem.Keyboard(16);
        this.time = new Time();
        EventSystem.Input.instance = new EventSystem.BaseInput(this.mouse, this.keyboard);
    }
    init() {
        super.init();
        const graphicsElement = this.getGraphicsElement();
        this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());
        const canvasElement = graphicsElement.getCanvasElement();
        this.addMouseListener(canvasElement);
        this.addKeyboardListener(canvasElement);
        this.addElementListener(graphicsElement);
    }
    input() {
        super.input();
        const layers = this.layerStack.getLayers()
            .reverse();
        const mouseEvent = this.mouse.read();
        if (mouseEvent.isValid()) {
            for (let layer of layers) {
                layer.mouseInput(mouseEvent);
            }
        }
        const keyboardEvent = this.keyboard.readKey();
        if (keyboardEvent.isValid()) {
            for (let layer of layers) {
                layer.keyboardInput(keyboardEvent);
            }
        }
        const elementEvent = this.element.read();
        if (elementEvent.isValid()) {
            for (let layer of layers) {
                layer.elementInput(elementEvent);
            }
        }
    }
    update(timestamp) {
        super.update(timestamp);
        this.time.update(timestamp);
        const layers = this.layerStack.getLayers();
        for (let layer of layers) {
            layer.update(this.time);
        }
        this.mouse.updateDirection();
    }
    render() {
        const layers = this.layerStack.getLayers();
        for (let layer of layers) {
            layer.render();
        }
    }
    clean() {
        this.mouse.flush();
        this.keyboard.flush();
        this.element.flush();
        const layers = this.layerStack.getLayers();
        for (let layer of layers) {
            layer.clean();
        }
        this.shaderProgramLibrary.clean();
        Engine.renderer2D.clean();
        super.clean();
    }
    init2DRenderer(shaderProgram = null) {
        const context = this.getContext();
        if (shaderProgram === null) {
            shaderProgram = GraphicsEngine.ShaderProgramFactory.createProgram(context, "2D Default Shader Program", GraphicsEngine.Default2DShader.getVertexShader(), GraphicsEngine.Default2DShader.getFragmentShader());
        }
        this.saveShaderProgram(shaderProgram);
        Engine.renderer2D = GraphicsEngine.RendererFactory.create2D(context);
        Engine.renderer2D.init(context, shaderProgram);
    }
    saveShaderProgram(shaderProgram) {
        this.shaderProgramLibrary.add(shaderProgram);
    }
    pushLayer(layer) {
        this.layerStack.push(layer);
    }
    pushOverlayLayer(layer) {
        this.layerStack.pushOverlay(layer);
    }
    getContext() {
        return this.getGraphicsElement().getGraphicsContext();
    }
    addMouseListener(canvasElement) {
        canvasElement.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.mouse.onLeftKeyPressed(event.offsetX, event.offsetY);
                return;
            }
            if (event.button === 2) {
                this.mouse.onRightKeyPressed(event.offsetX, event.offsetY);
                return;
            }
        });
        canvasElement.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.mouse.onLeftKeyReleased(event.offsetX, event.offsetY);
                return;
            }
            if (event.button === 2) {
                this.mouse.onRightKeyReleased(event.offsetX, event.offsetY);
                return;
            }
        });
        canvasElement.addEventListener('mousemove', (event) => this.mouse.onMouseMove(event.offsetX, event.offsetY));
        canvasElement.addEventListener('mouseenter', () => this.mouse.onMouseEnter());
        canvasElement.addEventListener('mouseleave', () => this.mouse.onMouseLeave());
    }
    addKeyboardListener(canvasElement) {
        document.addEventListener("keydown", (event) => this.keyboard.onKeyPressed(event.code), false);
        document.addEventListener("keyup", (event) => this.keyboard.onKeyReleased(event.code), false);
        document.addEventListener("keypress", (event) => this.keyboard.onChar(event.key), false);
    }
    addElementListener(graphicsElement) {
        window.addEventListener("resize", () => {
            graphicsElement.resize();
            this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());
        });
    }
}
