function getViewport() {
    let container = window;
    let key = 'inner';
    if (!container.innerWidth) {
        key = 'client';
        container = document.documentElement || document.body;
    }
    return {
        width: container[`${key}Width`],
        height: container[`${key}Height`],
    };
}

export function isElementPartInViewport(node) {
    const clientRect = node.getBoundingClientRect();
    const viewport = getViewport();
    const aboveViewPort = clientRect.top < 0 && clientRect.bottom < 0;
    const belowViewPort = clientRect.top > viewport.height && clientRect.bottom > viewport.height;
    const leftOfViewPort = clientRect.left < 0 && clientRect.right < 0;
    const rightOfViewPort = clientRect.left > viewport.width && clientRect.right > viewport.width;
    if (aboveViewPort || belowViewPort || leftOfViewPort || rightOfViewPort) {
        return false;
    }
    return true;
}