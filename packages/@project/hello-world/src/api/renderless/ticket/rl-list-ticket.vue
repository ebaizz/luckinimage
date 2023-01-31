<script>
  import { RlApiListStandard } from '@lstack/lstack-ui'
  import { reqTickets } from '@workorder/api/ajax/ticket.api'
  import VTicket from '@workorder/api/data/ticket/v-ticket'

  export default {
    name: 'RlListTicket',
    extends: RlApiListStandard,
    props: {
      requestApi: { type: Function, default: reqTickets },
    },
    computed: {
      iKvMap: VTicket.kvMap,
    },
    methods: {
      iFormatApi: VTicket.from,
    },
  }
</script>
