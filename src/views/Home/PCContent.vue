<template>
  <swiper
    direction="vertical"
    :modules="modules"
    :cssMode="true"
    :mousewheel="true"
    :loop="false"
    :speed="600"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="slide1 flex-start">
      <div>
        <video autoplay muted loop preload="auto" class="video" style="object-fit:cover">
          <source src="@/assets/logo.mp4" type="video/mp4" />
        </video>
        <div class="logo">
          <img src="@/assets/logo.png" width="180" />
        </div>
        <div>
          <img :src="logoText[lang]" height="14" />
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="slide2">
      <div class="container1">
        <Row justify="space-between">
          <div class="tel-container">
            <img :src="telTexts[lang].title" class="title" :class="lang" />
            <div class="tels">
              <div class="grid cursor-custom-finger">
                <div
                  v-for="(item, index) in tels"
                  :key="item.img"
                  :class="'num' + (index+1)"
                  @click="dial(index)"
                >
                  <img :src="item.active" v-if="activeIndexs.indexOf(index) !== -1" />
                  <img :src="item.img" v-else />
                </div>
              </div>
            </div>

            <WhiteSpace gutter="0.13rem" />
            <div>
              <img
                :src="goActive ? require('@/assets/tel/gogo.png') : require('@/assets/tel/go.png')"
                class="cursor-custom-finger go"
                @click="slideTo"
              />
            </div>
            <div>
              <img src="@/assets/tel/logo.png" class="cursor-custom-finger logo" />
            </div>
          </div>

          <div class="tel">
            <div class="view">
              <img
                :src="tels[item].show"
                style="height: 0.16rem"
                v-for="item in activeIndexs"
                :key="item"
              />
            </div>
            <img
              :src="telTexts[lang].clear"
              class="clear cursor-custom-finger"
              @click="activeIndexs = []"
            />
          </div>

          <div class="right-text">
            <img :src="telTexts[lang].text" />
          </div>
        </Row>
      </div>
      <img src="@/assets/h5/bg/7.png" class="line" />
    </swiper-slide>

    <swiper-slide class="slide3">
      <div class="container1">
        <img :src="heartTexts[lang].heart" class="img-fill" />
        <img
          src="@/assets/heart.gif"
          class="heart cursor-custom-finger"
          @click="changeHeartVisible(true)"
        />
      </div>
      <img src="@/assets/page/page_icon1.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide4 flex-start">
      <div style="width: 100%; height: 100%">
        <div class="line" />
        <img src="@/assets/brain.gif" class="gif" />
        <img :src="brainTexts[lang]" class="img-fill brain" />
      </div>
      <img src="@/assets/page/page_icon2.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide5">
      <div class="container1">
        <img :src="pyramidTexts[lang]" class="img-fill" />
        <img src="@/assets/brain_light.png" class="brain-light flush" />
        <img src="@/assets/brain.png" class="brain" />
      </div>
      <img src="@/assets/page/page_icon3.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide6 flex-start">
      <div class="container2">
        <video autoplay muted loop preload="auto" class="video" style="object-fit:cover">
          <source src="@/assets/data_animation.mp4" type="video/mp4" />
        </video>
        <div class="title text-center">
          <img src="@/assets/cn/gaming_music.png" height="20" v-if="lang==='cn'" />
          <img src="@/assets/jp/gaming_music.png" height="20" v-else-if="lang==='jp'" />
          <img src="@/assets/en/gaming_music.png" height="14" v-else />
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="slide7 flex-start">
      <div class="container2">
        <div class="title">
          <img src="@/assets/cn/games_text.png" style="width: 2.11rem" v-if="lang==='cn'" />
          <img src="@/assets/jp/games_text.png" style="width: 3.64rem" v-else-if="lang==='jp'" />
          <img src="@/assets/en/games_text.png" style="width: 4.93rem" v-else />
        </div>
        <audio :src="musicUrl" :loop="false" hidden autoplay id="audio3" v-if="swiperIndex === 6" />

        <div class="game">
          <div class="text-right names" :class="font">
            <div
              v-for="(item, index) in gameMusics"
              :key="item.img"
              class="name"
              :class="[this.count===index+1 && 'active', lang==='en'?'font-13':'font-18']"
              @click="setMusicPlay(index)"
            >{{$t('games.'+ item.text)}}</div>
          </div>
          <div class="modals">
            <div
              v-for="(item, index) in gameMusics"
              :key="item.img"
              class="cursor-custom-finger modal"
              :class="'modal'+ (index + 1)"
              :style="{'z-index': this.count === index + 1 ? '100' : '99'}"
            >
              <div v-show="fileIndexs.indexOf(index) !== -1">
                <img :src="item.img" @click="setMusicPlay(index)" />
                <img
                  :src="item.pause"
                  class="btn"
                  v-if="this.count===index+1 && filePlay"
                  @click.stop="fileChange()"
                />
                <img :src="item.play" class="btn" v-else @click.stop="fileChange()" />
              </div>
            </div>
            <div class="cursor-custom-finger modal modal16" v-show="fileIndexs.indexOf(14) !== -1">
              <img src="@/assets/files/modal.png" />
            </div>
          </div>
          <div class="cursor-custom-finger files">
            <div v-for="item in files" :key="item">
              <img :src="item" @click="openFile" />
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/page/page_icon5.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide8 flex-start">
      <div style="width: 100%">
        <WhiteSpace gutter="0.53rem" />
        <img src="@/assets/cn/games.png" class="text-height-1" v-if="lang === 'cn'" />
        <img src="@/assets/jp/games.png" class="text-height-1" v-else-if="lang === 'jp'" />
        <img src="@/assets/en/games.png" class="text-height-2 title1" v-else />

        <div class="text-right videos" style>
          <img src="@/assets/game_machine.png" class="game-machine" />
          <div class="btn-container">
            <img
              :src="item"
              v-for="(item, index) in gamingBtns[lang]"
              :key="item"
              class="cursor-custom-finger glow shake-opacity"
              @click="videoIndex = index"
            />
          </div>
          <video autoplay muted loop preload="auto" class="video" style="object-fit:cover">
            <source :src="videos[videoIndex]" type="video/mp4" />
          </video>
        </div>

        <img
          src="@/assets/cn/click.png"
          style="width: 0.84rem; margin-left: -0.42rem"
          class="click"
          v-if="lang === 'cn'"
        />
        <img
          src="@/assets/jp/click.png"
          class="click"
          style="margin-left: -0.77rem; width: 1.54rem"
          v-else-if="lang === 'jp'"
        />
        <img
          src="@/assets/en/click.png"
          style="width: 1.05rem; margin-left: -0.52rem"
          class="click"
          v-else
        />
      </div>
      <img src="@/assets/page/page_icon6.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide9">
      <div style="position:relative; padding-top: 40px">
        <img src="@/assets/cn/poster_text1.png" class="text-height-1" v-if="lang === 'cn'" />
        <img src="@/assets/jp/poster_text1.png" class="text-height-1" v-else-if="lang === 'jp'" />
        <img src="@/assets/en/poster_text1.png" class="text-height-2 title" v-else />

        <WhiteSpace gutter="0.26rem" />
        <swiper
          class="nested-swiper poster-swiper"
          :effect="'coverflow'"
          :modules="modules1"
          :speed="800"
          :navigation="true"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :coverflowEffect="{
            rotate: 0,
            stretch: 0,
            scale: 0.6,
            depth: 60,
            modifier: 1,
            slideShadows: false,
          }"
          :loop="true"
          @slideChange="onPosterSlideChange"
        >
          <swiper-slide
            v-for="(item, index) in posters"
            :key="item.text"
            class="cursor-custom-arrow"
          >
            <div>
              <img :src="item[lang]" class="poster" />

              <Transition name="ear">
                <div
                  class="play cursor-custom-finger"
                  @click="postChange"
                  v-show="posterIndex === index"
                >
                  <img src="@/assets/poster/ear.png" class="ear" />
                  <img src="@/assets/poster/pause.png" class="btn" v-if="posterPlay" />
                  <img src="@/assets/poster/play.png" class="btn" v-else />
                </div>
              </Transition>
            </div>
          </swiper-slide>
        </swiper>

        <audio
          :src="posterMusics[posterIndex]"
          :loop="false"
          autoplay
          hidden
          v-if="swiperIndex === 8"
          ref="audio1"
          id="audio1"
        />

        <WhiteSpace />
        <!-- ???????????? -->
        <div class="text">
          <p
            class="blue"
            :class="font+' '+(lang==='en'?'text-left': 'text-center')"
            v-html="$t('poster.' + posters[posterIndex].text)"
          ></p>
        </div>
        <WhiteSpace />
        <WhiteSpace />
        <img src="@/assets/cn/poster_text2.png" class="text-height-2" v-if="lang === 'cn'" />
        <img src="@/assets/jp/poster_text2.png" class="text-height-2" v-else-if="lang === 'jp'" />
        <img src="@/assets/en/poster_text2.png" class="text-height-3" v-else />
      </div>
      <img src="@/assets/page/page_icon7.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide10">
      <div>
        <WhiteSpace gutter="0.64rem" />
        <img src="@/assets/cn/pop_music_text1.png" class="text-height-1" v-if="lang === 'cn'" />
        <img src="@/assets/jp/pop_music_text1.png" class="text-height-1" v-else-if="lang === 'jp'" />
        <img src="@/assets/en/pop_music_text1.png" class="text-height-2 title" v-else />

        <WhiteSpace gutter="0.58rem" />
        <swiper
          class="nested-swiper album-swiper"
          :effect="'coverflow'"
          :grabCursor="true"
          :navigation="true"
          :speed="500"
          :centeredSlides="true"
          :slidesPerView="'3'"
          :coverflowEffect="{
            rotate: 0,
            stretch: 0,
            scale: 0.5,
            depth: -180,
            modifier: 1,
            slideShadows: false,
          }"
          :modules="modules1"
          :loop="true"
          @slideChange="onAlbumSlideChange"
        >
          <swiper-slide
            v-for="(item, index) in albums"
            :key="item.img"
            class="cursor-custom-arrow"
            :class="item.type"
          >
            <img :src="item.img" class="album" :class="'album-' + index" />
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

            <Transition name="ear">
              <div
                class="play cursor-custom-finger"
                @click="recordChange"
                v-show="albumIndex === index"
              >
                <img src="@/assets/album/ear.png" class="ear" />
                <img src="@/assets/album/pause.png" class="btn" v-if="recordPlay" />
                <img src="@/assets/album/play.png" class="btn" v-else />
              </div>
            </Transition>
          </swiper-slide>
        </swiper>

        <!-- ???????????? -->
        <WhiteSpace />
        <p
          class="white text-left"
          :class="font"
          v-html="$t('album.' + albums[albumIndex].pc)"
          style="height: 72px"
        ></p>
        <WhiteSpace />
        <WhiteSpace />

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
        <div class="progress" v-show="swiperIndex === 9">
          <div class="circle" :style="{left: progress + '%'}" />
          <div class="progress-bar" :style="{width: (100 - progress) + '%',left: progress + '%'}" />
        </div>
        <WhiteSpace gutter="0.12rem" />

        <img src="@/assets/cn/pop_music_text2.png" class="text-height-2" v-if="lang==='cn'" />
        <img src="@/assets/jp/pop_music_text2.png" class="text-height-2" v-else-if="lang==='jp'" />
        <img src="@/assets/en/pop_music_text2.png" class="text-height-3" v-else />
      </div>
      <img src="@/assets/page/page_icon8.png" width="101" class="page-anchor" />
    </swiper-slide>

    <swiper-slide class="slide1 slide11 flex-start">
      <div>
        <div class="container3">
          <WhiteSpace gutter="0.52rem" />
          <img :src="teamTexts[lang].team" class="title" />
          <WhiteSpace gutter="0.4rem" />
          <Row justify="space-between">
            <img :src="teamTexts[lang].left" class="left" :class="lang" />

            <div class="text-right text-container">
              <img :src="teamTexts[lang].right" class="right" />

              <template v-for="(item, index) in teamPopTexts[lang]" :key="item">
                <div class="text" :class="'text' + index" @mouseover="teamTextIndex = index + 1" />
                <!-- team popup -->
                <Transition
                  name="team"
                  mode="out-in"
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut"
                >
                  <div
                    class="team-popup"
                    :class="'img' + index"
                    v-show="teamTextIndex === index + 1"
                    @mouseleave="teamTextIndex = -1"
                  >
                    <img :src="item" />
                  </div>
                </Transition>
              </template>
            </div>
          </Row>
          <WhiteSpace gutter="0.75rem" />
        </div>

        <div class="footer">
          <Row justify="center">
            <img src="@/assets/logo.png" class="logo" />
            <div class="media">
              <img :src="teamTexts[lang].wechat" />
              <WhiteSpace gutter="0.07rem" />
              <img src="@/assets/en/icp.png" />
            </div>
            <div class="media">
              <a href="mailto: corcordium@tom.com" target="_blank" class="cursor-custom-finger">
                <img :src="teamTexts[lang].email" />
              </a>
            </div>
          </Row>
        </div>
      </div>
      <img src="@/assets/page/page_icon9.png" width="101" class="page-anchor page-anchor-1" />
    </swiper-slide>
  </swiper>

  <!-- heart popup -->
  <Transition
    name="heart"
    mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="heart-popup"
      v-if="popupVisible"
      @click="changeHeartVisible(false)"
      style="user-select: none;"
    >
      <img :src="heartTexts[lang].img" :style="{width: heartTexts[lang].width}" />
    </div>
  </Transition>
