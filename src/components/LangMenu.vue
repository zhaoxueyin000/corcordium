<template>
  <div class="lang-menu">
    <div
      v-for="item in menus"
      :key="item.lang"
      class="lang-menu-item cursor-pointer"
      @click="sendLang(item.lang)"
    >
      <img :src="item.img" :alt="item.lang" :width="item.width" />
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
          width: 44
        },
        {
          img: require("@/assets/page/menu_en.png"),
          lang: "en",
          width: 50
        },
        {
          img: require("@/assets/page/menu_jp.png"),
          lang: "jp",
          width: 50
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
  position: fixed;
  top: 30%;
  left: 10px;
  z-index: 99;
  font-size: 14px;

  .lang-menu-item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>