import Vue from 'vue'
import Element from 'element-ui'
import {
  FilterableIndexPageTemplate,
  LuiLink,
  OperateActions,
  SearchInput,
  ForwardButton,
  LuiCard,
  LuiFormItem,
  LuiButton,
  LuiInput,
  LuiTip,
} from '@lstack/lstack-ui'
import '@lstack/style-scss'

Vue.use(FilterableIndexPageTemplate)
Vue.use(LuiLink)
Vue.use(OperateActions)
Vue.use(SearchInput)
Vue.use(ForwardButton)
Vue.use(LuiCard)
Vue.use(LuiFormItem)
Vue.use(LuiButton)
Vue.use(LuiInput)
Vue.use(LuiTip)

Vue.use(Element, { size: 'small' })
