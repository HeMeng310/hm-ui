<template>
  <div class="hm-input" :class="{ 'hm-input_suffix': showSuffix }">
    <!-- 绑定value值和input事件  -->
    <!-- 通过showPassword改变type的类型，通过passwordVisiable改变type为text还是password -->
    <input
      class="hm-input_inner"
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisiable ? 'text' : 'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
    />
    <span class="hm-input_suffix" v-if="showSuffix">
      <i
        class="hm-input_icon hm-icon-guanbi"
        v-if="clearable && value"
        @click="clear"
      ></i>
      <i
        class="hm-input_icon hm-icon-yanjing"
        :class="{'hm-icon-view-active':passwordVisiable}"
        v-if="showPassword && type == 'password'"
        @click="handlePassword"
      ></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "HmInput",
  data() {
    return {
      // 显示是否显示密码框
      passwordVisiable: false,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //绑定input事件进行回调
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    clear() {
      this.$emit("input", "");
    },
    handlePassword() {
      this.passwordVisiable = !this.passwordVisiable;
    },
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword;
    },
  },
};
</script>
<style lang="scss" scoped>
.hm-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .hm-input_inner {
    -webkit-appearance: nhm;
    background-color: #fff;
    background-image: nhm;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: nhm;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: nhm;
      border-color: #409eff;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.hm-input_suffix {
  .hm-input_inner {
    padding-right: 30px;
  }
  .hm-input_suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .hm-icon-view-active{
      color: #409eff;
    }
  }
}
</style>
