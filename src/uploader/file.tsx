import { defineComponent } from 'vue'
import UploaderProps from './props'

export default defineComponent({
    name: 'MiUploaderFile',
    inheritAttrs: false,
    props: { ...UploaderProps },
    setup() {
        return () => <div class="mi-uploader-file"></div>
    }
})