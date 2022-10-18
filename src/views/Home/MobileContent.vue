<template>
  <swiper
    class="mobileContent"
    :class="font"
    direction="vertical"
    :modules="modules"
    :cssMode="true"
    :mousewheel="true"
    :loop="false"
    :speed="600"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <!-- logo -->
    <swiper-slide class="swipe1 flex-start">
      <div>
        <video autoplay muted loop preload="auto" class="video">
          <source src="@/assets/h5/logo.mp4" type="video/mp4" />
        </video>
        <img src="@/assets/logo.png" class="logo" />
        <p class="text">{{ $t('logo.music') }}</p>
      </div>
    </swiper-slide>

    <!-- tel -->
    <swiper-slide class="swipe2">
      <div>
        <img :src="telTexts[lang].guide" class="guide" />
        <div>
          <img :src="telTexts[lang].screen" class="screen" />
        </div>
      </div>
    </swiper-slide>

    <!-- heart -->
    <swiper-slide class="swipe3 flex-start">
      <div class="width100">
        <img src="@/assets/heart.gif" class="heart" @click="changeHeartVisible(true)" />
        <div class="text text-left">
          <p class="white" v-html="$t('heart.studio')"></p>
          <p v-html="$t('heart.music')"></p>
        </div>
        <img :src="heartTexts[lang]" class="movie" />
      </div>

      <img src="@/assets/page/page_icon1.png" class="page-anchor" />

      <Transition
        name="heart"
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div
          class="heart-popup green"
          v-if="popupVisible"
          @click="changeHeartVisible(false)"
          style="user-select: none;"
        >
          <div :class="lang">
            <p>{{ $t('heart.popup1') }}</p>
            <p>{{ $t('heart.popup2') }}</p>
            <p>{{ $t('heart.popup3') }}</p>
            <p>{{ $t('heart.popup4') }}</p>
            <p>{{ $t('heart.popup5') }}</p>
            <p>{{ $t('heart.popup6') }}</p>
            <p v-html="$t('heart.popup7')"></p>
            <p>{{ $t('heart.popup8') }}</p>
            <p>{{ $t('heart.popup9') }}</p>
            <p>{{ $t('heart.popup10') }}</p>
          </div>
        </div>
      </Transition>
    </swiper-slide>

    <!-- brain -->
    <swiper-slide class="swipe4 flex-start">
      <img src="@/assets/h5/character.gif" class="character" />
      <div class="container green text-left">
        <div class="text">
          <p>{{ $t('brain.text1') }}</p>
          <p>{{ $t('brain.text2') }}</p>
          <p>{{ $t('brain.text3') }}</p>
          <p>{{ $t('brain.text4') }}</p>
        </div>
      </div>
      <img src="@/assets/page/page_icon2.png" class="page-anchor" />
    </swiper-slide>

    <!-- pyramid -->
    <swiper-slide class="swipe5 flex-start">
      <img :src="pyramidTexts[lang].pyramid" class="pyramid" />
      <img src="@/assets/h5/brain_light.png" class="brain-light flush" />
      <img :src="pyramidTexts[lang].brain" class="brain" />
      <img src="@/assets/page/page_icon3.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <!-- mp4 -->
    <swiper-slide class="swipe6 flex-start">
      <p class="red v-font-16">{{ $t('sport') }}</p>
      <img src="@/assets/page/page_icon4.png" class="page-anchor" />
    </swiper-slide>

    <!-- games -->
    <swiper-slide class="swipe7 flex-start">
      <div class="text green">
        <p class="pressStart2P v-font-15">{{ $t('games.play') }}</p>
        <p class="text2">{{ $t('games.text1') }}</p>
        <p class="text3" v-html="$t('games.text2')"></p>
      </div>
      <img src="@/assets/page/page_icon5.png" class="page-anchor" />
    </swiper-slide>

    <!-- play games -->
    <swiper-slide class="swipe8">
      <div class="width100">
        <p class="wathet v-font-16">{{ $t('gaming.music') }}</p>
        <div class="games text-right">
          <img src="@/assets/h5/bg/machine.png" class="machine" />
          <div class="btns text-center">
            <span
              v-for="i in 3"
              :key="i"
              v-html="$t('gaming.game') + i"
              class="blush shake-opacity"
              @click="videoIndex = (i-1)"
            ></span>
          </div>
          <video autoplay muted loop preload="auto" class="video">
            <source :src="videos[videoIndex]" type="video/mp4" />
          </video>
          <img src="@/assets/h5/btn1.png" class="btn1" />
        </div>
        <p class="green click" v-html="$t('gaming.click')"></p>
      </div>
      <img src="@/assets/page/page_icon6.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <!-- poster -->
    <swiper-slide class="swipe9">
      <div class="width100">
        <p class="wathet v-font-16">{{ $t('poster.music') }}</p>
        <swiper
          :modules="modules1"
          :navigation="true"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :loop="true"
          class="mobile-poster-swiper"
          @slideChange="onPosterSlideChange"
        >
          <swiper-slide v-for="(item, index) in posters[lang]" :key="item.text">
            <div>
              <img :src="item.img" class="poster" />
              <p
                class="blue text"
                v-html="$t('poster.' + item.text)"
                v-show="posterIndex === index"
              ></p>

              <Transition
                name="ear"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
              >
                <div class="play" @click="postChange" v-show="posterIndex === index">
                  <img src="@/assets/poster/ear.png" class="ear" />
                  <img src="@/assets/poster/pause.png" class="btn" v-if="posterPlay" />
                  <img src="@/assets/poster/play.png" class="btn" v-else />
                </div>
              </Transition>
            </div>
          </swiper-slide>
        </swiper>
        <p class="wathet switch" v-html="$t('switch')"></p>
      </div>
      <img src="@/assets/page/page_icon7.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <!-- album -->
    <swiper-slide class="swipe10">
      <div class="width100">
        <p class="green v-font-16">{{ $t('album.music') }}</p>
        <swiper
          :grabCursor="true"
          :loop="true"
          class="mobile-album-swiper"
          @slideChange="onAlbumSlideChange"
        >
          <swiper-slide v-for="(item, index) in albums" :key="item.img" :class="item.type">
            <div>
              <img :src="item.img" class="album" :class="'album-' + (index+1)" />

              <template v-if="item.type === 'tape'">
                <img
                  src="@/assets/album/tape_left.png"
                  class="tape-play"
                  :class="albumIndex === index && recordPlay && 'rotate'"
                />
                <img
                  src="@/assets/album/tape_right.png"
                  class="tape-play"
                  :class="albumIndex === index && recordPlay  && 'rotate'"
                />
              </template>
              <img
                src="@/assets/album/cd.png"
                class="cd-play"
                :class="albumIndex === index && recordPlay  && 'rotate'"
                v-else-if="item.type === 'cd'"
              />
              <img
                :src="item.right"
                class="record-play"
                :class="albumIndex === index && recordPlay  && 'rotate'"
                v-else-if="item.type === 'record'"
              />

              <p class="white text" v-html="$t('album.' + item.text)"></p>

              <Transition
                name="ear"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
              >
                <div
                  class="play cursor-pointer"
                  @click="recordChange"
                  v-show="albumIndex === index"
                >
                  <img src="@/assets/album/ear.png" class="ear" />
                  <img src="@/assets/album/pause.png" class="btn" v-if="recordPlay" />
                  <img src="@/assets/album/play.png" class="btn" v-else />
                </div>
              </Transition>
            </div>
          </swiper-slide>
        </swiper>

        <div class="progress">
          <div class="circle" :style="{left: progress + '%'}" />
          <div class="progress-bar" :style="{width: (100 - progress) + '%',left: progress + '%'}" />
        </div>
        <p class="green switch" v-html="$t('switch')"></p>
      </div>
      <img src="@/assets/page/page_icon8.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <!-- team -->
    <swiper-slide class="swipe1 swipe11 flex-start">
      <div style="width: 100%">
        <div class="width100">
          <p class="wathet v-font-16">{{ $t('team.team') }}</p>
          <div class="team1">
            <p class="wathet switch" v-html="$t('team.trend')"></p>
            <p class="green switch" v-html="$t('team.producer')"></p>
            <p class="green switch" v-html="$t('team.composers')"></p>
            <p class="blue members" v-html="$t('team.members')"></p>
          </div>
          <div class="team2">
            <div
              v-for="(item, index) in teams"
              :key="teams"
              class="yellow"
              :class="'text' + (index+1)"
            >
              <p class="switch" v-html="$t('team.' + item)" @mouseover="teamIndex = index + 1"></p>

              <Transition
                name="team"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <div
                  class="team-popup"
                  :class="'popup-' + (index+1)"
                  v-if="teamIndex === index + 1"
                  @mouseleave="teamIndex = -1"
                >
                  <p class="white" v-html="$t('team.' + item + '1')"></p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        <div class="width100 media">
          <div>
            <img src="@/assets/logo.png" class="logo" />
          </div>
          <div>
            <p class="wathet switch gerbil">
              {{ $t("team.email") }}:
              <span class="green">corcordium@tom.com</span>
            </p>
            <p class="wathet switch gerbil">
              {{ $t("team.wechat") }}:
              <span class="green">COR2DIUM</span>
            </p>
            <p class="wathet switch genWanMinJP">沪ICP备案号: 2022028490</p>
          </div>
        </div>
      </div>
      <img src="@/assets/page/page_icon9.png" class="page-anchor page-anchor-2" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Navigation, EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

