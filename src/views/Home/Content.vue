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
    <!-- logo -->
    <swiper-slide class="slide1 flex-start">
      <div>
        <video autoplay muted loop class="video">
          <source src="@/assets/logo.mp4" type="video/mp4" />
        </video>
        <WhiteSpace gutter="30" />
        <Row justify="center">
          <Col span="24">
            <img src="@/assets/logo.png" width="180" />
          </Col>
          <Col span="24">
            <img :src="logoText[lang]" height="12" />
          </Col>
        </Row>
      </div>
    </swiper-slide>

    <!-- tel -->
    <swiper-slide class="slide2">
      <div class="container">
        <Row>
          <Col span="6">
            <img src="@/assets/en/tel_text1.png" width="226" />
            <img src="@/assets/tel/phone.png" width="202" />
            <div class="grid">
              <Grid :border="false" padding="3px 0">
                <GridItem
                  v-for="(item, index) in tels"
                  :key="item.img"
                  class="cursor-pointer"
                  @click="dial(index)"
                >
                  <img :src="item.active" v-if="activeIndexs.indexOf(index) !== -1" height="41" />
                  <img :src="item.img" v-else height="41" />
                </GridItem>
              </Grid>
            </div>

            <WhiteSpace gutter="10" />
            <img
              src="@/assets/tel/go.png"
              width="145"
              class="cursor-pointer"
              style="float:right"
              @click="slideTo"
            />
            <img
              src="@/assets/tel/logo.png"
              width="160"
              class="cursor-pointer"
              style="margin-top:10px"
            />
          </Col>
          <Col span="4" offset="1" class="text-right">
            <WhiteSpace gutter="55" />
            <img src="@/assets/en/screen.png" width="124" class="screen" />
            <div class="clear cursor-pointer" @click="activeIndexs = []" />
            <div class="view">
              <img :src="tels[item].show" height="24" v-for="item in activeIndexs" :key="item" />
            </div>
          </Col>
          <Col span="9" offset="3">
            <img src="@/assets/en/tel_text2.png" width="350" />
          </Col>
        </Row>
      </div>
    </swiper-slide>

    <!-- heart -->
    <swiper-slide class="slide3">
      <div class="container">
        <img src="@/assets/en/heart.png" class="img-container" />
        <img
          src="@/assets/heart.png"
          width="104"
          class="heart cursor-pointer"
          :class="!popupVisible && 'heart-beat'"
          @click="changeHeartVisible(true)"
        />
      </div>
      <img src="@/assets/page/page_icon1.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- brain -->
    <swiper-slide class="slide4 flex-start">
      <div>
        <img src="@/assets/brain.gif" class="img-container" />
        <div class="brain">
          <img src="@/assets/en/brain.png" class="container" />
        </div>
        <div class="line" />
      </div>
      <img src="@/assets/page/page_icon2.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- pyramid -->
    <swiper-slide class="slide5">
      <div class="container">
        <img src="@/assets/en/brain_text.png" style="width: 100%;" />
        <img src="@/assets/brain_light.png" width="167" class="brain-light flush" />
        <img src="@/assets/brain.png" width="351" class="brain" />
      </div>
      <img src="@/assets/page/page_icon3.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- mp4 -->
    <swiper-slide class="slide6 flex-start">
      <div>
        <WhiteSpace gutter="80" />
        <img src="@/assets/en/gaming_music.png" height="14" />
        <WhiteSpace gutter="60" />
        <!-- <video autoplay muted loop class="video">
          <source src="@/assets/logo.mp4" type="video/mp4" />
        </video>-->
      </div>
      <img src="@/assets/page/page_icon4.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- games -->
    <swiper-slide class="slide7 flex-start">
      <div style="width: 100%;">
        <WhiteSpace gutter="60" />
        <img src="@/assets/en/games_text.png" width="660" />
        <WhiteSpace gutter="80" />
        <audio :src="musicUrl" :loop="false" hidden :autoplay="autoPlay" v-if="swiperIndex === 6" />
        <Row style="height: 390px">
          <Col span="4" class="text-right">
            <WhiteSpace gutter="40" />
            <div v-for="(item, index) in musicNames[lang]" :key="item.img" style="line-height: 1.4">
              <img
                :src="this.count === index + 1 ? item.active : item.img"
                :height="item.height"
                v-show="fileIndexs.indexOf(index) !== -1"
                class="cursor-pointer"
                @click="setMusicPlay(index)"
              />
            </div>
          </Col>
          <Col span="19" offset="1">
            <div class="games">
              <div v-for="(item, index) in gameMusics" :key="item.img">
                <img
                  :src="item.img"
                  :width="item.width"
                  :class="'img'+ (index + 1)"
                  :style="{'z-index': this.count === index + 1 ? '100' : '99'}"
                  v-if="fileIndexs.indexOf(index) !== -1"
                />
              </div>
            </div>
            <div class="files">
              <div v-for="item in files" :key="item">
                <img :src="item" width="55" class="cursor-pointer" @click="openFile" />
              </div>
            </div>
            {{count}}
          </Col>
        </Row>
      </div>
      <img src="@/assets/page/page_icon5.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- play games -->
    <swiper-slide class="slide8 flex-start">
      <div>
        <WhiteSpace gutter="80" />
        <img src="@/assets/en/games.png" height="14" />
        <video autoplay muted loop class="video">
          <source :src="gameBtns[lang][videoIndex].video" type="video/mp4" />
        </video>
        <img src="@/assets/game_machine.png" class="game-machine" />
        <img src="@/assets/en/click.png" width="143" class="click" />
        <div class="btn-container">
          <img
            src="@/assets/en/game1.png"
            v-for="(item, index) in gameBtns[lang]"
            :key="item.img"
            class="cursor-pointer"
            @click="videoIndex = index"
          />
        </div>
      </div>
      <img src="@/assets/page/page_icon6.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- poster -->
    <swiper-slide class="slide9">
      <div style="position:relative">
        <WhiteSpace gutter="40" />
        <img src="@/assets/en/poster_text1.png" height="14" />
        <WhiteSpace gutter="40" />
        <swiper
          class="nested-swiper poster-swiper"
          :modules="modules1"
          :navigation="true"
          :grabCursor="true"
          :effect="'coverflow'"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :coverflowEffect="{
            rotate: 0,
            scale: 0.5,
            depth: -180
          }"
          :loop="true"
          @slideChange="onPosterSlideChange"
        >
          <swiper-slide v-for="(item, index) in posters[lang]" :key="item.img">
            <div>
              <img :src="item.img" />
              <WhiteSpace gutter="15" />
              <!-- 文字说明 -->
              <img :src="item.text" v-show="posterIndex === index" v-if="item.text" />
            </div>
          </swiper-slide>
        </swiper>
        <div class="play cursor-pointer" @click="postChange">
          <img src="@/assets/poster/ear.png" width="54" />
          <img src="@/assets/poster/pause.png" width="12" class="btn" v-if="posterPlay" />
          <img src="@/assets/poster/play.png" width="12" class="btn" v-else />
          <audio
            :src="posterMusics[posterIndex]"
            :loop="false"
            :autoplay="posterPlay"
            v-if="swiperIndex === 8"
            ref="audio1"
            id="audio1"
          />
        </div>

        <WhiteSpace gutter="40" />
        <img src="@/assets/en/poster_text2.png" height="12" />
      </div>
      <img src="@/assets/page/page_icon7.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- record -->
    <swiper-slide class="slide10">
      <div>
        <WhiteSpace gutter="80" />
        <img src="@/assets/en/pop_music_text1.png" height="14" />
        <WhiteSpace gutter="80" />
        <swiper
          class="nested-swiper album-swiper"
          :effect="'coverflow'"
          :grabCursor="true"
          :navigation="true"
          :centeredSlides="true"
          :slidesPerView="'3'"
          :coverflowEffect="{
            rotate: 0,
            stretch: 0,
            scale: 0.6,
            depth: -200,
            modifier: 1,
            slideShadows: false,
          }"
          :modules="modules1"
          :loop="true"
          @slideChange="onAlbumSlideChange"
        >
          <swiper-slide v-for="(item, index) in albums[lang]" :key="item.img">
            <div>
              <img :src="item.img" :width="item.width" class="album" />
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
                v-if="item.right"
                :src="item.right"
                class="music-play"
                :class="albumIndex === index && recordPlay && 'rotate'"
              />
            </div>
          </swiper-slide>
        </swiper>

        <WhiteSpace gutter="15" />
        <!-- 文字说明 -->
        <img :src="albums[lang][albumIndex].text" class="text" />
        <WhiteSpace gutter="30" />
        <div class="play cursor-pointer" @click="recordChange">
          <img src="@/assets/album/ear.png" width="54" />
          <img src="@/assets/album/pause.png" width="12" class="btn" v-if="recordPlay" />
          <img src="@/assets/album/play.png" width="12" class="btn" v-else />
          <audio
            :src="albumMusics[albumIndex]"
            :loop="false"
            autoplay
            hidden
            v-if="swiperIndex === 9"
            id="audio2"
          />
        </div>
        <div class="progress">
          <div class="circle" :style="{left: progress}" />
          <div class="progress-bar" />
        </div>
        <WhiteSpace gutter="20" />
        <img src="@/assets/en/pop_music_text2.png" height="12" />
      </div>
      <img src="@/assets/page/page_icon8.png" width="101" class="page-anchor" />
    </swiper-slide>

    <!-- team -->
    <swiper-slide class="slide1 slide11 flex-start">
      <div>
        <div class="content">
          <WhiteSpace gutter="60" />
          <div class="container">
            <img src="@/assets/en/team.png" width="105" />
            <WhiteSpace gutter="50" />
            <Row>
              <Col span="11">
                <img src="@/assets/en/team_left.png" width="420" />
              </Col>

              <Col span="9" offset="4">
                <WhiteSpace gutter="10" />
                <div class="text-container">
                  <img src="@/assets/en/team_right.png" width="350" />

                  <template v-for="(item, index) in teamTexts[lang]" :key="item.img">
                    <div
                      class="text"
                      :class="'text' + index"
                      @mouseover="teamTextIndex = index + 1"
                    />

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
                        v-if="teamTextIndex === index + 1"
                        @mouseleave="teamTextIndex = -1"
                      >
                        <img :src="item.img" :width="item.width" />
                      </div>
                    </Transition>
                  </template>
                </div>
              </Col>
            </Row>
            <WhiteSpace gutter="120" />
          </div>
        </div>

        <WhiteSpace gutter="30" />
        <Row class="container">
          <Col span="6" offset="3">
            <img src="@/assets/logo.png" width="180" />
          </Col>
          <Col span="4" offset="1" class="text-left">
            <img src="@/assets/en/wechat.png" style="height: 12px" />
            <img src="@/assets/en/icp.png" style="height: 12px" />
          </Col>
          <Col span="4" offset="1">
            <a href="mailto: corcordium@tom.com" target="_blank">
              <img src="@/assets/en/email.png" style="height: 12px" />
            </a>
          </Col>
        </Row>
      </div>
      <img src="@/assets/page/page_icon9.png" width="101" class="page-anchor" />
    </swiper-slide>
  </swiper>

  <!-- heart popup -->
  <Transition
    name="heart"
    mode="out-in"
    enter-active-class="animate__animated animate__zoomInUp"
    leave-active-class="animate__animated animate__zoomOutDown"
  >
    <div
      class="heart-popup"
      v-if="popupVisible"
      @click="changeHeartVisible(false)"
      style="user-select: none;"
    >
      <img src="@/assets/en/heart_text.png" />
    </div>
  </Transition>
