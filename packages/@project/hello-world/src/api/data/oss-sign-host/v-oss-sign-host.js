import { isObject } from '@lstack/utils'

function kvMap() {
  return {}
}

function from(source) {
  if (!isObject(source)) return {}
  const formatted = { source }
  const { formData = {} } = source

  formatted.formData = formData
  formatted.host = source.host

  const {
    key,
    ossaccessKeyId: ossAccessKeyId,
    policy,
    signature,
    success_action_status: successActionStatus,
  } = formData

  formatted.key = key
  formatted.ossaccessKeyId = ossAccessKeyId
  formatted.policy = policy
  formatted.signature = signature
  formatted.successActionStatus = successActionStatus

  return formatted
}

export default { from, kvMap }
