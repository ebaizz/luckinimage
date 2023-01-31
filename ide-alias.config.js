// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaces } = require('@cli/yarn/lib/workspaces')
const Path = require('path')

/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 * */

const resolve = dir => Path.join(__dirname, dir)
const workspaces = getWorkspaces()
let fWorkspaces
if (!(workspaces instanceof Array)) {
  fWorkspaces = []
}
fWorkspaces = workspaces.map(workspace => {
  const name = workspace.name.charAt(0) === '@' ? workspace.name.split('/')[1] : workspace.name
  const { location } = workspace
  return { name: `@${name}`, location: resolve(location) }
})
const alias = {}
fWorkspaces.forEach(workspace => {
  alias[workspace.name] = `${workspace.location}/src`
})
module.exports = {
  resolve: { alias },
}
