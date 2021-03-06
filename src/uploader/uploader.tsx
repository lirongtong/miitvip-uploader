import { defineComponent } from 'vue'
import UploaderProps from './props'
import MiUploaderBtn from './btn'
import MiUploaderImage from './image'
import MiUploaderFile from './file'

const MiUploader =  defineComponent({
    name: 'MiUploader',
    inheritAttrs: false,
    props: { ...UploaderProps },
    setup(props, { slots }) {
        const prefixCls = props.prefixCls ?? 'mi-uploader'
        return () => <div class={`${prefixCls}-container`}>
            { slots.default?.() ?? <MiUploaderBtn { ...props } /> }
        </div>
    }
})

MiUploader.Btn = MiUploaderBtn
MiUploader.Image = MiUploaderImage
MiUploader.File = MiUploaderFile
export default MiUploader as typeof MiUploader & {
    readonly Btn: typeof MiUploaderBtn,
    readonly Image: typeof MiUploaderImage,
    readonly File: typeof MiUploaderFile
}