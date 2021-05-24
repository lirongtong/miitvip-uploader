import { defineComponent } from 'vue'
import UploaderProps from './props'
import { FileImageOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'MiUploader',
    inheritAttrs: false,
    props: {...UploaderProps},
    setup(props, { slots }) {
        const prefixCls = props.prefixCls ?? 'mi-uploader'
        const accepts = {
            image: ['image/*'],
            document: [
                '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
                '.pdf', '.txt', '.zip', '.rar', '.7z', '.tif',
                '.tiff', 'csv', 'epub', 'pages', 'numbers', 'keynote'
            ],
            audio: ['audio/*'],
            video: ['video/*']
        }
        let singleImageAreaStyle = props.width ? `width: ${props.width}px;` : null
        singleImageAreaStyle += props.height ? `height: ${props.height}px;` : null
        const singleImageElem = <div class={`${prefixCls}-image`} style={singleImageAreaStyle}>
            <div class={`${prefixCls}-image-icon`}>
                <FileImageOutlined />上传图片
            </div>
        </div>
        let innerHtml = null
        if (props.type === 'image' && !props.multiple) innerHtml = singleImageElem
        return () => <div class={`${prefixCls}-container`}>
            { innerHtml }
        </div>
    }
})