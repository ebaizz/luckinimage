<script>
  import { reqOssSignHost } from '@workorder/api/ajax/oss-sign-host'
  import { RlApiInfo } from '@lstack/lstack-ui'
  import VOssSignHost from '@workorder/api/data/oss-sign-host/v-oss-sign-host'

  export default {
    name: 'RlInfoOssSignHost',
    extends: RlApiInfo,
    props: {
      requestApi: { type: Function, default: reqOssSignHost },
    },
    computed: {
      iKvMap: VOssSignHost.kvMap,
    },
    methods: {
      iFormatApi: VOssSignHost.from,
    },
  }
</script>
