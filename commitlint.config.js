module.exports = {
  extends: ['@cli/commitlint-config-lstack'],
  rules: {
    'lstack-close-id-valid': [2, 'always', ['release', 'bugfix', 'hotfix']],
  },
}
