import { defineComponent } from 'vue'
import UploaderProps from './props'
import MiUploaderImage from './image'

export default defineComponent({
    name: 'MiUploaderBtn',
    inheritAttrs: false,
    props: { ...UploaderProps },
    emits: ['fileAdded'],
    setup(props, { slots }) {
        const getFileElement = () => {}
        return () => {
            let elem = null
            if (props.type === 'image') elem = <MiUploaderImage { ...props } />
            if (props.type === 'file') elem = getFileElement()
            return slots.default?.() ?? elem
        }
    }
})