<script>
  import { reqTicketCreate } from '@workorder/api/ajax/ticket.api'
  import FTicket from '@workorder/api/data/ticket/f-ticket'
  import { RlApiPost } from '@lstack/lstack-ui'

  export default {
    name: 'RlPostTicketCreate',
    extends: RlApiPost,
    props: {
      requestApi: { type: Function, default: reqTicketCreate },
    },
    data() {
      const formData = FTicket.formDataC()
      return {
        formData,
        formRules: FTicket.formRulesC(formData),
      }
    },
    computed: {
      isMaxAttachments() {
        const { attachments = [] } = this.formData
        return attachments.length >= 5
      },
      slotScopeApi() {
        return {
          isMaxAttachments: this.isMaxAttachments,
        }
      },
    },
  }
</script>
