import { defineComponent, nextTick, reactive } from 'vue'
import UploaderProps from './props'
import { tools } from '../utils/tools'
import { FileImageOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'MiUploaderBtn',
    inheritAttrs: false,
    props: {...UploaderProps},
    emits: ['fileAdded'],
    setup(props, { slots, emit }) {
        let fileList = reactive([])
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
        // images
        const images = reactive({
            single: {
                cls: `${prefixCls}-image`,
                style: (props.width ? `width: ${props.width}px;` : '').toString() +
                    (props.height ? `height: ${props.height}px;` : '').toString(),
                preview: {
                    id: `${prefixCls}-image-preview`,
                    status: false,
                    error: null,
                    origin: {
                        width: props.width ?? 0,
                        height: props.height ?? 0
                    },
                    width: 0,
                    height: 0,
                    percent: {
                        left: 0,
                        right: 0
                    }
                }
            },
            multiple: {}
        })
        // on change
        const onFileAdded = (e: any) => {
            const files = e.target.files
            for (let i = 0, l = files.length; i < l; i++) {
                const file = files[i]
                const uniqueIdentifier = tools.generateUniqueIdentifier(file)
                if (!tools.getFromUniqueIdentifier(files, uniqueIdentifier)) {
                    file.uniqueIdentifier = uniqueIdentifier
                    if (!props.multiple) {
                        fileList = []
                        handleSingleImagePreview(file)
                    }
                    fileList.push(file)
                    emit('fileAdded', file)
                }
            }
        }
        // single image.
        const getSingleImagePreview = () => {
            return (
                images.single.preview.status && !images.single.preview.error
                    ? <div class={`${images.single.cls}-preview`}>
                        <img src="" id={images.single.preview.id}
                            alt={`${images.single.cls}-preview`} style={{
                                width: `${images.single.preview.width}px`,
                                height: `${images.single.preview.height}px`
                            }} />
                    </div>
                    : null
            )
        }
        const getSingleImageStyle = () => {
            return (props.width ? `width: ${props.width}px;` : '').toString() +
            (props.height ? `height: ${props.height}px;` : '').toString()
        }
        const getSingleImageElem = () => {
            return (
                <div class={images.single.cls} style={getSingleImageStyle()}>
                    <div class={`${images.single.cls}-icon`}>
                        <FileImageOutlined />上传图片
                    </div>
                    { getSingleImagePreview() }
                    <div class={`${images.single.cls}-progress`}>

                    </div>
                    <div class={`${images.single.cls}-input`}>
                        <input type="file"
                            multiple={props.multiple}
                            onChange={onFileAdded}
                            accept={accept} />
                    </div>
                </div>
            )
        }
        const handleSingleImagePreview = (file: any) => {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                images.single.preview.error = null
                images.single.preview.status = true
                nextTick(() => {
                    const img = document.getElementById(images.single.preview.id) as HTMLImageElement
                    if (img) {
                        // adapt
                        img.src = e.target.result
                        const parentNode = img.parentNode as HTMLDivElement
                        const origin = {
                            width: parentNode ? parentNode.clientWidth : 0,
                            height: parentNode ? parentNode.clientHeight : 0
                        }
                        img.onload = function() {
                            const width = img.naturalWidth
                            const height = img.naturalHeight
                            console.log(img.clientWidth)
                            if (width > height) {
                                images.single.preview.width = origin.width
                                const h = Math.ceil(origin.width * height / width)
                                images.single.preview.height = h
                            } else {
                                images.single.preview.height = origin.height
                                const w = Math.ceil(width * origin.height / height)
                                images.single.preview.width = w
                            }
                        }
                        img.onerror = () => {
                            images.single.preview.error = '当前所选文件不符合，请重新选择图片类型文件！'
                        }
                    }
                })
            }
            reader.onerror = () => images.single.preview.error = '图片读取失败'
            reader.readAsDataURL(file)
        }
        return () => {
            // element
            let elem = null
            if (props.type === 'image' && !props.multiple) elem = getSingleImageElem()
            return slots.default?.() ?? elem
        }
    }
})