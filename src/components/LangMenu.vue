<template>
  <div class="lang-menu">
    <div
      v-for="item in menus"
      :key="item.lang"
      class="lang-menu-item cursor-pointer"
      @click="sendLang(item.lang)"
    >
      <img :src="item.img" :alt="item.lang" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LangMenu",
  props: {},
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
.lang-menu {
  position: absolute;
  top: 28%;
  left: 12px;
  z-index: 99;

  .lang-menu-item {
    img {
      width: 72px;
    }
    &:first-child img{
      width: 60px;
    }
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>