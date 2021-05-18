import path from 'path'
import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const resolve = (dir: string) => path.join(__dirname, dir)

const config: UserConfig = {
    resolve: {
        alias: {
            '/@/': resolve('example'),
            '/@src/': resolve('src'),
            'makeit-uploader': resolve('src'),
            'makeit-uploader/style': '/src/style.ts'
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    optimizeDeps: {
        include: ['vue', 'axios']
    },
    server: {
        proxy: {
            '/v1': {
                target: 'http://local-api.makeit.vip',
                changeOrigin: true
            }
        }
    },
    plugins: [vue(), vueJsx()],
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    }
}
module.exports = config