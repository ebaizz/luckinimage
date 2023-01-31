const Project = require('@lstack/project')
const Path = require('path')

const projectName = 'workorder'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')

const consoleKeys = Object.keys(Project)
const aliasMap = consoleKeys.reduce((map, projectKey) => {
  map[`@${projectKey}`] = `@project/${projectKey}/src`
  return map
}, {})
const port = 8080 // dev port

const rootPath = Path.join(__dirname, '../../../')
module.exports = {
  publicPath: `/${projectName}`,
  outputDir: `${rootPath}dist/console/${projectName}`,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '^/api/lsh': {
        // target: 'https://www.lstack.com', // 公网
        // target: 'https://xlauncher.com/', // 鲲鹏
        // 内网 DNS
        // target: 'https://www.lstack-dev.cn', // 211
        // target: 'https://www.lstack-stable.cn',
        target: 'https://www.lstack-dev.cn', // 15
        // target: 'http://8.16.0.105', // 105
        // 内网 穿透
        // target: 'https://dev.lstack.bye913.com', // 211
        // target: 'https://stable.lstack.bye913.com',
        // target: 'https://test.lstack.bye913.com', // 15
        // target: 'https://private.lstack.bye913.com', // 105
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    name: 'LStack 混合云-控制台', // 网站标题
    resolve: {
      alias: {
        ...aliasMap,
        '@workorder': `${__dirname}/src`,
      },
    },
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compression-webpack-plugin').use(
        new CompressionPlugin({
          test: /\.(js|css)?$/i, // 哪些文件要压缩
          algorithm: 'gzip', // 使用 gzip 压缩
          threshold: 0, // 大于 10240 字节，既 10k 时
          minRatio: 0.8, // 压缩率
          deleteOriginalAssets: false, // 是否删除原本的 js
        })
      )
    }
  },
}
