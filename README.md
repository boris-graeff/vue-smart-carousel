# vue-smart-carousel
A smart vue carousel component :

- Only mount first slide at creation and mount others only when carousel enter in viewport => improve first rendering and assets loading.
- Start sliding only when the carousel is visible on screen
- Responsive


**⚠️ VueSmartCarousel uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if carousel is visible on screen. This API is [not fully supported by all browser](http://caniuse.com/#feat=intersectionobserver) but a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) is available.**

## Installation

``` bash
npm install vue-smart-carousel
```


## Usage

``` js
<template>
  <vue-smart-carousel>
    <img src="/image-1.jpg" />
    <img src="/image-2.jpg" />
    <img src="/image-3.jpg" />  
  </vue-smart-carousel>
</template>

<script>
  import VueSmartCarousel from 'vue-smart-carousel'
  export default {
    ...
    components: {
      VueSmartCarousel
    }
  }
</script>
```

## Properties

| Property | Type    | Default | Description |
|:---------|:--------|:--------|:------------|
| value    | Number  | 0       | Current index position (you can use v-model to keep it sync) |
| delay    | Number  | 3000    | Delay between slide transition in milliseconds |


## Examples
    
Take a look to demo file to get examples of navigation and pagination implementations.
