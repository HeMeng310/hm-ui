<template>
  <!-- 自定义switch组件的颜色，首先需要传入颜色的值，
    在子组件中获取后，
    使用ref获取节点，将背景颜色改变为对应颜色即可。 -->
  <div class="hm-switch" :class="{ 'is-checked': value }" @click="handleClick">
    <span class="hm-switch_core" ref="core">
      <span class="hm-switch_button"></span>
    </span>
    <input type="checkbox" class="hm-switch_input" :name="name" ref="input" />
  </div>
</template>

<script>
export default {
  name: "HmSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: "",
    },
    inactiveColor: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  methods: {
    async handleClick() {
      this.$emit("input", !this.value);
      // 等待value值发生改变再调用setColor
      // 数据修改后，等待DOM更新，在修改按钮颜色
      await this.$nextTick();
      this.setColor();
      // 控制checkbox的值，input值同步value的值
      this.$refs.input.checked = this.value;
    },
    setColor() {
      // 点击的是否修改背景颜色
      if (this.activeColor || this.inactiveColor) {
        var color = this.value ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = color;
        this.$refs.core.style.backgroundColor = color;
        // console.log(color);
      }
    },
  },
  //  通过mouted钩子和watch监听，
  // 在刚进入页面以及value改变时对颜色进行改变
  mounted() {
    // 修改开关颜色
    this.setColor();
    // 控制checkbox的值，input值同步value的值
    this.$refs.input.checked = this.value;
  },
};
</script>

<style lang="scss" scoped>
.hm-switch {
  display: inline-block;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  // 隐藏input标签
  .hm-switch_input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .hm-switch_core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: nhm;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .hm-switch_button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}

// 选中样式
.is-checked {
  .hm-switch_core {
    border-color: #409eff;
    background-color: #409eff;
    .hm-switch_button {
      transform: translateX(20px);
    }
  }
}
</style>