</template>

<script>
import WhiteSpace from "@/components/WhiteSpace";
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

export default {
  components: {
    WhiteSpace,
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
      timer: 0,
      popupVisible: false, // heart??????
      activeIndexs: [],
      goActive: false,
      swiperIndex: 0,
      count: 0,
      filePlay: false,
      musicUrl: "",
      fileIndexs: [],
      videoIndex: 0,
      posterIndex: 0,
      posterPlay: false,
      recordPlay: false,
      albumIndex: 0,
      progress: 0,
      teamTextIndex: 0,
      logoText: {
        en: require("@/assets/en/logo_text.png"),
        cn: require("@/assets/cn/logo_text.png"),
        jp: require("@/assets/jp/logo_text.png")
      },
      telTexts: {
        en: {
          title: require("@/assets/en/tel_text1.png"),
          screen: require("@/assets/en/screen.png"),
          clear: require("@/assets/en/clear.png"),
          text: require("@/assets/en/tel_text2.png")
        },
        cn: {
          title: require("@/assets/cn/tel_text1.png"),
          screen: require("@/assets/cn/screen.png"),
          clear: require("@/assets/cn/clear.png"),
          text: require("@/assets/cn/tel_text2.png")
        },
        jp: {
          title: require("@/assets/jp/tel_text1.png"),
          screen: require("@/assets/jp/screen.png"),
          clear: require("@/assets/jp/clear.png"),
          text: require("@/assets/jp/tel_text2.png")
        }
      },
      tels: [
        {
          img: require("@/assets/tel/1.png"),
          active: require("@/assets/tel/11.png"),
          show: require("@/assets/tel/tel1.png")
        },
        {
          img: require("@/assets/tel/2.png"),
          active: require("@/assets/tel/22.png"),
          show: require("@/assets/tel/tel2.png")
        },
        {
          img: require("@/assets/tel/3.png"),
          active: require("@/assets/tel/33.png"),
          show: require("@/assets/tel/tel3.png")
        },
        {
          img: require("@/assets/tel/4.png"),
          active: require("@/assets/tel/4.png"),
          show: require("@/assets/tel/tel4.png")
        },
        {
          img: require("@/assets/tel/5.png"),
          active: require("@/assets/tel/55.png"),
          show: require("@/assets/tel/tel5.png")
        },
        {
          img: require("@/assets/tel/6.png"),
          active: require("@/assets/tel/66.png"),
          show: require("@/assets/tel/tel6.png")
        },
        {
          img: require("@/assets/tel/7.png"),
          active: require("@/assets/tel/77.png"),
          show: require("@/assets/tel/tel7.png")
        },
        {
          img: require("@/assets/tel/8.png"),
          active: require("@/assets/tel/88.png"),
          show: require("@/assets/tel/tel8.png")
        },
        {
          img: require("@/assets/tel/9.png"),
          active: require("@/assets/tel/99.png"),
          show: require("@/assets/tel/tel9.png")
        },
        {
          img: require("@/assets/tel/0.png"),
          active: require("@/assets/tel/00.png"),
          show: require("@/assets/tel/tel0.png")
        }
      ],
      heartTexts: {
        en: {
          heart: require("@/assets/en/heart.png"),
          img: require("@/assets/en/heart_text.png"),
          width: "4.6rem"
        },
        cn: {
          heart: require("@/assets/cn/heart.png"),
          img: require("@/assets/cn/heart_text.png"),
          width: "4.1rem"
        },
        jp: {
          heart: require("@/assets/jp/heart.png"),
          img: require("@/assets/jp/heart_text.png"),
          width: "4.1rem"
        }
      },
      brainTexts: {
        en: require("@/assets/en/brain.png"),
        cn: require("@/assets/cn/brain.png"),
        jp: require("@/assets/jp/brain.png")
      },
      pyramidTexts: {
        en: require("@/assets/en/brain_text.png"),
        cn: require("@/assets/cn/brain_text.png"),
        jp: require("@/assets/jp/brain_text.png")
      },
      files: files,
      gameMusics: [
        {
          img: require("@/assets/files/1/1.png"),
          play: require("@/assets/files/1/play.png"),
          pause: require("@/assets/files/1/pause.png"),
          text: "battle",
          music:
            "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
        },
        {
          img: require("@/assets/files/2/2.png"),
          play: require("@/assets/files/2/play.png"),
          pause: require("@/assets/files/2/pause.png"),
          text: "blooded",
          music: "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
        },
        {
          img: require("@/assets/files/3/3.png"),
          play: require("@/assets/files/3/play.png"),
          pause: require("@/assets/files/3/pause.png"),
          text: "future",
          music:
            "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
        },
        {
          img: require("@/assets/files/4/4.png"),
          play: require("@/assets/files/4/play.png"),
          pause: require("@/assets/files/4/pause.png"),
          text: "cyberpunk",
          music: "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
        },
        {
          img: require("@/assets/files/5/5.png"),
          play: require("@/assets/files/5/play.png"),
          pause: require("@/assets/files/5/pause.png"),
          text: "warfare",
          music: ""
        },
        {
          img: require("@/assets/files/6/6.png"),
          text: "grand",
          music: ""
        },
        {
          img: require("@/assets/files/7/7.png"),
          play: require("@/assets/files/7/play.png"),
          pause: require("@/assets/files/7/pause.png"),
          text: "dynamic",
          music: ""
        },
        {
          img: require("@/assets/files/8/8.png"),
          play: require("@/assets/files/8/play.png"),
          pause: require("@/assets/files/8/pause.png"),
          text: "speed",
          music: ""
        },
        {
          img: require("@/assets/files/9/9.png"),
          text: "intense",
          music: ""
        },
        {
          img: require("@/assets/files/10/10.png"),
          play: require("@/assets/files/10/play.png"),
          pause: require("@/assets/files/10/pause.png"),
          text: "suspense",
          music: ""
        },
        {
          img: require("@/assets/files/11/11.png"),
          play: require("@/assets/files/11/play.png"),
          pause: require("@/assets/files/11/pause.png"),
          text: "psychedelic",
          music: ""
        },
        {
          img: require("@/assets/files/12/12.png"),
          play: require("@/assets/files/12/play.png"),
          pause: require("@/assets/files/12/pause.png"),
          text: "retro",
          music: ""
        },
        {
          img: require("@/assets/files/13/13.png"),
          play: require("@/assets/files/13/play.png"),
          pause: require("@/assets/files/13/pause.png"),
          text: "leisure",
          music: ""
        },
        {
          img: require("@/assets/files/14/14.png"),
          play: require("@/assets/files/14/play.png"),
          pause: require("@/assets/files/14/pause.png"),
          text: "cure",
          music: ""
        },
        {
          img: require("@/assets/files/15/15.png"),
          play: require("@/assets/files/15/play.png"),
          pause: require("@/assets/files/15/pause.png"),
          text: "relax",
          music: ""
        }
      ],
      gamingBtns: {
        en: [
          require("@/assets/en/game1.png"),
          require("@/assets/en/game2.png"),
          require("@/assets/en/game3.png")
        ],
        cn: [
          require("@/assets/cn/game1.png"),
          require("@/assets/cn/game2.png"),
          require("@/assets/cn/game3.png")
        ],
        jp: [
          require("@/assets/jp/game1.png"),
          require("@/assets/jp/game2.png"),
          require("@/assets/jp/game3.png")
        ]
      },
      videos: videos,
      posters: [
        {
          en: require("@/assets/en/poster/edps.jpg"),
          cn: require("@/assets/cn/poster/edps.jpg"),
          jp: require("@/assets/jp/poster/edps.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/wj.jpg"),
          cn: require("@/assets/cn/poster/wj.jpg"),
          jp: require("@/assets/jp/poster/wj.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/zw.jpg"),
          cn: require("@/assets/cn/poster/zw.jpg"),
          jp: require("@/assets/jp/poster/zw.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/llg.jpg"),
          cn: require("@/assets/cn/poster/llg.jpg"),
          jp: require("@/assets/jp/poster/llg.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/fkzjh.jpg"),
          cn: require("@/assets/cn/poster/fkzjh.jpg"),
          jp: require("@/assets/jp/poster/fkzjh.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/jcxrdn.jpg"),
          cn: require("@/assets/cn/poster/jcxrdn.jpg"),
          jp: require("@/assets/jp/poster/jcxrdn.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/jt.jpg"),
          cn: require("@/assets/cn/poster/jt.jpg"),
          jp: require("@/assets/jp/poster/jt.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/wsqs.jpg"),
          cn: require("@/assets/cn/poster/wsqs.jpg"),
          jp: require("@/assets/jp/poster/wsqs.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/hx.jpg"),
          cn: require("@/assets/cn/poster/hx.jpg"),
          jp: require("@/assets/jp/poster/hx.jpg"),
          text: "edps1"
        },
        {
          en: require("@/assets/en/poster/xld.jpg"),
          cn: require("@/assets/cn/poster/xld.jpg"),
          jp: require("@/assets/jp/poster/xld.jpg"),
          text: "edps1"
        }
      ],
      posterMusics: posterMusics,
      albums: albums,
      albumsTexts: {
        en: [
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png"),
          require("@/assets/en/pop_music_text3.png")
        ],
        cn: [
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png"),
          require("@/assets/cn/pop_music_text3.png")
        ],
        jp: [
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png"),
          require("@/assets/jp/pop_music_text3.png")
        ]
      },
      albumMusics: albumMusics,
      teamTexts: {
        en: {
          team: require("@/assets/en/team.png"),
          left: require("@/assets/en/team_left.png"),
          right: require("@/assets/en/team_right.png"),
          wechat: require("@/assets/en/wechat.png"),
          email: require("@/assets/en/email.png")
        },
        cn: {
          team: require("@/assets/cn/team.png"),
          left: require("@/assets/cn/team_left.png"),
          right: require("@/assets/cn/team_right.png"),
          wechat: require("@/assets/cn/wechat.png"),
          email: require("@/assets/cn/email.png")
        },
        jp: {
          team: require("@/assets/jp/team.png"),
          left: require("@/assets/jp/team_left.png"),
          right: require("@/assets/jp/team_right.png"),
          wechat: require("@/assets/cn/wechat.png"),
          email: require("@/assets/cn/email.png")
        }
      },
      teamPopTexts: {
        en: [
          require("@/assets/en/pop_team_text1.png"),
          require("@/assets/en/pop_team_text2.png"),
          require("@/assets/en/pop_team_text3.png"),
          require("@/assets/en/pop_team_text4.png")
        ],
        cn: [
          require("@/assets/cn/pop_team_text1.png"),
          require("@/assets/cn/pop_team_text2.png"),
          require("@/assets/cn/pop_team_text3.png"),
          require("@/assets/cn/pop_team_text4.png")
        ],
        jp: [
          require("@/assets/jp/pop_team_text1.png"),
          require("@/assets/jp/pop_team_text2.png"),
          require("@/assets/jp/pop_team_text3.png"),
          require("@/assets/jp/pop_team_text4.png")
        ]
      }
    };
  },
  methods: {
    slideTo() {
      this.goActive = true;
      console.log(this.activeIndexs);
      if (this.activeIndexs.length > 0) {
        const index = Number(this.activeIndexs.join("")) + 2;
        controlledSwiper.slideTo(index);
        // ???????????????slide??????????????????
        this.$nextTick(function() {
          this.activeIndexs = [];
        });
      }
      setTimeout(() => {
        this.goActive = false;
      }, 100);
    },
    dial(index) {
      // ????????????9?????????????????????????????????
      console.log(index);
      // if (this.activeIndexs.length < 1) {
      //   this.activeIndexs.push(index);
      // }
      this.activeIndexs[0] = index;
    },
    changeHeartVisible(visible) {
      this.popupVisible = visible;
    },
    openFile() {
      // ?????????????????????
      if (this.count < 15) {
        console.log(this.count);
        this.musicPlay(this.count);
        this.fileIndexs.push(this.count);
        this.count++;
      }
    },
    musicPlay(index) {
      this.musicUrl = this.gameMusics[index].music;
      this.fileChange(true);
    },
    setMusicPlay(index) {
      // ??????????????????
      this.musicPlay(index);
      if (this.fileIndexs.indexOf(index) === -1) {
        this.fileIndexs.push(index);
      }
      this.count = index + 1;
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
    onPosterSlideChange(swiper) {
      console.log(swiper.realIndex);
      this.posterIndex = swiper.realIndex === 9 ? 0 : swiper.realIndex;
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
        this.recordPlay = true;
        this.progress = 0;
      }
      this.albumIndex = swiper.realIndex;
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
    },
    recordChange() {
      const audio2 = document.getElementById("audio2");
      if (this.recordPlay) {
        audio2.pause();
      } else {
        audio2.play();
      }
      this.recordPlay = !this.recordPlay;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/PCContent.scss";
</style>