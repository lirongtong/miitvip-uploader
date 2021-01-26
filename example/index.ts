import { createApp } from 'vue'
import App from './app.vue'
import MakeitUploader from 'makeit-uploader'
import 'makeit-uploader/style'
import './index.less'

const app = createApp(App)
app.use(MakeitUploader)
app.mount('#app')