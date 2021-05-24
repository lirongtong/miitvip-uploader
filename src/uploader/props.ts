import PropTypes, { tuple } from '../utils/props'

function getUploaderPropTypes() {
    return {
        type: PropTypes.oneOf(
            tuple('image', 'file')
        ).def('image'),
        accept: PropTypes.string,
        action: PropTypes.string,
        method: PropTypes.string.def('post'),
        directory: PropTypes.bool.def(false),
        preview: PropTypes.bool.def(true),
        limit: PropTypes.number,
        span: PropTypes.number.def(1),
        gutter: PropTypes.number,
        multiple: PropTypes.bool.def(false),
        slice: PropTypes.bool.def(false),
        sliceSize: PropTypes.number,
        maxSize: PropTypes.number,
        autoStart: PropTypes.bool.def(true),
        borderColor: PropTypes.string.def('#000'),
        fileList: PropTypes.array,
        listType: PropTypes.oneOf(
            tuple('list', 'card')
        ).def('list'),
        disabled: PropTypes.bool.def(false),
        onChange: PropTypes.func,
        prefixCls: PropTypes.string,
        width: PropTypes.number.def(0),
        height: PropTypes.number.def(0)
    }
}

export default getUploaderPropTypes()