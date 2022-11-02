<template>
  <nav class="mobile-nav-wrap" ref="navBox">
    <ul class="mobile-nav-list">
      <li
        class="mobile-nav-item"
        @click="handleNavClick(index, true)"
        v-for="(item, index) of data"
        :key="item.text"
        :data-idx="index"
        :class="[activeNavIdx === index+1 && 'active', lang!=='en' && 'v-font-15']"
        ref="navs"
      >{{$t('games.'+ item.text)}}</li>
    </ul>
  </nav>
</template>

<script>
/**
 *
 * @param {HTMLElement} el 滚动元素
 * @param {Number} toPos 滚动目标
 * @param {Boolean} isHorizontal 是否是水平滚动
 * @param {Number} rate 滚动速率
 * @param {Function} cb 滚动完成时的回调函数
 * @returns void
 */
function scrollTo(el, toPos, isHorizontal = true, rate = 2, cb) {
  const direction = isHorizontal ? "scrollLeft" : "scrollTop";
  // 根据滚动方向取出用来赋值的key
  const boxLimitKey = isHorizontal ? "scrollWidth" : "scrollHeight";
  // 根据滚动方向取出用来获取最大滚动范围的key
  const windowLimitKey = isHorizontal ? "innerWidth" : "innerHeight";
  // 根据滚动方向取出用来获取最大滚动范围的key
  const limitSize = el[boxLimitKey] - window[windowLimitKey];
  let pos = el[direction];
  const isIncrease = toPos > pos;
  if (isIncrease && toPos > limitSize) {
    toPos = limitSize;
  } else if (!isIncrease && toPos < 0) {
    toPos = 0;
  }
  if (toPos === pos) return cb && cb();
  // 如果当前位置已经是要滚到的地方，直接return
  function step() {
    pos = pos + (toPos - pos) / rate;
    if ((isIncrease && toPos - pos <= 1) || (!isIncrease && pos - toPos <= 1)) {
      el[direction] = toPos;
      cb && cb();
    } else {
      el[direction] = pos;
      requestAnimationFrame(step);
    }
  }
  step();
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = fn => {
    setTimeout(fn, 17);
    // 模拟屏幕每帧的刷新时间
    // 17 ≈ 1s = 1000ms / 屏幕刷新率(60hz)
  };
}
export default {
  name: "Nav",
  props: ["data", "lang"],
  data() {
    return {
      activeNavIdx: 0
    };
  },
  methods: {
    handleNavClick(index, none) {
      if (this.activeNavIdx === index + 1) return;
      this.activeNavIdx = index + 1;
      this.handleScrollNavToCenter();
      none && this.$emit("func", index); // 播放指定音乐
    },
    handleScrollNavToCenter() {
      const dom = this.$refs.navs[this.activeNavIdx];
      // 当前元素
      const navBox = this.$refs.navBox;
      // 滚动容器
      const { scrollLeft, scrollWidth } = navBox;
      // 当前容器的滚动位置
      // 当前容器的宽度
      const limitScroll = scrollWidth - window.innerWidth;
      // 当前容器可滚动最大值
      const halfScreenWidth = window.innerWidth / 2;
      // 屏幕一半的宽度
      const domPosX = dom.offsetLeft;
      // 当前item相对于滚动容器的x轴位置
      const width = dom.offsetWidth;
      // width 元素宽度
      const centerAbsPosX = scrollLeft + halfScreenWidth;
      // 当前屏幕x轴中心相对于滚动容器的绝对位置
      const domAbsPosX = domPosX + width / 2;
      // 当前元素x轴中心点相对于滚动容器的x轴绝对位置
      let toPos = scrollLeft + (domAbsPosX - centerAbsPosX);
      // 要滚动到的位置
      this.scrollTo(navBox, toPos);
      // 滚动相应元素
      let v = toPos > 0 && toPos < limitScroll ? toPos + halfScreenWidth : null;
      // 计算滚动完成后元素相对于滚动容器的x轴位置
    },
    scrollTo
  }
};
</script>

<style lang="scss" scoped>
.mobile-nav-wrap {
  position: absolute;
  z-index: 1000;
  bottom: 110px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .mobile-nav-list {
    display: flex;
    white-space: nowrap;

    .mobile-nav-item {
      list-style: none;
      position: relative;
      padding: 0 27px;
      color: #0000ff;

      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 7px;
        width: 16px;
        height: 16px;
        background: #0000ff;
        border-radius: 50%;
      }

      &.active {
        color: #00ff00;
        &:after {
          background: #00ff00;
        }
      }
      &.v-font-15:after {
        top: 7px;
      }
    }
  }
}
</style>