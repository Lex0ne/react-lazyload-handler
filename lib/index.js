'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyLoadHandler = function (_React$Component) {
    _inherits(LazyLoadHandler, _React$Component);

    function LazyLoadHandler(props) {
        _classCallCheck(this, LazyLoadHandler);

        var _this = _possibleConstructorReturn(this, (LazyLoadHandler.__proto__ || Object.getPrototypeOf(LazyLoadHandler)).call(this, props));

        _this.lazyLoadHandler = _this.lazyLoadHandler.bind(_this);
        return _this;
    }

    _createClass(LazyLoadHandler, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, _) {
            return !nextProps.isDisposeObserverOnLoad;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var componentNode = _reactDom2.default.findDOMNode(this);
            this.viewportChangeObserver = _rx2.default.Observable.merge(_rx2.default.Observable.fromEvent(window, 'scroll'), _rx2.default.Observable.fromEvent(window, 'resize'));

            if (this.props.debounce) {
                this.viewportChangeObserver = this.viewportChangeObserver.debounce(this.props.debounce);
            }

            if (this.props.throttle) {
                this.viewportChangeObserver = this.viewportChangeObserver.throttle(this.props.throttle);
            }

            this.viewportChangeObserver.map(function () {
                return (0, _utils.isElementPartInViewport)(componentNode);
            }).distinctUntilChanged().filter(function (value) {
                return value;
            }).subscribe(this.lazyLoadHandler);

            if ((0, _utils.isElementPartInViewport)(componentNode)) {
                this.lazyLoadHandler();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.viewportChangeObserver.dispose();
        }
    }, {
        key: 'lazyLoadHandler',
        value: function lazyLoadHandler() {
            if (this.props.isDisposeObserverOnLoad) {
                this.viewportChangeObserver.dispose();
            }
            this.props.onContentVisible();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return LazyLoadHandler;
}(_react2.default.Component);

LazyLoadHandler.propTypes = {
    isDisposeObserverOnLoad: _react2.default.PropTypes.bool,
    onContentVisible: _react2.default.PropTypes.func,
    debounce: _react2.default.PropTypes.number,
    throttle: _react2.default.PropTypes.number
};
LazyLoadHandler.defaultProps = {
    onContentVisible: function onContentVisible() {},
    isDisposeObserverOnLoad: true,
    debounce: 0,
    throttle: 0
};
exports.default = LazyLoadHandler;