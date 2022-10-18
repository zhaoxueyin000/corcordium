<template>
  <MobileContent :lang="lang" :font="font" v-if="isMobile" />
  <PCContent :lang="lang" v-else />
  <LangMenu @func="setLang" :isMobile="isMobile" />
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
      isMobile: false, // 区分pc/h5
      font: 'gerbil',
      fonts: {
        en: 'gerbil',
        cn: 'genWanMinJP',
        jp: 'genWanMinJP'
      }
    };
  },
  created() {
    this.isMobile = new uaParser().getDevice().type === "mobile";
  },
  mounted() {},
  methods: {
    setLang(lang) {
      // 预设语言与当前语言一致不做切换
      console.log(lang);
      if (this.lang !== lang) {
        this.lang = lang;
        this.$i18n.locale = lang
        console.log(this.fonts[lang])
        this.font = this.fonts[lang]
      }
    }
  }
};
</script>