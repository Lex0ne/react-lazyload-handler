import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';
import { isElementPartInViewport } from './utils';


export default class LazyLoadHandler extends React.Component {
    static propTypes = {
        isDisposeObserverOnLoad: React.PropTypes.bool,
        onContentVisible: React.PropTypes.func,
    };

    static defaultProps = {
        onContentVisible: () => {},
        isDisposeObserverOnLoad: true,
    };

    constructor(props) {
        super(props);
        this.lazyLoadHandler = this.lazyLoadHandler.bind(this);
    }

    componentDidMount() {
        const componentNode = ReactDOM.findDOMNode(this);
        this.viewportChangeObserver = Rx.Observable.merge(
                Rx.Observable.fromEvent(window, 'scroll'),
                Rx.Observable.fromEvent(window, 'resize'),
            )
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
