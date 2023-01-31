import Vue from 'vue'
import VueRouter from 'vue-router'
import { RlApiRequest } from '@lstack/lstack-ui'
import { ConsoleApp } from '@project/console'
import './register-global-components'
import { workorder } from '@lstack/project/lib'
import * as componentPoolsMap from '@workorder/core/component-pool'
import { Context, Config } from '@lstack/core'

workorder.setComponents(componentPoolsMap)

Vue.use(VueRouter)
Vue.use(RlApiRequest, { requestCommonErrorHandler: Config.requestCommonErrorHandler })

const router = new VueRouter(workorder.obtainRouteConfig())

const app = new Vue({ el: '#app', render: h => h(ConsoleApp), router })

Context.setApp(app)
Context.setProject(workorder)
Context.setRouter(router)

Vue.prototype.$popup = app.$children[0].openPage
Vue.prototype.$context = Context
Vue.prototype.$project = workorder
Vue.prototype.$routeMap = workorder.routeMap