</template>

<script>
import WhiteSpace from "@/components/WhiteSpace";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Navigation, EffectCoverflow } from "swiper";
import uaParser from "ua-parser-js";

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
  props: ["lang"],
  setup() {
    return {
      onSwiper,
      modules: [Mousewheel],
      modules1: [Navigation, EffectCoverflow]
    };
  },
  data() {
    return {
      isMobile: false,
      popupVisible: false, // heart遮罩
      activeIndexs: [],
      swiperIndex: 0,
      count: 0,
      autoPlay: false,
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
        cn: require("@/assets/cn/logo_text.png")
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
      files: [
        require("@/assets/file/file1.png"),
        require("@/assets/file/file2.png"),
        require("@/assets/file/file3.png")
      ],
      musicNames: {
        en: [
          {
            img: require("@/assets/en/play_games/1.png"),
            active: require("@/assets/en/play_games/1_active.png"),
            height: 12
          },
          {
            img: require("@/assets/en/play_games/2.png"),
            active: require("@/assets/en/play_games/2_active.png"),
            height: 16
          },
          {
            img: require("@/assets/en/play_games/3.png"),
            active: require("@/assets/en/play_games/3_active.png"),
            height: 15
          },
          {
            img: require("@/assets/en/play_games/4.png"),
            active: require("@/assets/en/play_games/4_active.png"),
            height: 15
          },
          {
            img: require("@/assets/en/play_games/5.png"),
            active: require("@/assets/en/play_games/5_active.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/6.png"),
            active: require("@/assets/en/play_games/6_active.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/7.png"),
            active: require("@/assets/en/play_games/7_active.png"),
            height: 14
          },
          {
            img: require("@/assets/en/play_games/8.png"),
            active: require("@/assets/en/play_games/8_active.png"),
            height: 14
          },
          {
            img: require("@/assets/en/play_games/9.png"),
            active: require("@/assets/en/play_games/9_active.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/10.png"),
            active: require("@/assets/en/play_games/10_active.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/11.png"),
            active: require("@/assets/en/play_games/11_active.png"),
            height: 12
          },
          {
            img: require("@/assets/en/play_games/12.png"),
            active: require("@/assets/en/play_games/12_active.png"),
            height: 16
          },
          {
            img: require("@/assets/en/play_games/13.png"),
            active: require("@/assets/en/play_games/13_active.png"),
            height: 12
          },
          {
            img: require("@/assets/en/play_games/14.png"),
            active: require("@/assets/en/play_games/14_active.png"),
            height: 9
          },
          {
            img: require("@/assets/en/play_games/15.png"),
            active: require("@/assets/en/play_games/15_active.png"),
            height: 12
          }
        ]
      },
      gameMusics: [
        {
          img: require("@/assets/file/1.png"),
          music:
            "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
          width: 434
        },
        {
          img: require("@/assets/file/2.png"),
          music: "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
          width: 538
        },
        {
          img: require("@/assets/file/3.png"),
          music: require("@/assets/file/3.png"),
          width: 350
        },
        {
          img: require("@/assets/file/4.png"),
          music: require("@/assets/file/4.png"),
          width: 309
        },
        {
          img: require("@/assets/file/5.png"),
          music: require("@/assets/file/5.png"),
          width: 155
        },
        {
          img: require("@/assets/file/6.png"),
          music: require("@/assets/file/6.png"),
          width: 336.75
        },
        {
          img: require("@/assets/file/7.png"),
          music: require("@/assets/file/7.png"),
          width: 444
        },
        {
          img: require("@/assets/file/8.png"),
          music: require("@/assets/file/8.png"),
          width: 111.75
        },
        {
          img: require("@/assets/file/9.png"),
          music: require("@/assets/file/9.png"),
          width: 296.25
        },
        {
          img: require("@/assets/file/10.png"),
          music: require("@/assets/file/10.png"),
          width: 154.5
        },
        {
          img: require("@/assets/file/11.png"),
          music: require("@/assets/file/11.png"),
          width: 456
        },
        {
          img: require("@/assets/file/12.png"),
          music: require("@/assets/file/12.png"),
          width: 313.5
        },
        {
          img: require("@/assets/file/13.png"),
          music: require("@/assets/file/13.png"),
          width: 154.5
        },
        {
          img: require("@/assets/file/14.png"),
          music: require("@/assets/file/14.png"),
          width: 195
        },
        {
          img: require("@/assets/file/15.png"),
          music: require("@/assets/file/15.png"),
          width: 235.5
        }
      ],
      gameBtns: {
        en: [
          {
            img: require("@/assets/en/game1.png"),
            video: require("@/assets/logo.mp4")
          },
          {
            img: require("@/assets/en/game2.png"),
            video: require("@/assets/logo.mp4")
          },
          {
            img: require("@/assets/en/game3.png"),
            video: require("@/assets/logo.mp4")
          }
        ]
      },
      posters: {
        en: [
          {
            img: require("@/assets/poster/1.png"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/poster/1.png"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/poster/1.png"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/环形横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/俄狄浦斯横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/反抗者计划横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/尖塔横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/祖巫横版.jpg"),
            text: ""
          }
        ],
        cn: [
          {
            img: require("@/assets/cn/环形横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/俄狄浦斯横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/反抗者计划横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/尖塔横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/祖巫横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/童话故事横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/雪离岛横版.jpg"),
            text: ""
          },
          {
            img: require("@/assets/cn/雾角横版.jpg"),
            text: ""
          }
        ]
      },
      posterMusics: [
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3")
      ],
      albums: {
        en: [
          {
            img: require("@/assets/album/1.png"),
            right: require("@/assets/album/cd.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 307.5,
            type: "cd"
          },
          {
            img: require("@/assets/album/2.png"),
            right: require("@/assets/album/22.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 281.25,
            type: "record"
          },
          {
            img: require("@/assets/album/3.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 275.25
          },
          {
            img: require("@/assets/album/4.png"),
            right: require("@/assets/album/44.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 279,
            type: "record"
          },
          {
            img: require("@/assets/album/5.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 389.25,
            type: "tape"
          },
          {
            img: require("@/assets/album/6.png"),
            right: require("@/assets/album/record.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 275.25,
            type: "record"
          },
          {
            img: require("@/assets/album/7.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 304.5
          },
          {
            img: require("@/assets/album/8.png"),
            right: require("@/assets/album/88.png"),
            text: require("@/assets/en/pop_music_text3.png"),
            width: 286.5,
            type: "record"
          }
        ]
      },
      albumMusics: [
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3",
        require("@/assets/music/demo.mp3"),
        "http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"
      ],
      teamTexts: {
        en: [
          {
            img: require("@/assets/en/pop_team_text1.png"),
            width: 300
          },
          {
            img: require("@/assets/en/pop_team_text2.png"),
            width: 450
          },
          {
            img: require("@/assets/en/pop_team_text3.png"),
            width: 240
          },
          {
            img: require("@/assets/en/pop_team_text4.png"),
            width: 240
          }
        ]
      }
    };
  },
  created() {
    this.isMobile = new uaParser().getDevice().type === "mobile";
  },
  methods: {
    slideTo() {
      console.log(this.activeIndexs);
      const index = Number(this.activeIndexs.join("")) + 2;
      controlledSwiper.slideTo(index);
      // 切换至指定slide清空屏幕数字
      this.$nextTick(function(params) {
        this.activeIndexs = [];
      });
    },
    dial(index) {
      console.log(index);
      if (this.activeIndexs.length < 1) {
        this.activeIndexs.push(index === 9 ? 0 : index);
      }
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
    },
    setMusicPlay(index) {
      // 左侧菜单播放
      this.count = index + 1;
      this.musicPlay(index);
    },
    onSlideChange(swiper) {
      this.swiperIndex = swiper.realIndex;
      if (swiper.realIndex === 8) {
        this.posterPlay = true;
      }
      if (swiper.realIndex === 9) {
        this.recordPlay = true;
        this.changeProgress();
      }
    },
    onPosterSlideChange(swiper) {
      console.log(swiper.realIndex);
      this.posterIndex = swiper.realIndex === 8 ? 0 : swiper.realIndex;
    },
    onAlbumSlideChange(swiper) {
      console.log(swiper.realIndex);
      this.albumIndex = swiper.realIndex;
      if (swiper.realIndex !== 0) {
        console.log(111);
        this.recordPlay = true;
        this.progress = 0;

        this.changeProgress();
      }
    },
    changeProgress() {
      setTimeout(() => {
        const musicMp3 = document.getElementById("audio2");
        console.log(musicMp3);
        const timer = setInterval(() => {
          const numbers = musicMp3.currentTime / musicMp3.duration;
          let perNumber = (numbers * 100).toFixed(2);
          if (perNumber >= 100) {
            this.recordPlay = false;
            this.progress = 0;
            clearInterval(timer);
          }
          perNumber += "%";
          this.progress = perNumber;
        }, 30);
      }, 50);
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
    recordChange() {
      const audio2 = document.getElementById("audio2");
      if (this.recordPlay) {
        audio2.pause();
      } else {
        audio2.play();
        if ((this.progress = "100%")) {
          this.progress = 0;
          this.changeProgress();
        }
      }
      this.recordPlay = !this.recordPlay;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/content.scss";
</style>