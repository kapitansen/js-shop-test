import Vue from 'vue'
import 'element-ui/lib/theme-chalk/reset.css'
import {
  Empty,
  Loading,
  Collapse,
  CollapseItem,
  Table,
  TableColumn,
  Icon,
  Card,
  Tag,
  InputNumber,
  Container,
  Header,
  Main,
  Col,
  Row,
  Button
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)


Vue.use(Empty)
Vue.use(Loading)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Tag)
Vue.use(InputNumber)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
