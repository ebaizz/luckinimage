<template>
  <rl-post-ticket-create
    #default="{ formData, formRules, post, validateField, loading: creating, isMaxAttachments }"
    :handle-response="() => toastSuccessAndClose()"
    :form-instance="formInstance"
  >
    <form-page-template
      ref="formPage"
      :form-data="formData"
      :form-rules="formRules"
      :title="$routeMap.TicketCreate.title"
      :close-to="$routeMap.Tickets.fullPath"
    >
      <lui-button slot="positiveAction" :loading="creating" type="primary" text="创建" @click="post" />
      <lui-card>
        <lui-form-item label="相关产品与服务" prop="productId" no-margin>
          <lui-input slot="valid" v-model="formData.productId" />
        </lui-form-item>
        <lui-form-item label="问题描述" prop="content">
          <lui-input slot="valid" v-model="formData.content" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" />
        </lui-form-item>
        <lui-form-item label="手机号" prop="phone">
          <lui-input v-model="formData.phone" />
        </lui-form-item>
        <lui-form-item label="邮箱" prop="email">
          <lui-input v-model="formData.email" />
        </lui-form-item>
        <lui-form-item label="附件">
          <rl-info-oss-sign-host
            #default="{ info: ossSignInfo = {}, loading: ossInfoLoading, refresh: reqOssSignInfo }"
            :auto-request-config="{ enable: false }"
          >
            <el-upload
              ref="uploader"
              :data="ossSignInfo.formData"
              :auto-upload="false"
              :disabled="isMaxAttachments || uploadLoading || creating || ossInfoLoading"
              :action="ossSignInfo.host ? ossSignInfo.host : ''"
              :on-change="(file, fileList) => onFileChange(file, fileList, reqOssSignInfo, formData)"
              :on-error="onUploadError"
              :limit="5"
              :on-remove="(file, fileList) => onFileRemove(file, fileList, formData)"
            >
              <lui-button
                text="添加附件"
                :disabled="isMaxAttachments || uploadLoading || creating || ossInfoLoading"
                :loading="ossInfoLoading || uploadLoading"
              />
              <lui-tip
                slot="tip"
                margin-top
                tip="可上传5个附件，支持JPG,JPEG,BMP,PNG,GIF,TXT,DOC,DOCX,7Z,RAR,ZIP,PDF,XLS,XLSX格式，最大不超过5M"
              />
            </el-upload>
          </rl-info-oss-sign-host>
        </lui-form-item>
      </lui-card>
    </form-page-template>
  </rl-post-ticket-create>
</template>

<script>
  import { BaseFormView, FormPageTemplate } from '@lstack/lstack-ui'
  import RlPostTicketCreate from '@workorder/api/renderless/ticket/rl-post-ticket-create'
  import RlInfoOssSignHost from '@workorder/api/renderless/oss-sign-host/rl-info-oss-sign-host'
  import { MenuActivatable } from '@project/console'

  export default {
    name: 'TicketCreate',
    components: { RlInfoOssSignHost, RlPostTicketCreate, FormPageTemplate },
    extends: BaseFormView,
    mixins: [MenuActivatable],
    data() {
      return {
        uploadLoading: false,
        formValidApi: undefined,
      }
    },
    methods: {
      onFileChange(file, fileList, reqOssSignInfo, formData) {
        if (file.status === 'ready') {
          reqOssSignInfo()
            .then(res => {
              file.url = `${res.data.data.host}/${res.data.data.formData.key}`
              this.$refs.uploader.submit()
              this.uploadLoading = true
              return res
            })
            .catch(() => {
              // TODO: 错误提示 by 吴斌
            })
        } else if (file.status === 'success') {
          this.uploadLoading = false
          formData.attachments = fileList.map(item => {
            return { filepath: item.url }
          })
        } else if (file.status === 'fail') {
          this.uploadLoading = false
          let failIndex
          fileList.forEach((item, index) => {
            if (file.uid === item.uid) {
              failIndex = index
            }
          })
          fileList.splice(failIndex, 1)
        }
      },
      onUploadError() {
        this.$message.error('文件上传失败')
      },
      onFileRemove(file, fileList, formData) {
        formData.attachments = fileList.map(item => {
          return { filepath: item.url }
        })
      },
      defaultActiveMenuLink() {
        return this.$route.fullPath
      },
    },
  }
</script>
