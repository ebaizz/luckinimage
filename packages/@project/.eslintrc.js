const Project = require('@lstack/project')

const consoleKeys = Object.keys(Project)
const aliasMap = consoleKeys.map(projectKey => {
  return [`@${projectKey}`, `${__dirname}/${projectKey}/src`]
})

module.exports = {
  root: true,
  extends: ['plugin:@cli/lstack/browser-vue'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.vue'],
      },
      alias: {
        map: aliasMap,
        extensions: ['.js', '.vue', '.json'],
      },
    },
  },
}
