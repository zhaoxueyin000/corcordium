<template>
  <swiper
    class="mobileContent"
    :class="font + ' ' + lang"
    direction="vertical"
    :modules="modules"
    :cssMode="true"
    :mousewheel="true"
    :loop="false"
    :speed="600"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="swipe1 flex-start">
      <div>
        <video autoplay muted loop preload="auto" class="video">
          <source src="@/assets/h5/logo.mp4" type="video/mp4" />
        </video>
        <img src="@/assets/logo.png" class="logo" />
        <p class="scale-7">{{ $t('logo.music') }}</p>
      </div>
    </swiper-slide>

    <swiper-slide class="swipe2">
      <div>
        <img :src="telTexts[lang].guide" class="guide" />
        <div>
          <img :src="telTexts[lang].screen" class="screen" />
          <img :src="tels[item]" v-for="item in activeIndexs" :key="item" class="view" />
          <div class="clear" @click="activeIndexs = []" />
        </div>

        <div class="tel">
          <div class="offset">
            <p class="green scale-7" :class="lang==='cn' && 'v-font-12'" v-html="$t('tel')"></p>
          </div>
          <img src="@/assets/h5/tel.png" />
          <div class="nums red">
            <span v-for="i in 10" :key="i" @click="dial(i)" />
          </div>
          <div class="go" @click="slideTo" />
        </div>
      </div>
    </swiper-slide>

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
          <div>
            <p class="scale-9">{{ $t('heart.popup1') }}</p>
            <p class="scale-9">{{ $t('heart.popup2') }}</p>
            <p class="scale-9">{{ $t('heart.popup3') }}</p>
            <p class="scale-9">{{ $t('heart.popup4') }}</p>
            <p class="scale-9">{{ $t('heart.popup5') }}</p>
            <p class="scale-9">{{ $t('heart.popup6') }}</p>
            <p class="scale-9" v-html="$t('heart.popup7')"></p>
            <p class="scale-9">{{ $t('heart.popup8') }}</p>
            <p class="scale-9">{{ $t('heart.popup9') }}</p>
            <p class="scale-9">{{ $t('heart.popup10') }}</p>
          </div>
        </div>
      </Transition>
    </swiper-slide>

    <swiper-slide class="swipe4 flex-start">
      <img src="@/assets/h5/character.gif" class="character" />
      <div class="container green text-left">
        <div class="text" :class="lang">
          <p :class="lang !== 'en' && 'v-font-14'" v-html="$t('brain.text1')"></p>
          <p class="scale-6">{{ $t('brain.text2') }}</p>
          <p class="scale-6">{{ $t('brain.text3') }}</p>
          <p class="scale-6">{{ $t('brain.text4') }}</p>
        </div>
      </div>
      <img src="@/assets/page/page_icon2.png" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="swipe5 flex-start">
      <img :src="pyramidTexts[lang].pyramid" class="pyramid" />
      <img src="@/assets/h5/brain_light.png" class="brain-light flush" />
      <img src="@/assets/h5/en/brain.png" class="brain" />
      <img src="@/assets/page/page_icon3.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <swiper-slide class="swipe6 flex-start">
      <div class="width100">
        <img src="@/assets/h5/game_center.png" class="game-center" />
        <p class="red" :class="lang==='en'? 'v-font-17' : 'v-font-19'">{{ $t('sport') }}</p>
        <VueMatrixRaindrop
          :canvasWidth="canvasWidth"
          :canvasHeight="600"
          :speed="5"
          :fontSize="14"
          v-if="swiperIndex === 5"
        ></VueMatrixRaindrop>
        <img src="@/assets/h5/bg/7.png" class="line" />
      </div>
      <img src="@/assets/page/page_icon4.png" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="swipe7 flex-start">
      <div class="width100">
        <div class="title">
          <img :src="titles[lang]" :class="lang" />
        </div>

        <div class="files">
          <img v-for="item in files" :key="item" :src="item" @click="openFile" />
        </div>

        <div class="games">
          <div v-for="(item, index) in gameMusics" :key="item.img">
            <img
              :src="item.img"
              :class="'img'+ (index + 1)"
              :style="{'z-index': this.count === index + 1 ? '100' : '99'}"
              v-if="fileIndexs.indexOf(index) !== -1"
              @click="setMusicPlay(index)"
            />
          </div>
          <img src="@/assets/file/modal.png" class="img16" v-if="fileIndexs.indexOf(14) !== -1" />
        </div>

        <swiper
          :slidesPerView="'auto'"
          :spaceBetween="12"
          class="mobile-music-swiper blue"
          @swiper="onMusicSwiper"
        >
          <swiper-slide
            v-for="(item, index) in gameMusics"
            :key="item.text"
            @click="setMusicPlay(index)"
            :class="lang!=='en'&&' v-font-15'"
          >{{$t('games.'+ item.text)}}</swiper-slide>
        </swiper>

        <p class="wathet scale-8 slide" :class="lang!=='en'&&' v-font-14'">{{ $t('games.slide') }}</p>

        <audio :src="musicUrl" :loop="false" hidden :autoplay="autoPlay" v-if="swiperIndex === 6" />
      </div>
      <img src="@/assets/page/page_icon5.png" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="swipe8">
      <div class="width100">
        <p class="wathet" :class="lang==='en'? 'v-font-17' : 'v-font-20'">{{ $t('sport') }}</p>
        <div class="games text-right">
          <img src="@/assets/h5/bg/machine.png" class="machine" />
          <div class="btns text-center">
            <span
              v-for="i in 3"
              :key="i"
              class="blush shake-opacity"
              :class="lang !== 'en' && 'v-font-14'"
              @click="videoIndex = (i-1)"
              v-html="$t('gaming.game') + i"
            ></span>
          </div>
          <video autoplay muted loop preload="auto" class="video">
            <source :src="videos[videoIndex]" type="video/mp4" />
          </video>
          <img src="@/assets/h5/btn1.png" class="btn1" />
        </div>
        <p
          class="green click scale-9"
          :class="lang !== 'en' && 'v-font-14'"
          v-html="$t('gaming.click')"
        ></p>
      </div>
      <img src="@/assets/page/page_icon6.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <swiper-slide class="swipe9">
      <div class="width100">
        <p class="wathet" :class="lang==='en'? 'v-font-17' : 'v-font-20'">{{ $t('poster.music') }}</p>
        <swiper
          :modules="modules1"
          :navigation="true"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :loop="true"
          :speed="800"
          class="mobile-poster-swiper"
          @slideChange="onPosterSlideChange"
        >
          <swiper-slide v-for="(item, index) in posters" :key="item.text">
            <div>
              <img :src="item[lang]" class="poster" />
              <p
                class="light-blue text scale-6"
                :class="lang"
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

        <p
          class="wathet"
          :class="(lang === 'en' ? 'scale-8' : 'v-font-14') + ' ' + lang"
          v-html="$t('switch')"
        ></p>
        <audio
          :src="posterMusics[posterIndex]"
          :loop="false"
          autoplay
          hidden
          v-if="swiperIndex === 8"
          ref="audio1"
          id="audio1"
        />
      </div>
      <img src="@/assets/page/page_icon7.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <swiper-slide class="swipe10">
      <div class="width100">
        <p
          class="green title"
          :class="(lang==='en'? 'v-font-17' : 'v-font-20') + ' ' +lang"
          style="height: 30px;"
        >{{ $t('album.music') }}</p>
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

              <p
                class="white"
                :class="(lang==='en'?'scale-8':'v-font-12')+' '+lang"
                v-html="$t('album.' + item.text)"
              ></p>

              <Transition
                name="ear"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
              >
                <div class="play" @click="recordChange" v-show="albumIndex === index">
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
        <p class="green scale-8" :class="lang !== 'en' && 'v-font-14'" v-html="$t('switch')"></p>

        <audio
          :src="albumMusics[albumIndex]"
          :loop="false"
          autoplay
          hidden
          v-if="swiperIndex === 9"
          id="audio2"
          ref="audio2"
          @timeupdate="changeProgress"
        />
      </div>
      <img src="@/assets/page/page_icon8.png" class="page-anchor page-anchor-1" />
    </swiper-slide>

    <swiper-slide class="swipe1 swipe11 flex-start">
      <div style="width: 100%">
        <div class="width100">
          <p
            class="wathet"
            :class="lang==='en'? 'v-font-17' : 'v-font-20'"
            style="line-height: 30px"
          >{{ $t('team.team') }}</p>
          <div class="team1">
            <p
              class="wathet"
              :class="lang==='en'? 'scale-9' : 'v-font-15'"
              v-html="$t('team.trend')"
            ></p>
            <p class="green" :class="lang==='en' ? 'scale-8' : 'v-font-13'">
              <span class="wathet">&lt;&nbsp;</span>
              <span v-html="$t('team.producer')"></span>
              <span class="wathet">&nbsp;></span>
            </p>
            <p class="green" :class="lang==='en' ? 'scale-8' : 'v-font-13'">
              <span class="wathet">&lt;&nbsp;</span>
              <span v-html="$t('team.composers')"></span>
              <span class="wathet">&nbsp;></span>
            </p>
            <p class="blue members scale-65" :class="lang">
              <span class="green">*</span>
              <span v-html="$t('team.members')"></span>
            </p>
          </div>

          <div class="team2">
            <div
              v-for="(item, index) in teams"
              :key="teams"
              class="yellow"
              :class="'text' + (index+1)"
            >
              <p
                :class="lang==='en' ? 'scale-9' : 'v-font-13'"
                v-html="$t('team.' + item)"
                @mouseover="teamIndex = index + 1"
              ></p>

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
                  <p class="white scale-8" v-html="$t('team.' + item + '1')"></p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        <div class="width100 media">
          <img src="@/assets/h5/cn/media.png" v-if="lang==='en'" />
          <img src="@/assets/h5/en/media.png" v-else />
        </div>
      </div>
      <img src="@/assets/page/page_icon9.png" class="page-anchor page-anchor-2" />
    </swiper-slide>
  </swiper>
