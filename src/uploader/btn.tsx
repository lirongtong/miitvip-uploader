import { defineComponent, reactive } from 'vue'
import UploaderProps from './props'
import { tools } from '../utils/tools'
import { FileImageOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'MiUploaderBtn',
    inheritAttrs: false,
    props: {...UploaderProps},
    emits: ['fileAdded'],
    setup(props, { slots, emit }) {
        const fileList = reactive([])
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
        const accept = props.accept
            ? (
                accepts[props.accept]
                    ? accepts[props.accept].join(',')
                    : props.accept
            ) : (
                props.type === 'image'
                    ? accepts.image.join(',')
                    : accepts.image.concat(accepts.doc, accepts.audio, accepts.video).join(',')
            )
        // on change
        const onFileAdded = (e: any) => {
            const files = e.target.files
            for (let i = 0, l = files.length; i < l; i++) {
                const file = files[i]
                const uniqueIdentifier = tools.generateUniqueIdentifier(file)
                if (!tools.getFromUniqueIdentifier(files, uniqueIdentifier)) {
                    file.uniqueIdentifier = uniqueIdentifier
                    fileList.push(file)
                    emit('fileAdded', file)
                }
            }
        }
        // images
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
            <div class={`${images.single.cls}-progress`}>

            </div>
            <div class={`${images.single.cls}-input`}>
                <input type="file"
                    multiple={props.multiple}
                    onChange={onFileAdded}
                    accept={accept} />
            </div>
        </div>
        // element
        let elem = null
        if (props.type === 'image' && !props.multiple) elem = images.single.elem
        return () => slots.default?.() ?? elem
    }
})