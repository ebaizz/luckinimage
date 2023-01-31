<template>
  <filterable-index-page-template :loading="listLoading" :title="$routeMap.Tickets.title" :refresh-api="refreshTable">
    <forward-button
      slot="actions"
      type="primary"
      :text="$routeMap.TicketCreate.title"
      :to="$routeMap.TicketCreate.fullPath"
    />
    <search-input
      slot="filters"
      v-model="query.searchValue"
      :search-action="refreshTable"
      placeholder="按问题描述搜索"
    />
    <ticket-table
      ref="table"
      #default="{ kvMap }"
      api-search-key="content"
      :loading.sync="listLoading"
      :api-search-value="query.searchValue"
    >
      <template v-for="key in tableColumnKeys">
        <el-table-column :key="key" :prop="key" :label="kvMap[key]" />
      </template>
      <el-table-column label="操作" width="130px">
        <operate-actions
          :actions="[
            { label: '查看', event: () => {}, disabled: true, tip: '暂不支持' },
            { label: '删除', event: () => {}, disabled: true, tip: '暂不支持' },
          ]"
        />
      </el-table-column>
    </ticket-table>
  </filterable-index-page-template>
</template>

<script>
  import { BaseFilterableView } from '@lstack/lstack-ui'
  import TicketTable from '@workorder/api/table/ticket-table'
  import { MenuActivatable } from '@project/console'

  export default {
    name: 'Tickets',
    components: { TicketTable },
    extends: BaseFilterableView,
    mixins: [MenuActivatable],
    data() {
      return {
        tableColumnKeys: ['id', 'productId', 'content', 'status', 'createUser', 'createTime'],
      }
    },
  }
</script>
