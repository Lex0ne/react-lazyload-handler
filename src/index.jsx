import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';
import { isElementPartInViewport } from './utils';


export default class LazyLoadHandler extends React.Component {
    static propTypes = {
        isDisposeObserverOnLoad: React.PropTypes.bool,
        onContentVisible: React.PropTypes.func,
        debounce: React.PropTypes.number,
        throttle: React.PropTypes.number,
    };

    static defaultProps = {
        onContentVisible: () => {},
        isDisposeObserverOnLoad: true,
        debounce: 0,
        throttle: 0,
    };

    constructor(props) {
        super(props);
        this.lazyLoadHandler = this.lazyLoadHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, _) {
        return !nextProps.isDisposeObserverOnLoad;
    }

    componentDidMount() {
        const componentNode = ReactDOM.findDOMNode(this);
        this.viewportChangeObserver = Rx.Observable.merge(
            Rx.Observable.fromEvent(window, 'scroll'),
            Rx.Observable.fromEvent(window, 'resize'),
        );

        if (this.props.debounce) {
            this.viewportChangeObserver = this.viewportChangeObserver.debounce(this.props.debounce);
        }

        if (this.props.throttle) {
            this.viewportChangeObserver = this.viewportChangeObserver.throttle(this.props.throttle);
        }

        this.viewportChangeObserver
            .map(() => isElementPartInViewport(componentNode))
            .distinctUntilChanged()
            .filter((value) => value)
            .subscribe(this.lazyLoadHandler);

        if (isElementPartInViewport(componentNode)) {
            this.lazyLoadHandler();
        }
    }

    componentWillUnmount() {
        this.viewportChangeObserver.dispose();
    }

    lazyLoadHandler() {
        if (this.props.isDisposeObserverOnLoad) {
            this.viewportChangeObserver.dispose();
        }
        this.props.onContentVisible();
    }

    render() {
        return <div></div>;
    }
}
