import { NumberType } from "../support/NumberType.js";
export var ShaderDataType;
(function (ShaderDataType) {
    ShaderDataType[ShaderDataType["FLOAT_1"] = NumberType.FLOAT.valueOf()] = "FLOAT_1";
    ShaderDataType[ShaderDataType["FLOAT_2"] = NumberType.FLOAT.valueOf() * 2] = "FLOAT_2";
    ShaderDataType[ShaderDataType["FLOAT_3"] = NumberType.FLOAT.valueOf() * 3] = "FLOAT_3";
    ShaderDataType[ShaderDataType["FLOAT_4"] = NumberType.FLOAT.valueOf() * 4] = "FLOAT_4";
    ShaderDataType[ShaderDataType["INT_1"] = NumberType.INT.valueOf()] = "INT_1";
    ShaderDataType[ShaderDataType["INT_2"] = NumberType.INT.valueOf() * 2] = "INT_2";
    ShaderDataType[ShaderDataType["INT_3"] = NumberType.INT.valueOf() * 3] = "INT_3";
    ShaderDataType[ShaderDataType["INT_4"] = NumberType.INT.valueOf() * 4] = "INT_4";
})(ShaderDataType || (ShaderDataType = {}));
export function getComponentCountFromShaderDataType(type) {
    switch (type) {
        case ShaderDataType.FLOAT_1: return 1;
        case ShaderDataType.FLOAT_2: return 2;
        case ShaderDataType.FLOAT_3: return 3;
        case ShaderDataType.FLOAT_4: return 4;
        case ShaderDataType.INT_1: return 1;
        case ShaderDataType.INT_2: return 2;
        case ShaderDataType.INT_3: return 3;
        case ShaderDataType.INT_4: return 4;
    }
    throw new Error("ShaderDataType [ " + type + " ] not supported");
}
