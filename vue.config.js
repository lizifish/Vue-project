module.exports = {
    //关闭eslint校验
    lintOnSave: false,
    devServer: {
        // 配置新的启动端口
        host: "localhost",
        port: "8000",
        https: false,
        // 代理跨域
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                //所有接口带/api了 路径重写不需要了
                // pathRewrite: { '^/api': '' },
            }
        }
    }
}