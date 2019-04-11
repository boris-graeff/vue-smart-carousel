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
  props: {
      delay: {
          type: Number,
          default: 3000
      }
  },
  data: function data() {
      return {
          index: 0,
          slides: []
      }
  },
  mounted: function mounted() {
      var this$1 = this;

      this.slides = [this.$slots.default[0]];
      setTimeout(function () {
          this$1.slides = this$1.$slots.default;
      }, 3000);

      this.restart();
  },
  methods: {
    restart: function restart () {
      var this$1 = this;

      clearInterval(this.interval);

      this.interval = setInterval(function () {
        this$1.index = (this$1.index + 1) % this$1.slides.length;
      }, this.delay);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.interval);
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
  return _c("div", { staticClass: "vue-carousel-component" }, [
    _c(
      "ul",
      {
        style: {
          width: _vm.slides.length * 100 + "%",
          transform:
            "translateX(-" + (100 / _vm.slides.length) * _vm.index + "%)"
        }
      },
      _vm._l(_vm.slides, function(slide) {
        return _c(
          "li",
          {
            key: slide.context._uid,
            style: { width: 100 / _vm.slides.length + "%" }
          },
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
    inject("data-v-426d2c9b_0", { source: ".vue-carousel-component[data-v-426d2c9b] {\n  overflow: hidden;\n}\n.vue-carousel-component[data-v-426d2c9b]  img {\n  max-width: 100%;\n}\n.vue-carousel-component > ul[data-v-426d2c9b] {\n  display: flex;\n  flex-direction: row;\n  backface-visibility: hidden;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  transition: transform 500ms ease;\n  will-change: transform;\n}\n.vue-carousel-component > ul > li[data-v-426d2c9b] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/*# sourceMappingURL=vue-carousel-component.vue.map */", map: {"version":3,"sources":["/home/bof/workspace/vue-smart-carousel/src/vue-carousel-component.vue","vue-carousel-component.vue"],"names":[],"mappings":"AAsDA;EACA,gBAAA;ACrDA;ADuDA;EACA,eAAA;ACrDA;ADwDA;EACA,aAAA;EACA,mBAAA;EACA,2BAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;EACA,gCAAA;EACA,sBAAA;ACtDA;ADwDA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;ACtDA;;AAEA,qDAAqD","file":"vue-carousel-component.vue","sourcesContent":["<template>\n  <div class=\"vue-carousel-component\">\n    <ul :style=\"{width: `${slides.length * 100}%`, transform: `translateX(-${100 / slides.length * index}%)`}\">\n      <li v-for=\"slide in slides\" :key=\"slide.context._uid\" :style=\"{width: `${100 / slides.length}%`}\">\n        <vnodes :vnode=\"slide\" />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script>\n  export default {\n    props: {\n        delay: {\n            type: Number,\n            default: 3000\n        }\n    },\n    data() {\n        return {\n            index: 0,\n            slides: []\n        }\n    },\n    mounted() {\n        this.slides = [this.$slots.default[0]]\n        setTimeout(() => {\n            this.slides = this.$slots.default\n        }, 3000)\n\n        this.restart()\n    },\n    methods: {\n      restart () {\n        clearInterval(this.interval)\n\n        this.interval = setInterval(() => {\n          this.index = (this.index + 1) % this.slides.length\n        }, this.delay)\n      }\n    },\n    beforeDestroy() {\n      clearInterval(this.interval)\n    },\n    components: {\n        vnodes: {\n            functional: true,\n            render: (h, ctx) => ctx.props.vnode\n        }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  .vue-carousel-component {\n    overflow: hidden;\n\n    ::v-deep img {\n      max-width: 100%;\n    }\n\n    > ul {\n      display: flex;\n      flex-direction: row;\n      backface-visibility: hidden;\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      transition: transform 500ms ease;\n      will-change: transform;\n\n      > li {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n    }\n  }\n</style>\n",".vue-carousel-component {\n  overflow: hidden;\n}\n.vue-carousel-component ::v-deep img {\n  max-width: 100%;\n}\n.vue-carousel-component > ul {\n  display: flex;\n  flex-direction: row;\n  backface-visibility: hidden;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  transition: transform 500ms ease;\n  will-change: transform;\n}\n.vue-carousel-component > ul > li {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/*# sourceMappingURL=vue-carousel-component.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-426d2c9b";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VueCarouselComponent = normalizeComponent_1(
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
    Vue.component('VueCarouselComponent', VueCarouselComponent);
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

export default VueCarouselComponent;
export { install };
