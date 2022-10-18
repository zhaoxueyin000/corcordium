<template>
  <div :class="(isMobile ? 'mobile' : 'pc') + '-lang-menu'">
    <div
      v-for="item in menus"
      :key="item.lang"
      class="cursor-pointer"
      :class="(isMobile ? 'mobile' : 'pc') + '-lang-menu-item'"
      @click="sendLang(item.lang)"
    >
      <img :src="item.img" :alt="item.lang" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LangMenu",
  props: ["isMobile"],
  data() {
    return {
      menus: [
        {
          img: require("@/assets/page/menu_cn.png"),
          lang: "cn",
          width: 60
        },
        {
          img: require("@/assets/page/menu_en.png"),
          lang: "en",
          width: 72
        },
        {
          img: require("@/assets/page/menu_jp.png"),
          lang: "jp",
          width: 72
        }
      ]
    };
  },
  methods: {
    sendLang(lang) {
      this.$emit("func", lang);
    }
  }
};
</script>

<style lang="scss" scoped>
.pc-lang-menu {
  position: absolute;
  top: 28%;
  left: 12px;
  z-index: 99;

  .pc-lang-menu-item {
    img {
      width: 72px;
    }
    &:first-child img {
      width: 60px;
    }
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
.mobile-lang-menu {
  position: absolute;
  top: 45px;
  left: 20px;
  z-index: 99;

  .mobile-lang-menu-item {
    img {
      width: 72px;
    }
    &:first-child img {
      width: 60px;
    }
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>