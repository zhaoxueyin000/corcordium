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
          <video autoplay muted loop preload="auto" class="video">
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
        <div class="container1">
          <Row>
            <Col span="4" offset="3" class="text-center">
              <img :src="telTexts[lang].title" :height="lang==='en' ? 39 : 30" />
              <div class="tels">
                <div class="grid">
                  <Grid :border="false" padding="3px 17px">
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
              </div>

              <WhiteSpace gutter="10" />
              <img
                :src="goActive ? require('@/assets/tel/gogo.png') : require('@/assets/tel/go.png')"
                width="142"
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
            <Col span="4" offset="1">
              <WhiteSpace gutter="55" />
              <img :src="telTexts[lang].screen" width="124" />
              <div class="clear cursor-pointer" @click="activeIndexs = []" />
              <div class="view">
                <img :src="tels[item].show" height="24" v-for="item in activeIndexs" :key="item" />
              </div>
            </Col>
            <Col span="9" offset="1">
              <img :src="telTexts[lang].text" height="462" />
            </Col>
          </Row>
        </div>
      </swiper-slide>

      <!-- heart -->
      <swiper-slide class="slide3">
        <div class="container">
          <img :src="heartTexts[lang].heart" class="img-fill" />
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
          <img src="@/assets/brain.gif" class="img-fill" />
          <div class="brain">
            <img :src="brainTexts[lang]" class="container" />
          </div>
          <div class="line" />
        </div>
        <img src="@/assets/page/page_icon2.png" width="101" class="page-anchor" />
      </swiper-slide>

      <!-- pyramid -->
      <swiper-slide class="slide5">
        <div class="container">
          <img :src="pyramidTexts[lang]" style="width: 100%;" />
          <img src="@/assets/brain_light.png" width="167" class="brain-light flush" />
          <img src="@/assets/brain.png" width="351" class="brain" />
        </div>
        <img src="@/assets/page/page_icon3.png" width="101" class="page-anchor" />
      </swiper-slide>

      <!-- mp4 -->
      <swiper-slide class="slide6 flex-start">
        <div>
          <WhiteSpace gutter="80" />
          <img src="@/assets/cn/gaming_music.png" height="20" v-if="lang==='cn'" />
          <img src="@/assets/jp/gaming_music.png" height="20" v-else-if="lang==='jp'" />
          <img src="@/assets/en/gaming_music.png" height="14" v-else />
          <WhiteSpace gutter="60" />
          <!-- <video autoplay muted loop preload="auto" class="video">
        <source src="@/assets/logo.mp4" type="video/mp4" />
          </video>-->
        </div>
        <img src="@/assets/page/page_icon4.png" width="101" class="page-anchor" />
      </swiper-slide>

      <!-- games -->
      <swiper-slide class="slide7 flex-start cursor-custom-arrow">
        <div style="width: 100%;">
          <WhiteSpace gutter="60" />
          <img src="@/assets/cn/games_text.png" width="515" v-if="lang==='cn'" />
          <img src="@/assets/jp/games_text.png" width="515" v-else-if="lang==='jp'" />
          <img src="@/assets/en/games_text.png" width="660" v-else />
          <WhiteSpace gutter="80" />
          <audio
            :src="musicUrl"
            :loop="false"
            hidden
            :autoplay="autoPlay"
            v-if="swiperIndex === 6"
          />
          <Row style="height: 390px">
            <Col span="4" class="text-right">
              <WhiteSpace gutter="40" />
              <div
                v-for="(item, index) in musicNames[lang]"
                :key="item.img"
                style="line-height: 1.4"
              >
                <img
                  :src="this.count === index + 1 ? item.active : item.img"
                  :height="item.height"
                  v-show="fileIndexs.indexOf(index) !== -1"
                  class="cursor-custom-arrow"
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
                    class="cursor-custom-finger"
                    :class="'img'+ (index + 1)"
                    :style="{'z-index': this.count === index + 1 ? '100' : '99'}"
                    v-if="fileIndexs.indexOf(index) !== -1"
                    @click="setMusicPlay(index)"
                  />
                  <img
                    src="@/assets/file/modal.png"
                    width="82"
                    class="cursor-custom-finger img16"
                    v-if="fileIndexs.indexOf(14) !== -1"
                  />
                </div>
              </div>
              <div class="files cursor-custom-finger">
                <div v-for="item in files" :key="item">
                  <img :src="item" width="55" class @click="openFile" />
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
          <img src="@/assets/cn/games.png" height="20" v-if="lang === 'cn'" />
          <img src="@/assets/jp/games.png" height="20" v-else-if="lang === 'jp'" />
          <img src="@/assets/en/games.png" height="14" v-else />

          <video autoplay muted loop preload="auto" class="video">
            <source :src="videos[videoIndex]" type="video/mp4" />
          </video>
          <img src="@/assets/game_machine.png" class="game-machine" />

          <img src="@/assets/cn/click.png" height="20" class="click" v-if="lang === 'cn'" />
          <img
            src="@/assets/jp/click.png"
            height="20"
            class="click"
            style="margin-left: -118px;"
            v-else-if="lang === 'jp'"
          />
          <img src="@/assets/en/click.png" width="143" class="click" v-else />

          <div class="btn-container">
            <img
              :src="item"
              v-for="(item, index) in gamingBtns[lang]"
              :key="item"
              class="cursor-pointer glow shake-opacity"
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

          <img src="@/assets/cn/poster_text1.png" height="20" v-if="lang === 'cn'" />
          <img src="@/assets/jp/poster_text1.png" height="20" v-else-if="lang === 'jp'" />
          <img src="@/assets/en/poster_text1.png" height="14" v-else />

          <WhiteSpace gutter="40" />
          <swiper
            class="nested-swiper poster-swiper"
            :modules="modules1"
            :effect="'fade'"
            :speed="400"
            :navigation="true"
            :grabCursor="true"
            :centeredSlides="true"
            :slidesPerView="'auto'"
            :loop="true"
            @slideChange="onPosterSlideChange"
          >
            <swiper-slide v-for="(item, index) in posters[lang]" :key="item.img">
              <div>
                <img :src="item.img" class="poster" />
                <WhiteSpace gutter="15" />
                <!-- 文字说明 -->
                <img
                  :src="item.text"
                  v-show="posterIndex === index"
                  v-if="item.text"
                  :style="{width: lang === 'en' ? '98%' : '70%'}"
                />
                <Transition
                  name="ear"
                  mode="out-in"
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut"
                >
                  <div
                    class="play cursor-pointer"
                    @click="postChange"
                    v-show="posterIndex === index"
                  >
                    <img src="@/assets/album/ear.png" class="ear" />
                    <img src="@/assets/album/pause.png" class="btn" v-if="posterPlay" />
                    <img src="@/assets/album/play.png" class="btn" v-else />
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

          <WhiteSpace gutter="30" />

          <img src="@/assets/cn/poster_text2.png" height="14" v-if="lang === 'cn'" />
          <img src="@/assets/jp/poster_text2.png" height="14" v-else-if="lang === 'jp'" />
          <img src="@/assets/en/poster_text2.png" height="12" v-else />
        </div>
        <img src="@/assets/page/page_icon7.png" width="101" class="page-anchor" />
      </swiper-slide>

      <!-- record -->
      <swiper-slide class="slide10">
        <div>
          <WhiteSpace gutter="80" />

          <img src="@/assets/cn/pop_music_text1.png" height="20" v-if="lang === 'cn'" />
          <img src="@/assets/jp/pop_music_text1.png" height="20" v-else-if="lang === 'jp'" />
          <img src="@/assets/en/pop_music_text1.png" height="14" v-else />

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
          scale: 0.5,
          depth: -200,
          modifier: 1,
          slideShadows: false,
        }"
            :modules="modules1"
            :loop="true"
            @slideChange="onAlbumSlideChange"
          >
            <swiper-slide v-for="(item, index) in albums" :key="item.img" :class="item.type">
              <img :src="item.img" :width="item.width" class="album" :class="'album' + index" />
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
                  <img src="@/assets/album/ear.png" width="62" class="ear" />
                  <img src="@/assets/album/pause.png" width="13" class="btn" v-if="recordPlay" />
                  <img src="@/assets/album/play.png" width="13" class="btn" v-else />
                </div>
              </Transition>
            </swiper-slide>
          </swiper>

          <WhiteSpace gutter="30" />
          <!-- 文字说明 -->
          <img :src="albumsTexts[lang][albumIndex]" :width="lang==='cn' ? 410 : 600" />
          <WhiteSpace gutter="20" />

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
            <div
              class="progress-bar"
              :style="{width: (100 - progress) + '%',left: progress + '%'}"
            />
          </div>
          <WhiteSpace gutter="15" />

          <img src="@/assets/cn/pop_music_text2.png" height="14" v-if="lang==='cn'" />
          <img src="@/assets/jp/pop_music_text2.png" height="14" v-else-if="lang==='jp'" />
          <img src="@/assets/en/pop_music_text2.png" height="12" v-else />
        </div>
        <img src="@/assets/page/page_icon8.png" width="101" class="page-anchor" />
      </swiper-slide>

      <!-- team -->
      <swiper-slide class="slide1 slide11 flex-start">
        <div>
          <div class="content">
            <WhiteSpace gutter="60" />
            <div class="container" style="width: 945px">
              <img :src="teamTexts[lang].team" height="25" />
              <WhiteSpace gutter="50" />
              <Row>
                <Col span="10">
                  <img :src="teamTexts[lang].left" height="321" />
                </Col>

                <Col span="9" offset="4" class="text-right">
                  <WhiteSpace gutter="10" />
                  <div class="text-container">
                    <img :src="teamTexts[lang].right" height="320" />

                    <template v-for="(item, index) in teamPopTexts[lang]" :key="item">
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
                          <img :src="item" height="67" />
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
              <img :src="teamTexts[lang].wechat" height="12" />
              <img src="@/assets/en/icp.png" height="12" />
            </Col>
            <Col span="4" offset="1">
              <a href="mailto: corcordium@tom.com" target="_blank">
                <img :src="teamTexts[lang].email" height="12" />
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
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="heart-popup"
        v-if="popupVisible"
        @click="changeHeartVisible(false)"
        style="user-select: none;"
      >
        <img :src="heartTexts[lang].img" :width="heartTexts[lang].width" />
      </div>
    </Transition>
