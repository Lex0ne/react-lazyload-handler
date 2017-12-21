[![npm downloads](https://img.shields.io/npm/dm/react-lazyload-handler.svg?style=flat-square)](https://www.npmjs.com/package/react-lazyload-handler)

# react-lazyload-handler

## Quick start

```js
import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoadHandler from 'react-lazyload-handler';

<LazyLoadHandler
    isDisposeObserverOnLoad={true}
    onContentVisible={() => ...}
    debounce={500}
    throttle={500}
/>
```

## Installation

`react-lazyload-handler` requires React >= 0.14

### npm

```
npm install --save react-lazyload-handler
```
