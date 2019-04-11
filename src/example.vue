<template>
  <div class="app">
    <section class="example-1">
      <vue-carousel-component>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div><strong>4</strong></div>
      </vue-carousel-component>
    </section>

    <section class="example-2">
      <vue-carousel-component>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div><strong>4</strong></div>
      </vue-carousel-component>
    </section>
  </div>
</template>

<script>
  import VueCarouselComponent from './vue-carousel-component'

  export default {
    components: {
        VueCarouselComponent
    }
  }
</script>

<style scoped lang="scss">
  .app {
    section {
      border: 1px solid tomato;
    }
  }

  .example-2 {
    max-width: 1000px;
    margin: auto;
  }
</style>
