export function flatten(arr) {
    return [].concat.apply([], arr);
}

export function h(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: flatten(children) || []
    };
}
