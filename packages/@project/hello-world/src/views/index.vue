<template>
  <console-left-t-frame :side-title="$project.name" side-icon="support" :side-menus="sideMenus" />
</template>

<script>
  import { ConsoleLeftTFrame } from '@project/console'

  export default {
    name: 'Index',
    components: { ConsoleLeftTFrame },
    data() {
      const routeMap = this.$routeMap
      return {
        sideMenus: [
          {
            title: '工单系统',
            icon: 'workorder',
            link: '/tickets-warp',
            items: [
              { title: routeMap.Tickets.title, link: routeMap.Tickets.fullPath },
              { title: routeMap.TicketCreate.title, link: routeMap.TicketCreate.fullPath },
            ],
          },
        ],
      }
    },
  }
</script>
