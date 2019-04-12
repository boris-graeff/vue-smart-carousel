<template>
  <div class="app">
    <section class="example-1">
      <h2>Previous / next navigation example</h2>
      <vue-smart-carousel class="carousel" v-model="index1">
        <img src="https://source.unsplash.com/random/1024x512?a" />
        <img src="https://source.unsplash.com/random/1024x512?b" />
        <img src="https://source.unsplash.com/random/1024x512?c" />
        <img src="https://source.unsplash.com/random/1024x512?d" />
      </vue-smart-carousel>
      <div class="navigation">
        <button type="button" @click="index1 -= 1">Previous</button>
        <div>{{ index1 }}</div>
        <button type="button" @click="index1 += 1">Next</button>
      </div>
    </section>

    <section class="example-2">
      <h2>Pagination example</h2>
      <p>Note that autoplay start only when carousel is visible on viewport</p>
      <vue-smart-carousel v-model="index2">
        <img src="https://source.unsplash.com/random/1024x512?e" />
        <img src="https://source.unsplash.com/random/1024x512?f" />
        <img src="https://source.unsplash.com/random/1024x512?g" />
        <img src="https://source.unsplash.com/random/1024x512?h" />
      </vue-smart-carousel>
      <ul class="navigation">
        <li v-for="index in 4" :key="index" :class="{active: index2 === index-1}">
          <button type="button" @click="index2 = index-1">
            {{ index }}
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import VueSmartCarousel from './vue-smart-carousel'

  export default {
    data() {
        return {
            index1: 0,
            index2: 1
        }
    },
    components: {
        VueSmartCarousel
    }
  }
</script>

<style scoped lang="scss">
  section {
    text-align: center;
  }

  .example-1 {
    .navigation {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      div {
        margin: 0 20px;
      }
    }
  }

  .example-2 {
    max-width: 600px;
    margin: 100vh auto;

    .navigation {
      display: flex;
      list-style: none;
      justify-content: center;

      li + li {
        margin-left: 20px;
      }

      .active button {
        background: tomato;
      }
    }
  }
</style>
