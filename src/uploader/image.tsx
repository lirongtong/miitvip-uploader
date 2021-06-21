import { defineComponent, reactive, nextTick } from 'vue'
import UploaderProps from './props'
import { tools } from '../utils/tools'
import { FileImageOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'MiUploaderImage',
    inheritAttrs: false,
    props: { ...UploaderProps },
    emits: ['fileAdded'],
    setup(props, { slots, emit }) {
        let fileList = reactive([])
        const prefixCls = props.prefixCls ?? 'mi-uploader'
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
                    progress: 0,
                    percent: {
                        left: 0,
                        right: 0
                    }
                },
                uploading: false
            },
            multiple: {}
        })
        const SINGLE = {
            getStyle: () => {
                return (props.width ? `width: ${props.width}px;` : '').toString() +
                    (props.height ? `height: ${props.height}px;` : '').toString() +
                    (props.borderColor ? `border-color: ${props.borderColor};` : '') +
                    (props.bgColor ? `background-color: ${props.bgColor};` : '')
            },
            getPreview: () => {
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
            },
            getProgress: () => {
                const condition = props.showDefaultProgress &&
                    images.single.preview.progress < 100 &&
                    (
                        (
                            props.autoStart &&
                            images.single.preview.status &&
                            !images.single.preview.error
                        ) ||
                        (
                            !props.autoStart &&
                            images.single.uploading
                        )
                    )
                return condition
                    ? <div class={`${images.single.cls}-progress`}>
                        <div class="progress">
                            <div class="wrapper">
                                <div class="left" style={{
                                    transform: `rotate(${images.single.preview.percent.left}deg)`
                                }}></div>
                            </div>
                            <div class="wrapper">
                                <div class="right" style={{
                                    transform: `rotate(${images.single.preview.percent.right}deg)`
                                }}></div>
                            </div>
                        </div>
                        <div class="mask">{ images.single.preview.progress }%</div>
                    </div>
                    : null
            },
            getUploadBtn: () => {
                return !props.autoStart &&
                    !images.single.uploading &&
                    images.single.preview.status &&
                    !images.single.preview.error
                        ? (
                            <div class={`${images.single.cls}-upload-btn`}>
                                <div class="mask"></div>
                                <div class="btn">
                                    <button>开始上传</button>
                                </div>
                                <div class="btn-ripple"></div>
                            </div>
                        ) : null
            },
            showPreview: (file: any) => {
                const reader = new FileReader()
                reader.onload = (evt: any) => {
                    images.single.preview.error = null
                    images.single.preview.status = true
                    handlePreview(evt, images.single.preview.id)
                }
                reader.onerror = () => images.single.preview.error = '图片读取失败'
                reader.readAsDataURL(file)
            }
        }
        const onFileAdded = (evt: any) => {
            const files = evt.target.files
            for (let i = 0, l = files.length; i < l; i++) {
                const file = files[i]
                const uniqueIdentifier = tools.generateUniqueIdentifier(file)
                if (!tools.getFromUniqueIdentifier(files, uniqueIdentifier)) {
                    file.uniqueIdentifier = uniqueIdentifier
                    if (!props.multiple) {
                        fileList = []
                        SINGLE.showPreview(file)
                    }
                    fileList.push(file)
                    emit('fileAdded', file)
                }
            }
        }
        const getSingleElement = () => {
            return (
                <div class={images.single.cls} style={ SINGLE.getStyle() }>
                    <div class={`${images.single.cls}-icon`}>
                        <FileImageOutlined />上传图片
                    </div>
                    <div class={`${images.single.cls}-input`}>
                        <input type="file"
                            multiple={props.multiple}
                            onChange={onFileAdded}
                            accept={tools.getAccept(props.type, props.accept)} />
                    </div>
                    { SINGLE.getUploadBtn() }
                    { SINGLE.getPreview() }
                    { SINGLE.getProgress() }
                </div>
            )
        }
        const getMultipleElement = () => {}
        const getImageElement = () => {
            let elem = null
            if (props.multiple) elem = getMultipleElement()
            else elem = getSingleElement()
            return elem
        }
        const handlePreview = (evt: any, id: string) => {
            nextTick(() => {
                const img = document.getElementById(id) as HTMLImageElement
                if (img) {
                    img.src = evt.target.result
                    const parentNode = img.parentNode as HTMLDivElement
                    const origin = {
                        width: parentNode ? parentNode.clientWidth : 0,
                        height: parentNode ? parentNode.clientHeight : 0
                    }
                    img.onload = function() {
                        const width = img.naturalWidth
                        const height = img.naturalHeight
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
        return () => {
            return slots.default?.() ?? getImageElement()
        }
    }
})