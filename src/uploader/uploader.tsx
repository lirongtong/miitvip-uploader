import { defineComponent } from 'vue'
import UploaderProps from './props'
import { getSlot } from '../utils/props'

export default defineComponent({
    name: 'MiUploader',
    inheritAttrs: false,
    props: {...UploaderProps},
    data() {
        return {
            prefixCls: 'mi-uploader'
        }
    },
    methods: {
        renderImageElem() {
            return (
                <div class={`${this.prefixCls}-image`}></div>
            )
        }
    },
    render() {
        let template = getSlot(this) as any
        if (template.length <= 0) template = this.renderImageElem()
        return <div class={this.prefixCls} ref={this.prefixCls}>
            { template }
        </div>
    }
})