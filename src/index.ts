import { App } from 'vue'
import { version } from '../package.json'
import { default as Uploader } from './uploader'

const install = (app: App) => {
    app.use(Uploader)
    return app
}

export { Uploader }

export default {
    version,
    install
}