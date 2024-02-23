export function NewBufferElement(type, name, normalized = false) {
    return {
        type: type,
        name: name,
        size: type.valueOf(),
        offset: 0,
        normalized: normalized
    };
}
