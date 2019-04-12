<template>
  <div class="vue-smart-carousel">
    <ul :style="{width: `${slides.length * 100}%`, transform: `translateX(-${100 / slides.length * realIndex}%)`}">
      <li v-for="slide in slides" :style="{width: `${100 / slides.length}%`}">
        <vnodes :vnode="slide" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    model: {
        prop: 'index',
        event: 'change'
    },
    props: {
        delay: {
            type: Number,
            default: 3000
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            slides: [],
            realIndex: 0
        }
    },
    watch: {
        index() {
          const length = this.slides.length
          this.realIndex = ((this.index % length) + length) % length
          if (this.realIndex != this.index) this.$emit('change', this.realIndex)
          this.restart()
        }
    },
    mounted() {
        const slides = this.$slots.default.filter(el => el.tag || el.text.trim().length)
        this.slides.push(slides[0])

        this.observer = new IntersectionObserver(entries => {
            const carousel = entries[0]

            if (carousel.isIntersecting) {
                // Mount others slides and start carousel
                this.slides = slides
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
          this.realIndex = (this.realIndex + 1) % this.slides.length
          this.$emit('change', this.realIndex)
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
  .vue-smart-carousel {
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
