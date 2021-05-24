import { defineComponent } from 'vue'
import UploaderProps from './props'
import { FileImageOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'MiUploaderBtn',
    inheritAttrs: false,
    props: {...UploaderProps},
    setup(props, { slots }) {
        const prefixCls = props.prefixCls ?? 'mi-uploader'
        const images = {
            single: {
                cls: `${prefixCls}-image`,
                style: (props.width ? `width: ${props.width}px;` : '').toString() +
                    (props.height ? `height: ${props.height}px;` : '').toString(),
                elem: null
            },
            multiple: {}
        }
        images.single.elem = <div class={images.single.cls} style={images.single.style}>
            <div class={`${images.single.cls}-icon`}>
                <FileImageOutlined />上传图片
            </div>
            <div class={`${images.single.cls}-preview`}></div>
            <div class={`${images.single.cls}-progress`}></div>
        </div>
        let elem = null
        if (props.type === 'image' && !props.multiple) elem = images.single.elem
        return () => slots.default?.() ?? elem
    }
})