import md5 from 'js-md5'

class MiTools {
    /**
     * 唯一标识符.
     * @param upper 
     * @returns 
     */
     generateUniqueIdentifier(file: any, upper = false, prefix = 'mi-'): string {
		const str = md5(prefix + md5(file.name + file.size.toString() + file.type))
		return upper ? str.toUpperCase() : str
	}

    /**
     * 是否定义.
     * @param value 
     * @returns 
     */
    isDefined(value: any): boolean {
        return typeof value !== 'undefined'
    }

    /**
     * 获取文件信息.
     * @param files 
     * @param uniqueIdentifier 
     * @returns 
     */
    getFromUniqueIdentifier(
        files: any,
        uniqueIdentifier: string
    ): boolean | string {
        let ret = false
        for (let i = 0, l = files.length; i < l; i++) {
            const file = files[i]
            if (file.uniqueIdentifier === uniqueIdentifier) {
                ret = file
                break
            }
        }
        return ret
    }

    /**
     * 获取支持类型.
     * @param type 
     * @param accept 
     * @returns 
     */
    getAccept(type = 'image', accept?: any) {
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
        return accept
            ? (
                accepts[accept]
                    ? accepts[accept].join(',')
                    : accept
            ) : (
                type === 'image'
                    ? accepts.image.join(',')
                    : accepts.image.concat(accepts.doc, accepts.audio, accepts.video).join(',')
            )
    }
}
export const tools = new MiTools()