</template>

<script>
import WhiteSpace from "@/components/WhiteSpace";
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
      timer: 0,
      popupVisible: false, // heart遮罩
      activeIndexs: [],
      goActive: false,
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
        cn: require("@/assets/cn/logo_text.png"),
        jp: require("@/assets/jp/logo_text.png")
      },
      telTexts: {
        en: {
          title: require("@/assets/en/tel_text1.png"),
          screen: require("@/assets/en/screen.png"),
          text: require("@/assets/en/tel_text2.png")
        },
        cn: {
          title: require("@/assets/cn/tel_text1.png"),
          screen: require("@/assets/cn/screen.png"),
          text: require("@/assets/cn/tel_text2.png")
        },
        jp: {
          title: require("@/assets/jp/tel_text1.png"),
          screen: require("@/assets/jp/screen.png"),
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
          width: 867
        },
        cn: {
          heart: require("@/assets/cn/heart.png"),
          img: require("@/assets/cn/heart_text.png"),
          width: 500
        },
        jp: {
          heart: require("@/assets/jp/heart.png"),
          img: require("@/assets/jp/heart_text.png"),
          width: 500
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
      files: [
        require("@/assets/file/file1.png"),
        require("@/assets/file/file2.png"),
        require("@/assets/file/file3.png")
      ],
      musicNames: {
        en: [
          {
            img: require("@/assets/en/play_games/1.png"),
            active: require("@/assets/en/play_games/1B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/2.png"),
            active: require("@/assets/en/play_games/2B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/3.png"),
            active: require("@/assets/en/play_games/3B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/4.png"),
            active: require("@/assets/en/play_games/4B.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/5.png"),
            active: require("@/assets/en/play_games/5B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/6.png"),
            active: require("@/assets/en/play_games/6B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/7.png"),
            active: require("@/assets/en/play_games/7B.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/8.png"),
            active: require("@/assets/en/play_games/8B.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/9.png"),
            active: require("@/assets/en/play_games/9B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/10.png"),
            active: require("@/assets/en/play_games/10B.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/11.png"),
            active: require("@/assets/en/play_games/11B.png"),
            height: 13
          },
          {
            img: require("@/assets/en/play_games/12.png"),
            active: require("@/assets/en/play_games/12B.png"),
            height: 12
          },
          {
            img: require("@/assets/en/play_games/13.png"),
            active: require("@/assets/en/play_games/13B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/14.png"),
            active: require("@/assets/en/play_games/14B.png"),
            height: 11
          },
          {
            img: require("@/assets/en/play_games/15.png"),
            active: require("@/assets/en/play_games/15B.png"),
            height: 11
          }
        ],
        cn: [
          {
            img: require("@/assets/cn/play_games/1.png"),
            active: require("@/assets/cn/play_games/11_.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/2.png"),
            active: require("@/assets/cn/play_games/22.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/3.png"),
            active: require("@/assets/cn/play_games/33.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/4.png"),
            active: require("@/assets/cn/play_games/44.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/5.png"),
            active: require("@/assets/cn/play_games/55.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/6.png"),
            active: require("@/assets/cn/play_games/66.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/7.png"),
            active: require("@/assets/cn/play_games/77.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/8.png"),
            active: require("@/assets/cn/play_games/88.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/9.png"),
            active: require("@/assets/cn/play_games/99.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/10.png"),
            active: require("@/assets/cn/play_games/1010.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/11.png"),
            active: require("@/assets/cn/play_games/1111.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/12.png"),
            active: require("@/assets/cn/play_games/1212.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/13.png"),
            active: require("@/assets/cn/play_games/1313.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/14.png"),
            active: require("@/assets/cn/play_games/1414.png"),
            height: 13
          },
          {
            img: require("@/assets/cn/play_games/15.png"),
            active: require("@/assets/cn/play_games/1515.png"),
            height: 13
          }
        ],
        jp: [
          {
            img: require("@/assets/jp/play_games/1.png"),
            active: require("@/assets/jp/play_games/1A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/2.png"),
            active: require("@/assets/jp/play_games/2A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/3.png"),
            active: require("@/assets/jp/play_games/3A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/4.png"),
            active: require("@/assets/jp/play_games/4A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/5.png"),
            active: require("@/assets/jp/play_games/5A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/6.png"),
            active: require("@/assets/jp/play_games/6A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/7.png"),
            active: require("@/assets/jp/play_games/7A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/8.png"),
            active: require("@/assets/jp/play_games/8A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/9.png"),
            active: require("@/assets/jp/play_games/9A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/10.png"),
            active: require("@/assets/jp/play_games/10A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/11.png"),
            active: require("@/assets/jp/play_games/11A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/12.png"),
            active: require("@/assets/jp/play_games/12A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/13.png"),
            active: require("@/assets/jp/play_games/13A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/14.png"),
            active: require("@/assets/jp/play_games/14A.png"),
            height: 13
          },
          {
            img: require("@/assets/jp/play_games/15.png"),
            active: require("@/assets/jp/play_games/15A.png"),
            height: 13
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
      videos: [
        require("@/assets/logo.mp4"),
        require("@/assets/logo.mp4"),
        require("@/assets/logo.mp4")
      ],
      posters: {
        en: [
          {
            img: require("@/assets/cn/poster/edps.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/wj.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/zw.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/llg.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/fkzjh.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/jt.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/wsqs.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },

          {
            img: require("@/assets/en/poster/hx.jpg"),
            text: require("@/assets/en/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/xld.jpg"),
            text: require("@/assets/en/poster_text3.png")
          }
        ],
        cn: [
          {
            img: require("@/assets/cn/poster/edps.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/wj.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/zw.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/llg.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/fkzjh.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/jt.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/wsqs.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },

          {
            img: require("@/assets/cn/poster/hx.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/xld.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          }
        ],
        jp: [
          {
            img: require("@/assets/cn/poster/edps.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/wj.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/zw.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/llg.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/fkzjh.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/jt.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/wsqs.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },

          {
            img: require("@/assets/cn/poster/hx.jpg"),
            text: require("@/assets/cn/poster_text3.png")
          },
          {
            img: require("@/assets/cn/poster/xld.jpg"),
            text: require("@/assets/cn/poster_text3.png")
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
      albums: [
        {
          img: require("@/assets/album/1.png"),
          right: require("@/assets/album/cd.png"),
          width: 396,
          type: "cd"
        },
        {
          img: require("@/assets/album/2.png"),
          right: require("@/assets/album/22.png"),
          width: 366,
          type: "record"
        },
        {
          img: require("@/assets/album/3.png"),
          width: 356
        },
        {
          img: require("@/assets/album/4.png"),
          right: require("@/assets/album/44.png"),
          width: 356,
          type: "record"
        },
        {
          img: require("@/assets/album/5.png"),
          width: 501,
          type: "tape"
        },
        {
          img: require("@/assets/album/6.png"),
          right: require("@/assets/album/record.png"),
          width: 360,
          type: "record"
        },
        {
          img: require("@/assets/album/7.png"),
          width: 399
        },
        {
          img: require("@/assets/album/8.png"),
          right: require("@/assets/album/88.png"),
          width: 370,
          type: "record"
        }
      ],
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
        // 切换至指定slide清空屏幕数字
        this.$nextTick(function(params) {
          this.activeIndexs = [];
        });
      }
      setTimeout(() => {
        this.goActive = false;
      }, 100);
    },
    dial(index) {
      // 当前只有9页，默认清空前一次数字
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
@import "@/assets/style/content.scss";
</style>