// 匹配规则
const rules = {
  username: [
    { required: true,message:"用户名不能为空", trigger: 'blur' }
  ],
  password: [
    { required: true,message:"密码不能为空", trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  phoneNum: [
    {required:true, message: '请输入手机号',pattern:/^1[345678]\d{9}$/, trigger: 'blur' }
  ]
}
export {
  rules
}
