<template>
  <label class="hm-radio" :class="{'is-checked':label===model}">
    <span class="hm-radio_input">
      <span class="hm-radio_inner"></span>
      <input
        type="radio"
        class="hm-radio_original"
        :value="label"
        :name="name"
        v-model="model"
      />
    </span>
    <span class="hm-radio_label">
      <slot></slot>
      <!-- 如果没有传值，就把label作为文本显示 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "HmRadio",
  props: {
    label: {
      type: [String, Number, Boolean],
      default: "",
    },
    value: null,
    name: {
      type: String,
      default: "",
    },
  },
  inject:{
    RadioGroup:{
      default:''
    }
  },
  computed:{
    // 需要提供一个计算属性model
    model:{
        get(){
            return this.isGroup?this.RadioGroup.value:this.value
        },
        set(value){
            // 触发父组件给当前组件注册的input事件
            this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
        }
    },
    // 用于判断是否被radioGroup包裹
    isGroup(){
      return !!this.RadioGroup
    }
  }
};
</script>

<style lang="scss" scoped>
.hm-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: nhm;
  font-size: 14px;
  margin-right: 30px;
  // -moz-user-select: nhm;
  // -webkit-user-select: nhm;
  // -moz-user-select: nhm;
  .hm-radio_input {
    white-space: nowrap;
    cursor: pointer;
    outline: nhm;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .hm-radio_inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }
    .hm-radio_original {
      opacity: 0;
      outline: nhm;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .hm-radio_label {
    font-size: 14px;
    padding-left: 10px;
  }
}
// 选中的样式
.hm-radio.is-checked {
  .hm-radio_input {
    .hm-radio_inner {
      border-color: #409eff;
      background-color: #409eff;
      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  .hm-radio_label {
    color: #409eff;
  }
}
</style>
