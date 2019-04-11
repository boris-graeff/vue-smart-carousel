# vue-smart-carousel
A smart vue carousel component

- Only mount first slide at creation then mount others when carousel is visible (async assets loading)
- Start sliding only when the carousel is visible on screen
- Responsive


**⚠️ VueSmartCarousel uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if carousel is visible on screen. This API is [not fully supported by all browser](http://caniuse.com/#feat=intersectionobserver) but a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) is available.**

## Installation

``` bash
npm install vue-smart-carousel
```


## Usage

``` js
import VueSmartCarousel from 'vue-smart-carousel'

export default {
  ...
  components: {
    VueSmartCarousel
  }
}
```

