(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueSmartCarousel = {}));
}(this, function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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
    data: function data() {
        return {
            slides: [],
            realIndex: 0
        }
    },
    watch: {
        index: function index() {
          var length = this.slides.length;
          this.realIndex = ((this.index % length) + length) % length;
          if (this.realIndex != this.index) { this.$emit('change', this.realIndex); }
          this.restart();
        }
    },
    mounted: function mounted() {
        var this$1 = this;

        var slides = this.$slots.default.filter(function (el) { return el.tag || el.text.trim().length; });
        this.slides.push(slides[0]);

        this.observer = new IntersectionObserver(function (entries) {
            var carousel = entries[0];

            if (carousel.isIntersecting) {
                // Mount others slides and start carousel
                this$1.slides = slides;
                this$1.restart();
                this$1.observer.disconnect();
            }
        });

        this.observer.observe(this.$el);
    },
    methods: {
      restart: function restart () {
        var this$1 = this;

        clearInterval(this.interval);

        this.interval = setInterval(function () {
          this$1.realIndex = (this$1.realIndex + 1) % this$1.slides.length;
          this$1.$emit('change', this$1.realIndex);
        }, this.delay);
      }
    },
    beforeDestroy: function beforeDestroy() {
      clearInterval(this.interval);
      this.observer.disconnect();
    },
    components: {
        vnodes: {
            functional: true,
            render: function (h, ctx) { return ctx.props.vnode; }
        }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "vue-smart-carousel" }, [
      _c(
        "ul",
        {
          style: {
            width: _vm.slides.length * 100 + "%",
            transform:
              "translateX(-" + (100 / _vm.slides.length) * _vm.realIndex + "%)"
          }
        },
        _vm._l(_vm.slides, function(slide) {
          return _c(
            "li",
            { style: { width: 100 / _vm.slides.length + "%" } },
            [_c("vnodes", { attrs: { vnode: slide } })],
            1
          )
        }),
        0
      )
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-e3cdf550_0", { source: ".vue-smart-carousel[data-v-e3cdf550] {\n  overflow: hidden;\n}\n.vue-smart-carousel[data-v-e3cdf550]  img {\n  max-width: 100%;\n}\n.vue-smart-carousel > ul[data-v-e3cdf550] {\n  display: flex;\n  flex-direction: row;\n  backface-visibility: hidden;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  transition: transform 500ms ease;\n  will-change: transform;\n}\n.vue-smart-carousel > ul > li[data-v-e3cdf550] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/*# sourceMappingURL=vue-smart-carousel.vue.map */", map: {"version":3,"sources":["/home/bof/workspace/vue-smart-carousel/src/vue-smart-carousel.vue","vue-smart-carousel.vue"],"names":[],"mappings":"AAiFA;EACA,gBAAA;AChFA;ADkFA;EACA,eAAA;AChFA;ADmFA;EACA,aAAA;EACA,mBAAA;EACA,2BAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;EACA,gCAAA;EACA,sBAAA;ACjFA;ADmFA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;ACjFA;;AAEA,iDAAiD","file":"vue-smart-carousel.vue","sourcesContent":["<template>\n  <div class=\"vue-smart-carousel\">\n    <ul :style=\"{width: `${slides.length * 100}%`, transform: `translateX(-${100 / slides.length * realIndex}%)`}\">\n      <li v-for=\"slide in slides\" :style=\"{width: `${100 / slides.length}%`}\">\n        <vnodes :vnode=\"slide\" />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script>\n  export default {\n    model: {\n        prop: 'index',\n        event: 'change'\n    },\n    props: {\n        delay: {\n            type: Number,\n            default: 3000\n        },\n        index: {\n            type: Number,\n            default: 0\n        }\n    },\n    data() {\n        return {\n            slides: [],\n            realIndex: 0\n        }\n    },\n    watch: {\n        index() {\n          const length = this.slides.length\n          this.realIndex = ((this.index % length) + length) % length\n          if (this.realIndex != this.index) this.$emit('change', this.realIndex)\n          this.restart()\n        }\n    },\n    mounted() {\n        const slides = this.$slots.default.filter(el => el.tag || el.text.trim().length)\n        this.slides.push(slides[0])\n\n        this.observer = new IntersectionObserver(entries => {\n            const carousel = entries[0]\n\n            if (carousel.isIntersecting) {\n                // Mount others slides and start carousel\n                this.slides = slides\n                this.restart()\n                this.observer.disconnect()\n            }\n        })\n\n        this.observer.observe(this.$el)\n    },\n    methods: {\n      restart () {\n        clearInterval(this.interval)\n\n        this.interval = setInterval(() => {\n          this.realIndex = (this.realIndex + 1) % this.slides.length\n          this.$emit('change', this.realIndex)\n        }, this.delay)\n      }\n    },\n    beforeDestroy() {\n      clearInterval(this.interval)\n      this.observer.disconnect()\n    },\n    components: {\n        vnodes: {\n            functional: true,\n            render: (h, ctx) => ctx.props.vnode\n        }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  .vue-smart-carousel {\n    overflow: hidden;\n\n    ::v-deep img {\n      max-width: 100%;\n    }\n\n    > ul {\n      display: flex;\n      flex-direction: row;\n      backface-visibility: hidden;\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      transition: transform 500ms ease;\n      will-change: transform;\n\n      > li {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n    }\n  }\n</style>\n",".vue-smart-carousel {\n  overflow: hidden;\n}\n.vue-smart-carousel ::v-deep img {\n  max-width: 100%;\n}\n.vue-smart-carousel > ul {\n  display: flex;\n  flex-direction: row;\n  backface-visibility: hidden;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  transition: transform 500ms ease;\n  will-change: transform;\n}\n.vue-smart-carousel > ul > li {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/*# sourceMappingURL=vue-smart-carousel.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-e3cdf550";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var VueSmartCarousel = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  // Declare install function executed by Vue.use()
  function install(Vue) {
      if (install.installed) { return; }
      install.installed = true;
      Vue.component('VueSmartCarousel', VueSmartCarousel);
  }

  // Create module definition for Vue.use()
  var plugin = {
      install: install
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
  }
  if (GlobalVue) {
      GlobalVue.use(plugin);
  }

  exports.default = VueSmartCarousel;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
