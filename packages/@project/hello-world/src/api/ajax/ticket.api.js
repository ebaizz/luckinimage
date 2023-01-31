import { Http } from '@lstack/network'

const fillUrl = url => `/api/lsh/workorder${url}`

/**
 * 获取我的工单列表
 * @param {Object} query
 * @param {Object} config
 * @returns {Promise<Object>}
 */
export const reqTickets = ({ query } = {}, config) => Http.ajax(fillUrl('/tickets'), 'GET', { query }, config)

/**
 * 提交工单
 * @param {Object} body
 * @param {Object} config
 * @returns {Promise<Object>}
 */
export const reqTicketCreate = ({ body } = {}, config) => Http.ajax(fillUrl('/tickets'), 'POST', { body }, config)