</template>

<script>
import VueMatrixRaindrop from "vue-matrix-digit-rain";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Navigation, EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

let controlledSwiper = null;
const onSwiper = swiper => {
  controlledSwiper = swiper;
};

let musicSwiper = null;
const onMusicSwiper = swiper => {
  musicSwiper = swiper;
};

export default {
  components: {
    Swiper,
    SwiperSlide,
    VueMatrixRaindrop
  },
  props: ["lang", "font"],
  setup() {
    return {
      onSwiper,
      onMusicSwiper,
      modules: [Mousewheel],
      modules1: [Navigation, EffectCoverflow]
    };
  },
  data() {
    return {
      swiperIndex: 0,
      activeIndexs: [],
      popupVisible: false,
      fileIndexs: [],
      count: 0,
      musicUrl: "",
      autoPlay: false,
      canvasWidth: 375,
      videoIndex: 0,
      posterIndex: 0,
      posterPlay: false,
      albumIndex: 0,
      recordPlay: false,
      progress: 0,
      timer: 0,
      teamIndex: 0,
      telTexts: {
        en: {
          guide: require("@/assets/h5/en/guide.png"),
          screen: require("@/assets/h5/en/screen.png")
        },
        cn: {
          guide: require("@/assets/h5/cn/guide.png"),
          screen: require("@/assets/h5/cn/screen.png")
        },
        jp: {
          guide: require("@/assets/h5/jp/guide.png"),
          screen: require("@/assets/h5/jp/screen.png")
        }
      },
      tels: [
        require("@/assets/tel/tel1.png"),
        require("@/assets/tel/tel2.png"),
        require("@/assets/tel/tel3.png"),
        require("@/assets/tel/tel4.png"),
        require("@/assets/tel/tel5.png"),
        require("@/assets/tel/tel6.png"),
        require("@/assets/tel/tel7.png"),
        require("@/assets/tel/tel8.png"),
        require("@/assets/tel/tel9.png"),
        require("@/assets/tel/tel0.png")
      ],
      heartTexts: {
        en: require("@/assets/h5/en/movie.png"),
        cn: require("@/assets/h5/cn/movie.png"),
        jp: require("@/assets/h5/jp/movie.png")
      },
      pyramidTexts: {
        en: {
          pyramid: require("@/assets/h5/en/pyramid.png")
          // brain: require("@/assets/h5/en/brain.png")
        },
        cn: {
          pyramid: require("@/assets/h5/cn/pyramid.png")
        },
        jp: {
          pyramid: require("@/assets/h5/jp/pyramid.png")
        }
      },
      titles: {
        en: require("@/assets/h5/en/title.png"),
        cn: require("@/assets/h5/cn/title.png"),
        jp: require("@/assets/h5/jp/title.png")
      },
      files: [
        require("@/assets/file/file1.png"),
        require("@/assets/file/file2.png"),
        require("@/assets/file/file3.png")
      ],
      gameMusics: [
        {
          img: require("@/assets/h5/files/1.png"),
          text: "battle",
          music:
            "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
        },
        {
          img: require("@/assets/h5/files/2.png"),
          text: "blooded",
          music: "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
        },
        {
          img: require("@/assets/h5/files/3.png"),
          text: "future",
          music: ""
        },
        {
          img: require("@/assets/h5/files/4.png"),
          text: "cyberpunk",
          music: ""
        },
        {
          img: require("@/assets/h5/files/5.png"),
          text: "warfare",
          music: ""
        },
        {
          img: require("@/assets/h5/files/6.png"),
          text: "grand",
          music: ""
        },
        {
          img: require("@/assets/h5/files/7.png"),
          text: "dynamic",
          music: ""
        },
        {
          img: require("@/assets/h5/files/8.png"),
          text: "speed",
          music: ""
        },
        {
          img: require("@/assets/h5/files/9.png"),
          text: "intense",
          music: ""
        },
        {
          img: require("@/assets/h5/files/10.png"),
          text: "suspense",
          music: ""
        },
        {
          img: require("@/assets/h5/files/11.png"),
          text: "psychedelic",
          music: ""
        },
        {
          img: require("@/assets/h5/files/12.png"),
          text: "retro",
          music: ""
        },
        {
          img: require("@/assets/h5/files/13.png"),
          text: "leisure",
          music: ""
        },
        {
          img: require("@/assets/h5/files/14.png"),
          text: "cure",
          music: ""
        },
        {
          img: require("@/assets/h5/files/15.png"),
          text: "relax",
          music: ""
        }
      ],
      videos: [
        require("@/assets/logo.mp4"),
        require("@/assets/logo.mp4"),
        require("@/assets/logo.mp4")
      ],
      posters: [
        {
          en: require("@/assets/h5/en/poster/edps.jpg"),
          cn: require("@/assets/h5/cn/poster/edps.jpg"),
          jp: require("@/assets/h5/jp/poster/edps.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/wj.jpg"),
          cn: require("@/assets/h5/cn/poster/wj.jpg"),
          jp: require("@/assets/h5/jp/poster/wj.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/zw.jpg"),
          cn: require("@/assets/h5/cn/poster/zw.jpg"),
          jp: require("@/assets/h5/jp/poster/zw.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/llg.jpg"),
          cn: require("@/assets/h5/cn/poster/llg.jpg"),
          jp: require("@/assets/h5/jp/poster/llg.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/fkzjh.jpg"),
          cn: require("@/assets/h5/cn/poster/fkzjh.jpg"),
          jp: require("@/assets/h5/jp/poster/fkzjh.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/jt.jpg"),
          cn: require("@/assets/h5/cn/poster/jt.jpg"),
          jp: require("@/assets/h5/jp/poster/jt.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/wsqs.jpg"),
          cn: require("@/assets/h5/cn/poster/wsqs.jpg"),
          jp: require("@/assets/h5/jp/poster/wsqs.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/hx.jpg"),
          cn: require("@/assets/h5/cn/poster/hx.jpg"),
          jp: require("@/assets/h5/jp/poster/hx.jpg"),
          text: "edps"
        },
        {
          en: require("@/assets/h5/en/poster/xld.jpg"),
          cn: require("@/assets/h5/cn/poster/xld.jpg"),
          jp: require("@/assets/h5/jp/poster/xld.jpg"),
          text: "edps"
        }
      ],
      posterMusics: [
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        require("@/assets/music/demo.mp3")
      ],
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
      albumMusics: [
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        "https://blog.coolight.cool/wp-content/uploads/2022/05/%E5%A4%A7%E5%96%9C_%E6%B4%9B%E5%A4%A9%E4%BE%9D.m4a",
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
      ],
      teams: ["plan", "analysis", "design", "art"]
    };
  },
  mounted() {
    this.canvasWidth = window.innerWidth;
  },
  methods: {
    onSlideChange(swiper) {
      this.swiperIndex = swiper.realIndex;
      if (swiper.realIndex === 8) {
        this.posterPlay = true;
      }
      if (swiper.realIndex === 9) {
        this.recordPlay = true;
      }
      if (this.swiperIndex !== 9 && this.timer) {
        this.recordPlay = false;
        this.progress = 0;
        clearInterval(this.timer);
        this.timer = 0;
      }
    },
    slideTo() {
      console.log(this.activeIndexs);
      if (this.activeIndexs.length > 0) {
        const index = Number(this.activeIndexs.join("")) + 2;
        controlledSwiper.slideTo(index);
        // 切换至指定slide清空屏幕数字
        this.$nextTick(function() {
          this.activeIndexs = [];
        });
      }
    },
    dial(index) {
      // 当前只有9页，默认清空前一次数字
      console.log(index);
      this.activeIndexs[0] = index - 1;
    },
    changeHeartVisible(visible) {
      this.popupVisible = visible;
    },
    openFile() {
      // 右侧文件夹播放
      if (this.count < 15) {
        console.log(this.count);
        this.musicPlay(this.count);
        this.fileIndexs.push(this.count);
        this.count++;
      }
    },
    musicPlay(index) {
      this.musicUrl = this.gameMusics[index].music;
      this.autoPlay = true;
      musicSwiper.slideTo(index);
    },
    setMusicPlay(index) {
      this.count = index + 1;
      this.musicPlay(index);
    },
    onPosterSlideChange(swiper) {
      console.log(swiper.realIndex);
      this.posterIndex = swiper.realIndex;
      this.posterPlay = true;
    },
    postChange() {
      const audio1 = document.getElementById("audio1");
      if (this.posterPlay) {
        audio1.pause();
      } else {
        audio1.play();
      }
      this.posterPlay = !this.posterPlay;
    },
    onAlbumSlideChange(swiper) {
      if (swiper.previousIndex !== swiper.realIndex) {
        this.progress = 0;
      }
      this.recordPlay = true;
      this.albumIndex = swiper.realIndex;
      console.log(this.albumIndex);
    },
    recordChange() {
      const audio2 = document.getElementById("audio2");
      if (this.recordPlay) {
        audio2.pause();
      } else {
        audio2.play();
      }
      this.recordPlay = !this.recordPlay;
    },
    changeProgress() {
      setTimeout(() => {
        const audio2 = this.$refs.audio2;
        if (audio2 && this.timer === 0) {
          this.timer = setInterval(() => {
            const numbers = audio2.currentTime / audio2.duration;
            let perNumber = (numbers * 100).toFixed(2);
            if (perNumber >= 100) {
              this.recordPlay = false;
              this.progress = 0;
              clearInterval(this.timer);
              this.timer = 0;
            }
            this.progress = perNumber;
          }, 30);
        }
      }, 30);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mobileContent.scss";
</style>