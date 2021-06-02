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
}
export const tools = new MiTools()