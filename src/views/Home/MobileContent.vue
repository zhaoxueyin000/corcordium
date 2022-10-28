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
        <img src="@/assets/h5/logo.gif" class="video" />
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

        <img :src="telTexts[lang].dial" class="dial" :class="lang" />
        <div class="tel">
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
          <p class="white" :class="lang!=='en' && 'v-font-14'" v-html="$t('heart.studio')"></p>
          <p v-html="$t('heart.music')" :class="lang==='en' ? 'scale-9' : 'v-font-12'"></p>
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
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup1') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup2') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup3') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup4') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup5') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup6') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'" v-html="$t('heart.popup7')"></p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup8') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup9') }}</p>
            <p :class="lang==='en' ? 'scale-9': 'v-font-13'">{{ $t('heart.popup10') }}</p>
          </div>
        </div>
      </Transition>
    </swiper-slide>

    <swiper-slide class="swipe4 flex-start">
      <img src="@/assets/h5/character.gif" class="character" />
      <div class="container green text-left">
        <div class="text" :class="lang">
          <p :class="lang !== 'en' && 'v-font-14'" v-html="$t('brain.text1')"></p>
          <p class="scale-7">{{ $t('brain.text2') }}</p>
          <p class="scale-7">{{ $t('brain.text3') }}</p>
          <p class="scale-7">{{ $t('brain.text4') }}</p>
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
          <div
            v-for="(item, index) in gameMusics"
            :key="item.img"
            class="modal"
            :class="'modal'+ (index + 1)"
            :style="{'z-index': count === index + 1 ? '100' : '99'}"
          >
            <div v-show="fileIndexs.indexOf(index) !== -1">
              <img :src="item.img" @click="setMusicPlay(index)" />
              <img
                :src="item.pause"
                class="btn"
                v-if="count===index+1 && filePlay"
                @click.stop="fileChange()"
              />
              <img :src="item.play" class="btn" v-else @click.stop="fileChange()" />
            </div>
          </div>
          <div class="modal modal16" v-show="fileIndexs.indexOf(14) !== -1">
            <img src="@/assets/files/modal.png" />
          </div>
        </div>

        <section class="theme-list">
          <div class="fixed-nav" ref="fixednav">
            <div class="fixed-nav-content">
              <p
                v-for="(item, index) in gameMusics"
                :key="item.text"
                ref="scrollItem"
                :class="['tab-title blue', activeId === index && 'select-tab', lang!=='en' && 'v-font-15']"
                @click="setMusicPlay(index, $event)"
              >{{$t('games.'+ item.text)}}</p>
            </div>
          </div>
        </section>

        <p class="wathet scale-8 slide" :class="lang!=='en'&&' v-font-14'">{{ $t('games.slide') }}</p>

        <audio :src="musicUrl" :loop="false" hidden autoplay id="audio3" v-if="swiperIndex === 6" />
      </div>
      <img src="@/assets/page/page_icon5.png" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="swipe8">
      <div class="width100">
        <p class="wathet" :class="lang==='en' ? 'v-font-17' : 'v-font-20'">{{ $t('sport') }}</p>
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

              <Transition name="ear">
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

    <swiper-slide class="swipe10 flex-start">
      <div class="width100">
        <p
          class="green title"
          :class="(lang==='en'? 'v-font-17' : 'v-font-20') + ' ' +lang"
        >{{ $t('album.music') }}</p>
        <swiper
          :grabCursor="true"
          :loop="true"
          :speed="500"
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

              <Transition name="ear">
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
          <p class="wathet" :class="lang==='en'? 'v-font-17' : 'v-font-20'">{{ $t('team.team') }}</p>
          <div class="team1 text-left">
            <img :src="teamTexts[lang].top" :class="lang" />
          </div>

          <div class="team2">
            <img :src="teamTexts[lang].bottom" :class="lang" />
            <div v-for="(item, index) in teamPopTexts[lang]" :key="item">
              <div :class="'text text' + (index+1)" @mouseover="teamIndex = index + 1"></div>
              <Transition
                name="team"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <div
                  class="team-popup"
                  :class="'popup-' + (index+1)"
                  v-show="teamIndex === index + 1"
                  @mouseleave="teamIndex = -1"
                >
                  <img :src="item" />
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <div class="width100 media text-left">
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
import { files, videos, posterMusics, albums, albumMusics } from "@/utils/enum";

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
      activeId: 0,
      swiperIndex: 0,
      activeIndexs: [],
      popupVisible: false,
      fileIndexs: [],
      count: 0,
      musicUrl: "",
      filePlay: false,
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
          screen: require("@/assets/h5/en/screen.png"),
          dial: require("@/assets/h5/en/dial.png")
        },
        cn: {
          guide: require("@/assets/h5/cn/guide.png"),
          screen: require("@/assets/h5/cn/screen.png"),
          dial: require("@/assets/h5/cn/dial.png")
        },
        jp: {
          guide: require("@/assets/h5/jp/guide.png"),
          screen: require("@/assets/h5/jp/screen.png"),
          dial: require("@/assets/h5/jp/dial.png")
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
      files: files,
      gameMusics: [
        {
          img: require("@/assets/h5/files/1/1.png"),
          play: require("@/assets/h5/files/1/play.png"),
          pause: require("@/assets/h5/files/1/pause.png"),
          text: "battle",
          music:
            "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
        },
        {
          img: require("@/assets/h5/files/2/2.png"),
          play: require("@/assets/h5/files/2/play.png"),
          pause: require("@/assets/h5/files/2/pause.png"),
          text: "blooded",
          music: "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
        },
        {
          img: require("@/assets/h5/files/3/3.png"),
          play: require("@/assets/h5/files/3/play.png"),
          pause: require("@/assets/h5/files/3/pause.png"),
          text: "future",
          music:
            "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
        },
        {
          img: require("@/assets/h5/files/4/4.png"),
          play: require("@/assets/h5/files/4/play.png"),
          pause: require("@/assets/h5/files/4/pause.png"),
          text: "cyberpunk",
          music: "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
        },
        {
          img: require("@/assets/h5/files/5/5.png"),
          play: require("@/assets/h5/files/5/play.png"),
          pause: require("@/assets/h5/files/5/pause.png"),
          text: "warfare",
          music: ""
        },
        {
          img: require("@/assets/h5/files/6/6.png"),
          text: "grand",
          music: ""
        },
        {
          img: require("@/assets/h5/files/7/7.png"),
          play: require("@/assets/h5/files/7/play.png"),
          pause: require("@/assets/h5/files/7/pause.png"),
          text: "dynamic",
          music: ""
        },
        {
          img: require("@/assets/h5/files/8/8.png"),
          play: require("@/assets/h5/files/8/play.png"),
          pause: require("@/assets/h5/files/8/pause.png"),
          text: "speed",
          music: ""
        },
        {
          img: require("@/assets/h5/files/9/9.png"),
          text: "intense",
          music: ""
        },
        {
          img: require("@/assets/h5/files/10/10.png"),
          play: require("@/assets/h5/files/10/play.png"),
          pause: require("@/assets/h5/files/10/pause.png"),
          text: "suspense",
          music: ""
        },
        {
          img: require("@/assets/h5/files/11/11.png"),
          play: require("@/assets/h5/files/11/play.png"),
          pause: require("@/assets/h5/files/11/pause.png"),
          text: "psychedelic",
          music: ""
        },
        {
          img: require("@/assets/h5/files/12/12.png"),
          play: require("@/assets/h5/files/12/play.png"),
          pause: require("@/assets/h5/files/12/pause.png"),
          text: "retro",
          music: ""
        },
        {
          img: require("@/assets/h5/files/13/13.png"),
          play: require("@/assets/h5/files/13/play.png"),
          pause: require("@/assets/h5/files/13/pause.png"),
          text: "leisure",
          music: ""
        },
        {
          img: require("@/assets/h5/files/14/14.png"),
          play: require("@/assets/h5/files/14/play.png"),
          pause: require("@/assets/h5/files/14/pause.png"),
          text: "cure",
          music: ""
        },
        {
          img: require("@/assets/h5/files/15/15.png"),
          play: require("@/assets/h5/files/15/play.png"),
          pause: require("@/assets/h5/files/15/pause.png"),
          text: "relax",
          music: ""
        }
      ],
      videos: videos,
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
      posterMusics: posterMusics,
      albums: albums,
      albumMusics: albumMusics,
      teamTexts: {
        en: {
          top: require("@/assets/h5/en/team/team_top.png"),
          bottom: require("@/assets/h5/en/team/team_bottom.png")
        },
        cn: {
          top: require("@/assets/h5/cn/team/team_top.png"),
          bottom: require("@/assets/h5/cn/team/team_bottom.png")
        },
        jp: {
          top: require("@/assets/h5/jp/team/team_top.png"),
          bottom: require("@/assets/h5/jp/team/team_bottom.png")
        }
      },
      teamPopTexts: {
        en: [
          require("@/assets/h5/en/team/pop1.png"),
          require("@/assets/h5/en/team/pop2.png"),
          require("@/assets/h5/en/team/pop3.png"),
          require("@/assets/h5/en/team/pop4.png")
        ],
        cn: [
          require("@/assets/h5/cn/team/pop1.png"),
          require("@/assets/h5/cn/team/pop2.png"),
          require("@/assets/h5/cn/team/pop3.png"),
          require("@/assets/h5/cn/team/pop4.png")
        ],
        jp: [
          require("@/assets/h5/jp/team/pop1.png"),
          require("@/assets/h5/jp/team/pop2.png"),
          require("@/assets/h5/jp/team/pop3.png"),
          require("@/assets/h5/jp/team/pop4.png")
        ]
      }
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
    musicPlay(index, event) {
      this.musicUrl = this.gameMusics[index].music;
      this.changeTab(index, event);
      this.fileChange(true);
    },
    setMusicPlay(index, event) {
      // 左侧菜单播放
      this.count = index + 1;
      this.musicPlay(index, event);
    },
    fileChange(play) {
      console.log(play);
      const audio3 = document.getElementById("audio3");
      if (play) {
        this.filePlay = true;
        audio3.play();
        return false;
      }
      if (this.filePlay) {
        audio3.pause();
      } else {
        audio3.play();
      }
      this.filePlay = !this.filePlay;
    },
    changeTab(index, event) {
      // 如果选择的和当前激活的不同
      console.log(this.$refs.scrollItem[index].offsetWidth);
      if (index !== this.activeId && event) { // TODO
        this.activeId = index;
        // 计算当前按钮的位置，看是否需要移动
        console.log(event);
        const spanLeft = event.clientX; // 当前点击的元素左边距离
        const divBox = document.querySelector(".select-tab").clientWidth / 2; // 点击的元素一半宽度
        const totalWidths = document.body.clientWidth; // 屏幕总宽度
        const widths = totalWidths / 2; // 一半的屏幕宽度
        const spanRight = totalWidths - spanLeft; // 元素的右边距离
        const scrollBox = document.querySelector(".fixed-nav"); // 获取最外层的元素
        const scrollL = scrollBox.scrollLeft; // 滚动条滚动的距离
        // 当元素左边距离 或者 右边距离小于100时进行滑动
        if (spanRight < 100 || spanLeft < 100) {
          scrollBox.scrollLeft = scrollL + (spanLeft - widths) + divBox;
        }
      }
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