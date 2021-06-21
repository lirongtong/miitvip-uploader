import { defineComponent } from 'vue'
import UploaderProps from './props'
import MiUploaderBtn from './btn'

const MiUploader =  defineComponent({
    name: 'MiUploader',
    inheritAttrs: false,
    props: { ...UploaderProps },
    setup(props, { slots }) {
        const prefixCls = props.prefixCls ?? 'mi-uploader'
        return () => <div class={`${prefixCls}-container`}>
            { slots.default?.() ?? <MiUploaderBtn {...props} /> }
        </div>
    }
})

MiUploader.Btn = MiUploaderBtn
export default MiUploader as typeof MiUploader & {
    readonly Btn: typeof MiUploaderBtn
}