<template>
  <Content :lang="lang" />
  <LangMenu @func="setLang" />
</template>

<script>
import Content from "./Content.vue";
import LangMenu from "@/components/LangMenu";

export default {
  components: {
    Content,
    LangMenu
  },
  data() {
    return {
      lang: "en"
    };
  },
  methods: {
    setLang(lang) {
      if (this.lang === lang) { // 预设语言与当前语言一致
        return false;
      }
      console.log(lang);
      this.lang = lang;
    }
  }
};
</script>