import { defineComponent } from 'vue'
import UploaderProps from './props'
import MiUploaderImage from './image'
import MiUploaderFile from './file'

export default defineComponent({
    name: 'MiUploaderBtn',
    inheritAttrs: false,
    props: { ...UploaderProps },
    emits: ['fileAdded'],
    setup(props, { slots }) {
        return () => {
            let elem = null
            if (props.type === 'image') elem = <MiUploaderImage { ...props } />
            if (props.type === 'file') elem = <MiUploaderFile { ...props } />
            return slots.default?.() ?? elem
        }
    }
})