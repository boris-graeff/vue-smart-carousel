<template>
  <div class="vue-carousel-component">
    <ul :style="{width: `${slides.length * 100}%`, transform: `translateX(-${100 / slides.length * index}%)`}">
      <li v-for="slide in slides" :style="{width: `${100 / slides.length}%`}">
        <vnodes :vnode="slide" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
        delay: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            index: 0,
            slides: []
        }
    },
    mounted() {
        this.slides = [this.$slots.default[0]]

        this.observer = new IntersectionObserver(entries => {
            const carousel = entries[0]

            if (carousel.isIntersecting) {
                // Mount others slides and start carousel
                this.slides = this.$slots.default
                this.restart()
                this.observer.disconnect()
            }
        })

        this.observer.observe(this.$el)
    },
    methods: {
      restart () {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          this.index = (this.index + 1) % this.slides.length
        }, this.delay)
      }
    },
    beforeDestroy() {
      clearInterval(this.interval)
      this.observer.disconnect()
    },
    components: {
        vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnode
        }
    }
  }
</script>

<style scoped lang="scss">
  .vue-carousel-component {
    overflow: hidden;

    ::v-deep img {
      max-width: 100%;
    }

    > ul {
      display: flex;
      flex-direction: row;
      backface-visibility: hidden;
      list-style: none;
      padding: 0;
      margin: 0;
      transition: transform 500ms ease;
      will-change: transform;

      > li {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
