import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _dee3519e = () => interopDefault(import('../pages/1/index.vue' /* webpackChunkName: "pages/1/index" */))
const _257309f2 = () => interopDefault(import('../pages/2/index.vue' /* webpackChunkName: "pages/2/index" */))
const _8b50869a = () => interopDefault(import('../pages/3/index.vue' /* webpackChunkName: "pages/3/index" */))
const _4f3c6f74 = () => interopDefault(import('../pages/4/index.vue' /* webpackChunkName: "pages/4/index" */))
const _37bdbb96 = () => interopDefault(import('../pages/5/index.vue' /* webpackChunkName: "pages/5/index" */))
const _1fc89d24 = () => interopDefault(import('../pages/aftermath/index.vue' /* webpackChunkName: "pages/aftermath/index" */))
const _27c95ef5 = () => interopDefault(import('../pages/conclusion/index.vue' /* webpackChunkName: "pages/conclusion/index" */))
const _1ca53371 = () => interopDefault(import('../pages/index0.vue' /* webpackChunkName: "pages/index0" */))
const _567c552c = () => interopDefault(import('../pages/intro/index.vue' /* webpackChunkName: "pages/intro/index" */))
const _07dea1be = () => interopDefault(import('../pages/occupation/index.vue' /* webpackChunkName: "pages/occupation/index" */))
const _6c2c4c8f = () => interopDefault(import('../pages/resistance/index.vue' /* webpackChunkName: "pages/resistance/index" */))
const _04b28d16 = () => interopDefault(import('../pages/1/stories/index.vue' /* webpackChunkName: "pages/1/stories/index" */))
const _62914023 = () => interopDefault(import('../pages/2/talkback.vue' /* webpackChunkName: "pages/2/talkback" */))
const _446f09c2 = () => interopDefault(import('../pages/3/talkback.vue' /* webpackChunkName: "pages/3/talkback" */))
const _66a5deb8 = () => interopDefault(import('../pages/4/stories/index.vue' /* webpackChunkName: "pages/4/stories/index" */))
const _00249505 = () => interopDefault(import('../pages/admin/toc.vue' /* webpackChunkName: "pages/admin/toc" */))
const _3c7d4730 = () => interopDefault(import('../pages/aftermath/stories/index.vue' /* webpackChunkName: "pages/aftermath/stories/index" */))
const _f13ee720 = () => interopDefault(import('../pages/intro/stories/index.vue' /* webpackChunkName: "pages/intro/stories/index" */))
const _75ead894 = () => interopDefault(import('../pages/occupation/talkback.vue' /* webpackChunkName: "pages/occupation/talkback" */))
const _d8ffc734 = () => interopDefault(import('../pages/resistance/talkback.vue' /* webpackChunkName: "pages/resistance/talkback" */))
const _50bb3e62 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _570e951d = () => interopDefault(import('../pages/1/stories/_id.vue' /* webpackChunkName: "pages/1/stories/_id" */))
const _490c2f20 = () => interopDefault(import('../pages/4/stories/_id.vue' /* webpackChunkName: "pages/4/stories/_id" */))
const _574b58d0 = () => interopDefault(import('../pages/aftermath/stories/_id.vue' /* webpackChunkName: "pages/aftermath/stories/_id" */))
const _c4f22a50 = () => interopDefault(import('../pages/intro/stories/_id.vue' /* webpackChunkName: "pages/intro/stories/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/1",
    component: _dee3519e,
    name: "1"
  }, {
    path: "/2",
    component: _257309f2,
    name: "2"
  }, {
    path: "/3",
    component: _8b50869a,
    name: "3"
  }, {
    path: "/4",
    component: _4f3c6f74,
    name: "4"
  }, {
    path: "/5",
    component: _37bdbb96,
    name: "5"
  }, {
    path: "/aftermath",
    component: _1fc89d24,
    name: "aftermath"
  }, {
    path: "/conclusion",
    component: _27c95ef5,
    name: "conclusion"
  }, {
    path: "/index0",
    component: _1ca53371,
    name: "index0"
  }, {
    path: "/intro",
    component: _567c552c,
    name: "intro"
  }, {
    path: "/occupation",
    component: _07dea1be,
    name: "occupation"
  }, {
    path: "/resistance",
    component: _6c2c4c8f,
    name: "resistance"
  }, {
    path: "/1/stories",
    component: _04b28d16,
    name: "1-stories"
  }, {
    path: "/2/talkback",
    component: _62914023,
    name: "2-talkback"
  }, {
    path: "/3/talkback",
    component: _446f09c2,
    name: "3-talkback"
  }, {
    path: "/4/stories",
    component: _66a5deb8,
    name: "4-stories"
  }, {
    path: "/admin/toc",
    component: _00249505,
    name: "admin-toc"
  }, {
    path: "/aftermath/stories",
    component: _3c7d4730,
    name: "aftermath-stories"
  }, {
    path: "/intro/stories",
    component: _f13ee720,
    name: "intro-stories"
  }, {
    path: "/occupation/talkback",
    component: _75ead894,
    name: "occupation-talkback"
  }, {
    path: "/resistance/talkback",
    component: _d8ffc734,
    name: "resistance-talkback"
  }, {
    path: "/",
    component: _50bb3e62,
    name: "index"
  }, {
    path: "/1/stories/:id",
    component: _570e951d,
    name: "1-stories-id"
  }, {
    path: "/4/stories/:id",
    component: _490c2f20,
    name: "4-stories-id"
  }, {
    path: "/aftermath/stories/:id",
    component: _574b58d0,
    name: "aftermath-stories-id"
  }, {
    path: "/intro/stories/:id",
    component: _c4f22a50,
    name: "intro-stories-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
