<template>
  <div class="white-space" :style="{ height: gutter }" />
</template>

<script>
export default {
  name: "WhiteSpace",
  props: ["gutter"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.white-space {
  height: 20px;
}
</style>