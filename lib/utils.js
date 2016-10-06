'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isElementPartInViewport = isElementPartInViewport;

var _ref = function () {
    var container = window;
    var key = 'inner';
    if (!container.innerWidth) {
        key = 'client';
        container = document.documentElement || document.body;
    }
    return { key: key, container: container };
}();

var key = _ref.key;
var container = _ref.container;


function getViewport() {
    return {
        width: container[key + 'Width'],
        height: container[key + 'Height']
    };
}

function isElementPartInViewport(node) {
    var clientRect = node.getBoundingClientRect();
    var viewport = getViewport();
    var aboveViewPort = clientRect.top < 0 && clientRect.bottom < 0;
    var belowViewPort = clientRect.top > viewport.height && clientRect.bottom > viewport.height;
    var leftOfViewPort = clientRect.left < 0 && clientRect.right < 0;
    var rightOfViewPort = clientRect.left > viewport.width && clientRect.right > viewport.width;
    if (aboveViewPort || belowViewPort || leftOfViewPort || rightOfViewPort) {
        return false;
    }
    return true;
}