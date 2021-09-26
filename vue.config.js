module.exports = {
    chainWebpack: config => {
        // clear:删除与原来main.js的链接
        // production：产品发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
                config
                    .entry('app')
                    .clear()
                    .add('./src/main-prod.js')
            })
            // development：产品开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main-dev.js')
        })
    },
    lintOnSave: false
}