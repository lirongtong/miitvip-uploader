import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

const config = {
    alias: {
        '/@/': resolve('example'),
        '/@src/': resolve('src'),
        'makeit-uploader': '/@src/index.ts',
        'makeit-uploader/style': '/@src/style.ts'
    },
    cssPreprocessOptions: {
        less: {
            javascriptEnabled: true
        }
    },
    optimizeDeps: {
        include: ['vue', 'axios']
    },
    proxy: {
        '/v1': {
            target: 'http://local-api.makeit.vip',
            changeOrigin: true
        }
    }
}
module.exports = config