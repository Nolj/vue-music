<template>
<!-- 更新日志 -->
  <div class="code">
    <el-input
      :value="value"
      :length="4"
      :gutter="15"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <el-input
      :show="showKeyboard"
      placeholder="请输入验证码"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import {verify} from '../../../networks/index.js'
import { getPhone } from '../../../assets/utils/getPhone.js'
export default {
  name: 'verifyCode',
  data () {
    return {
      value: '',
      showKeyboard: true
    }
  },
  methods: {
    async onInput (key) {
      this.value = (this.value + key).slice(0, 4)
      if (this.value.length === 4) {
        const phone = getPhone()
        const captcha = this.value
        try {
          const { data } = await verify({phone:phone, captcha:captcha})
          if (data.code === 200) {
            alert('验证成功')
          }
        } catch (error) {
          if (error) {
            alert(error.msg || '验证失败')
            this.value = ''
          }
        }
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.code{
  border-bottom: 2px solid #aaa;
}
</style>