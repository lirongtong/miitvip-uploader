import { App, Plugin } from 'vue'
import Uploader from './uploader'

Uploader.install = function(app: App) {
    app.component(Uploader.name, Uploader)
    app.component(Uploader.Btn.name, Uploader.Btn)
    return app
}

export default Uploader as typeof Uploader & Plugin