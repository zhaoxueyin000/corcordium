<template>
  <div class="text-center">
    <!-- <Image :src="logo" :fit="fit" width="115px" :alt="fit" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      fit: 'fill',
      logo: require('@/assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>