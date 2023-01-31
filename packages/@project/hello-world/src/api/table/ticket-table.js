import { ApiListPipePaginationTableAdapter } from '@lstack/lstack-ui'
import RlListTicket from '@workorder/api/renderless/ticket/rl-list-ticket'

export default {
  name: 'TicketTable',
  extends: RlListTicket,
  mixins: [ApiListPipePaginationTableAdapter],
}
