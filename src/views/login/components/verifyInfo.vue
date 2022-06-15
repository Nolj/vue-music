<template>
  <div class="container">
    <div class="info">
      <p>验证码已发送至</p>
      <p>
        <span>+86</span>
        <span>
          {{phone1}}
          <span class="middle">****</span>
          {{phone2}}
        </span>
      </p>
    </div>
    <div class="renew">重新获取</div>
  </div>
</template>

<script>
import { getPhone } from '../../../assets/utils/getPhone.js'
import {sendVerify,verify} from '../../../networks/index.js'
export default {
  name: 'verifyInfo',
  // 通过 url 传过来的手机号，存取后进行验证码发送操作
  data () {
    return {
      phone1: 133,
      phone2: 1234
    }
  },
  watch: {
    'phone1': {
      handler: function (val) {
        this.phone1 = val
      }
    },
    'phone2': {
      handler: function (val) {
        this.phone2 = val
      }
    }
  },
  methods: {
    // 发送验证码
    _sendVerify () {
      let phone = getPhone()
      // 发送验证码
      sendVerify({phone:phone})
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
    },
    /**
     * 截取手机号码进行页面显示
     */
    showPhone (phone) {
      this.phone1 = Array.from(phone).slice(0, 3).join('')
      this.phone2 = Array.from(phone).slice(-4).join('')
    },
//     /**
//      * 验证验证码
//      */
    verify () {
      let phone = getPhone()
      let captcha = '111'
      verify({phone:phone,captcha:captcha})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  },
  created () {
    const phone = this.$route.query.phone
    this.showPhone(phone)
    this._sendVerify()
  },
  beforeDestroy () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  p:first-child {
    margin-bottom: 0.3rem;
  }
  span {
    color: #ccc;
    .middle {
      vertical-align: -3px;
    }
  }
  .renew {
    color: #1a73e8;
    cursor: pointer;
  }
}
</style>