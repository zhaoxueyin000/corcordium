<template>
  <swiper
    direction="vertical"
    :modules="modules"
    :spaceBetween="50"
    :cssMode="true"
    :mousewheel="true"
    :loop="false"
  >
    <swiper-slide class="slide1">
      <div>
        <video autoplay muted loop class="video">
          <source src="@/assets/logo.mp4" type="video/mp4" />
        </video>
        <div>333</div>
      </div>
    </swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
  </swiper>
</template>

<script>
// import CarouselContainer from '@/components/CarouselContainer'
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide
    // CarouselContainer
  },
  data() {
    return {};
  },
  setup() {
    return {
      modules: [Pagination, Autoplay, Mousewheel]
    };
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
// video::-webkit-media-controls-timeline {
//   display: none;
// }
.slide1 {
  align-items: flex-start;
}
.video {
  width: 100%;
  height: auto;
}
</style>