<template>
<!-- 对话框的遮罩 -->
  <transition name="dialog-fade">
    <div class="hm-dialog_wrapper" v-show="visable" @click.self="handleClose">
    <!-- 对话框 -->
    <div class="hm-dialog" :style="{width, marginTop}">
      <!-- 头部 -->
      <div class="hm-dialog_header">
        <slot name="title">
          <span class="hm-dialog_title">{{ title }}</span>
        </slot>
        <span class="hm-dialog_headerbtn" @click="handleClose">
          <i class="hm-icon-guanbi"></i>
        </span>
      </div>
      <!-- 内容 -->
      <div class="hm-dialog_body">
        <!-- 默认插槽 -->
        <slot></slot>
      </div>
      <!-- 底部 -->
      <div class="hm-dialog_footer" v-if="$slots.footer">
        <!-- 如果footer不传递内容，则不显示footer -->
        <slot name="footer" ></slot>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: "HmDialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    width:{
        type:String,
        default:'50%'
    },
    marginTop:{
        type:String,
        default:'15vh'
    },
    visable:{
        type:Boolean,
        default:false
    }
  },
  methods:{
    handleClose(){
        // 通知父组件修改visable的值
        this.$emit('update:visable',false)
    }
  }
};
</script>

<style lang="scss" scoped>
// scoped会给当前组件的模板中的所有的元素都添加一个随机的属性
// scoped会给当前组件中的所有样式添加一个对应的属性选择器
.hm-dialog_wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);
  .hm-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;
    &_header {
      padding: 20px 20px 10px;
      .hm-dialog_title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .hm-dialog_headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: nhm;
        outline: nhm;
        cursor: pointer;
        font-size: 16px;
        .hm-icon-close {
          color: 909399;
        }
      }
    }
    &_body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &_footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      ::v-deep .hm-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.dialog-fade-enter-active{
  animation: fade .3s;
}
.dialog-fade-leave-active{
  animation: fade .3s reverse;
}
@keyframes fade{
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
