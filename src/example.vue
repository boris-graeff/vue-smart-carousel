<template>
  <div class="app">
    <section class="example-1">
      <vue-carousel-component class="carousel">
        <img src="https://cdn.pixabay.com/photo/2016/03/09/16/50/city-street-1246870_960_720.jpg" />
        <div>2</div>
        <div>3</div>
        <div><strong>4</strong></div>
      </vue-carousel-component>
    </section>

    <section class="example-2">
      <vue-carousel-component>
        <img src="https://cdn.pixabay.com/photo/2016/03/09/16/50/city-street-1246870_960_720.jpg" />
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
  .example-1 {

  }

  .example-2 {
    max-width: 600px;
    margin: 100vh auto;
  }
</style>
