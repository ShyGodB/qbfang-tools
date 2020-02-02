module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false, // 是否开启语法检测
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8081,
        https: false,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3102/api',
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
