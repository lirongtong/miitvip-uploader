import { defineComponent } from 'vue'
import UploaderProps from './props'
import { FileImageOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'MiUploaderBtn',
    inheritAttrs: false,
    props: {...UploaderProps},
    setup(props, { slots }) {
        // class name prefix
        const prefixCls = props.prefixCls ?? 'mi-uploader'
        // accepts
        const accepts = {
            image: ['image/*'],
            doc: [
                '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
                '.pdf', '.txt', '.zip', '.rar', '.7z', '.tif',
                '.tiff', 'csv', 'epub', 'pages', 'numbers', 'keynote'
            ],
            audio: ['audio/*'],
            video: ['video/*']
        }
        const images = {
            single: {
                cls: `${prefixCls}-image`,
                style: (props.width ? `width: ${props.width}px;` : '').toString() +
                    (props.height ? `height: ${props.height}px;` : '').toString(),
                elem: null
            },
            multiple: {}
        }
        // single image
        images.single.elem = <div class={images.single.cls} style={images.single.style}>
            <div class={`${images.single.cls}-icon`}>
                <FileImageOutlined />上传图片
            </div>
            <div class={`${images.single.cls}-preview`}></div>
            <div class={`${images.single.cls}-progress`}></div>
            <div class={`${images.single.cls}-input`}>
                <input type="file"
                    multiple={props.multiple}
                    accept={props.accept ?? accepts.image.join(',')} />
            </div>
        </div>
        let elem = null
        if (props.type === 'image' && !props.multiple) elem = images.single.elem
        return () => slots.default?.() ?? elem
    }
})