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
        showDefaultProgress: PropTypes.bool.def(true),
        progressCallbackInterval: PropTypes.number.def(500),
        borderColor: PropTypes.string.def('#f6ca9d'),
        bgColor: PropTypes.string.def('#333'),
        themeColor: PropTypes.string.def('#f6ca9d'),
        fileList: PropTypes.array,
        listType: PropTypes.oneOf(
            tuple('list', 'card')
        ).def('list'),
        disabled: PropTypes.bool.def(false),
        onChange: PropTypes.func,
        onFileAdded: PropTypes.func,
        prefixCls: PropTypes.string,
        width: PropTypes.number.def(0),
        height: PropTypes.number.def(0)
    }
}

export default getUploaderPropTypes()