let controlledSwiper = null;
const onSwiper = swiper => {
  controlledSwiper = swiper;
};

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ["lang", "font"],
  setup() {
    return {
      onSwiper,
      modules: [Mousewheel],
      modules1: [Navigation, EffectCoverflow]
    };
  },
  data() {
    return {
      popupVisible: false,
      videoIndex: 0,
      posterIndex: 0,
      posterPlay: false,
      albumIndex: 0,
      recordPlay: false,
      progress: 0,
      teamIndex: 0,
      telTexts: {
        en: {
          guide: require("@/assets/h5/en/guide.png"),
          screen: require("@/assets/h5/en/screen.png")
        },
        cn: {
          guide: require("@/assets/h5/en/guide.png"),
          screen: require("@/assets/h5/en/screen.png")
        },
        jp: {
          guide: require("@/assets/h5/en/guide.png"),
          screen: require("@/assets/h5/en/screen.png")
        }
      },
      heartTexts: {
        en: require("@/assets/h5/en/movie.png"),
        cn: require("@/assets/h5/cn/movie.png"),
        jp: require("@/assets/h5/jp/movie.png")
      },
      pyramidTexts: {
        en: {
          pyramid: require("@/assets/h5/en/pyramid.png"),
          brain: require("@/assets/h5/en/brain.png")
        }
      },
      videos: [
        require("@/assets/logo.mp4"),
        require("@/assets/logo.mp4"),
        require("@/assets/logo.mp4")
      ],
      posters: {
        en: [
          {
            img: require("@/assets/h5/en/poster/edps.jpg"),
            text: "edps"
          },
          {
            img: require("@/assets/h5/en/poster/edps.jpg"),
            text: "edps"
          },
          {
            img: require("@/assets/h5/en/poster/edps.jpg"),
            text: "edps"
          }
        ]
      },
      albums: [
        {
          img: require("@/assets/album/1.png"),
          text: "text1",
          right: require("@/assets/album/cd.png"),
          type: "cd"
        },
        {
          img: require("@/assets/album/2.png"),
          text: "text1",
          right: require("@/assets/album/22.png"),
          type: "record"
        },
        {
          img: require("@/assets/album/3.png"),
          text: "text1"
        },
        {
          img: require("@/assets/album/4.png"),
          text: "text1",
          right: require("@/assets/album/44.png"),
          type: "record"
        },
        {
          img: require("@/assets/album/5.png"),
          text: "text1",
          type: "tape"
        },
        {
          img: require("@/assets/album/6.png"),
          text: "text1",
          right: require("@/assets/album/record.png"),
          type: "record"
        },
        {
          img: require("@/assets/album/7.png"),
          text: "text1"
        },
        {
          img: require("@/assets/album/8.png"),
          text: "text1",
          right: require("@/assets/album/88.png"),
          type: "record"
        }
      ],
      teams: ["plan", "analysis", "design", "art"]
    };
  },

  methods: {
    onSlideChange() {},
    changeHeartVisible(visible) {
      this.popupVisible = visible;
    },
    onPosterSlideChange(swiper) {
      this.posterIndex = swiper.realIndex;
      // this.posterPlay = true;
    },
    onAlbumSlideChange(swiper) {
      this.albumIndex = swiper.realIndex;
    },
    postChange() {},
    recordChange() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mobileContent.scss";
</style>