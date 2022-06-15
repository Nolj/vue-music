
<template>
<!-- 手机号验证 -->
    <div class="wrapper">
      <verify-info></verify-info>
      <verify-code></verify-code>
      <login-btn @click.native="logon" :title="title"></login-btn>
      <!-- 设置提示语 -->
      <alert :is-alert="alert" :alert="alertText"></alert>
      <loading :is-loading="loading"></loading>
    </div>
</template>

<script>
import verifyInfo from './verifyInfo'
import verifyCode from './verifyCode'
import loginBtn from '@/components/header/components/loginBtn'
import alert from '@/components/header/components/alert.vue'
import loading from '@/components/header/components/loading.vue'
import {loginStatus} from '../../../networks/index.js'
export default {
  name: 'phoneVerify',
  components:{
    loginBtn,
    alert,
    loading
  },
  data(){
    return{
      alert: false,
      alertText: '验证码错误',
      title:"登录",
      loading: false,
      flag: true
    }
  },
  components: {
    verifyInfo,
    verifyCode
  },
  methods: {
    alertEvent () {
      // 如果输入内容不合法，提示组件显示
      // 显示一段时间后隐藏
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.alert = true
      // 1s 后隐藏组件
      this.timer = setTimeout(() => {
        this.alert = false
      }, 1000)
    },
    /**
     * 登录状态：登陆成功后存取登录状态及信息
     */
    _getLoginState () {
      loginStatus()
        .then(res => {
          // 存取用户 id
          let userId = res.data.profile.userId
          if (res.data.code === 200) {
            // 存取用户信息
            let accountInfo = res.data.profile
            // 成功登陆
            // 修改状态为 1
            this.$store.commit('LOGIN_STATE', 1)
            // Vuex在用户刷新的时候loginState会回到默认值false
            // 所以我们需要用到HTML5储存
            // 我们设置一个名为loginState
            localStorage.setItem('loginState', 1)
            // 存入用户头像 昵称
            localStorage.setItem('avatarUrl', accountInfo.avatarUrl)
            localStorage.setItem('nickname', accountInfo.nickname)
            // 存取用户 uid信息
            this.$store.commit('ACCOUNT_UID', userId)
            localStorage.setItem('accountUid', userId)
            this._getUserDetail(userId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    success () {
      // loading 样式隐藏
      this.LoadingEnd()
      // 存取登陆状态
      this._getLoginState()
    },
    /**
     * 密码错误登录失败
     */
    error (msg) {
      this.alertText = msg || '验证码错误'
      // 显示提示信息
      this.alertEvent()
      // loading 样式隐藏
      this.LoadingEnd()
      // 登陆按钮的锁去掉
      this.flag = true
    },
    logon () {
      if (this.flag) {
        if (!this.pwd) {
          this.alertText = '请输入验证码'
          // 显示提示信息
          this.alertEvent()
          return
        }
        this.flag = false
        this.Loading()
        // 判断密码是否正确
        this.passwordIsCorrect(this.pwd)
      }
    },
    /**
     * 登陆完成 按钮内容复位
     * loading样式隐藏
     */
    LoadingEnd () {
      // 将按钮内容设置为 登录.
      this.title = '登录'
      // 页面显示loading 样式
      this.loading = false
    },
    /**
     * 登录中的 loading 设置
     */
    Loading () {
      // 将按钮内容设置为 登录中...
      this.title = '登录中...'
      // 页面显示loading 样式
      this.loading = true
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
   margin: 100px auto;
  width: 100vh;
  height: 50vh;
  box-sizing: border-box;
  padding: 0.23rem;
}
</style>