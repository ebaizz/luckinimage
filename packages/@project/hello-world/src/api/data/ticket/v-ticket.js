import { formatDate, isObject } from '@lstack/utils'

function kvMap() {
  return {
    id: '工单编号',
    productId: '相关产品与服务',
    content: '问题描述',
    status: '状态',
    createUser: '提单人',
    createTime: '提交时间',
  }
}

function from(source) {
  if (!isObject(source)) return {}
  const formatted = { source }
  formatted.id = source.id
  formatted.productId = source.productId
  formatted.content = source.content
  formatted.status = source.status
  formatted.createUser = source.createUser
  formatted.createTime = formatDate(new Date(source.createTime))

  return formatted
}

export default { from, kvMap }
