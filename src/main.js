import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import 'normalize.css/normalize.css'
import 'animate.css'
import '@/assets/style/index.scss'

createApp(App)
  .use(router)
  .use(ViewUIPlus)
  .mount('#app')
