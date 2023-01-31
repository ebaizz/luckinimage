function formDataC() {
  return {
    phone: undefined,
    email: undefined,
    content: undefined,
    productId: undefined,
    attachments: [], // filepath
  }
}

function formRulesC(formData) {
  return {
    productId: [{ required: true, message: '请选择相关产品与服务', trigger: 'blur' }],
    content: [{ required: true, message: '请描述您的问题', trigger: 'blur' }],
  }
}

export default { formDataC, formRulesC }
