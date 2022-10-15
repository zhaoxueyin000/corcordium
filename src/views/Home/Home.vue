<template>
  <MobileContent :lang="lang" v-if="isMobile" />
  <PCContent :lang="lang" v-else />
  <LangMenu @func="setLang" />
</template>

<script>
import PCContent from "./PCContent.vue";
import MobileContent from "./MobileContent.vue";
import LangMenu from "@/components/LangMenu";

import uaParser from "ua-parser-js";

export default {
  components: {
    PCContent,
    MobileContent,
    LangMenu
  },
  data() {
    return {
      lang: "en",
      isMobile: false // 区分pc/h5
    };
  },
  created() {
    this.isMobile = new uaParser().getDevice().type === "mobile";
  },
  methods: {
    setLang(lang) {
      // 预设语言与当前语言一致不做切换
      console.log(lang);
      if (this.lang !== lang) {
        this.lang = lang;
        // this.$i18n.locale = lang
      }
    }
  }
};
</script>