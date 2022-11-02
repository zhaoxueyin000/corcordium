<template>
  <div>
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
export default {
  name: "Matrix",
  data() {
    return {
      setInt: ""
    };
  },
  destroyed() {
    // 退出页面销毁
    clearInterval(this.setInt);
  },
  mounted() {
    this.$nextTick(() => {
      // 第一个计时器控制生成速度
      this.setInt = setInterval(() => {
        let img = document.createElement("img");
        // 随机数范围2-4，下落所需时间
        let timeNum = this.random(2, 4);
        // img.style.transition = `all ${timeNum}s linear`;
        img.className = "text";
        img.src = require("@/assets/page/page_icon1.png");
        this.$refs.box.appendChild(img);
        // img.style.top = -img.offsetHeight + "px";
        img.style.left =
          this.random(0, this.$refs.box.offsetWidth - img.offsetWidth) + "px";
        // 生成图片200毫秒后进行移动
        setTimeout(() => {
          // 随机数范围2-4，红包下落完成后销毁dom
          let timeOut = setTimeout(() => {
            img && this.$refs.box.removeChild(img);
          }, timeNum * 1000);
        }, 200);
      }, 200);
    });
  },
  methods: {
    random(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  }
};
</script>

<style lang="scss">
.box {
  .text {
    display: block;
    position: absolute;
    z-index: 1000;
    width: 270px;
    height: 60px;
    animation: move 3s infinite linear;
    transform: rotate(90deg);
  }
}

@keyframes move {
  0% {
    top: 25%;
  }
  100% {
    top: 100%;
  }
}
</style>
