import { defineComponent } from 'vue'
import UploaderProps from './props'
import MiUploaderBtn from './btn'

export default defineComponent({
    name: 'MiUploader',
    inheritAttrs: false,
    props: {...UploaderProps},
    setup(props) {
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
        return () => <div class={`${prefixCls}-container`}>
            <MiUploaderBtn {...props} />
        </div>
    }
})