<template>
      <div v-bind:class="{showCart:totalNum}">
            <menu-header v-bind:shop-info="shopInfo" v-bind:is-searching="isSearching" v-bind:filter-key="filterKey"></menu-header>
            <transition name="searchtip">
                  <search-tip v-show="!filterKey&&isSearching" v-on:click-tip="clickTip" v-bind:tips-data="tipsData"></search-tip>
            </transition>
            <menu-contents v-bind:show-catalog="showCatalog" v-bind:active-catalog="activeIndex" v-bind:dishs-data="dishsData"></menu-contents>
            <menu-items v-bind:filter-data="filterKey" v-bind:dishs-data="dishsData"></menu-items>
            <transition name="piccard">
                  <pic-card v-bind:img-srcs="picCardSrcs" v-if="showPicCard&&picCardSrcs"></pic-card>
            </transition>
            <menu-cart v-bind:total-number="totalNum" v-bind:total-price="totalPri" v-show="totalNum"></menu-cart>
      </div>
</template>
<script>
import MenuHeader from './components/MenuHeader.vue'
import MenuContents from './components/MenuContents.vue'
import SearchTip from './components/SearchTip.vue'
import MenuItems from './components/MenuItems.vue'
import MenuCart from './components/MenuCart.vue'
import PicCard from './components/PicCard.vue'
import shopData from './data/shopData.js'
import eventHub from './eventHub.js'

export default {
      data: function() {
            return {
                  dishsData: shopData.dishsData,
                  shopInfo: shopData.shopInfo,
                  tipsData: shopData.tipsData,
                  orderData: shopData.orderData,
                  filterKey: '',
                  picCardSrcs: '',
                  showPicCard: false,
                  showCatalog: false,
                  isSearching: false,
                  activeIndex: 0,
                  catalogPos: [],
                  totalPri: 0
            };
      },
      components: {
            MenuHeader,
            SearchTip,
            MenuContents,
            MenuItems,
            MenuCart,
            PicCard
      },
      computed: {
            isCreated: function() {
                  return shopData.isCreated;
            },
            isMounted: function() {
                  return shopData.isMounted;
            },
            totalNum: function() {
                  var count = 0;
                  this.dishsData.forEach((dishs) => {
                        count += dishs.orderedDishs.length;
                  });
                  this.updatePrice();
                  return count;
            }
      },
      created: function() {
            if (!this.isCreated) {
                  shopData.isCreated = true;
                  eventHub.$on('open-imgcard', this.openPicCard);
                  eventHub.$on('close-imgcard', this.closePicCard);
                  eventHub.$on('toggle-scroll', this.toggleScroll);
                  eventHub.$on('toggle-menu', this.toggleMenu);
                  eventHub.$on('toggle-tip', this.toggleTip);
                  eventHub.$on('update-cindex', this.updateCatalog);
                  eventHub.$on('updata-filterkey', this.updataFilterkey);
                  eventHub.$on('add-dish', this.addDish);
                  eventHub.$on('minus-dish', this.minusDish);
            }
      },
      mounted: function() {
            if (!this.isMounted) {
                  shopData.isMounted = true;
                  this.initCatalogPos();
                  var me = this;
                  window.addEventListener("scroll", function(e) {
                        if (me.$route.path === '/') {
                              var st = document.body.scrollTop;
                              me.catalogPos.some(function(pos, index) {
                                    if (st < pos) {
                                          me.activeIndex = index - 1;
                                          return true;
                                    }
                              });
                        }
                  });
            }
      },
      methods: {
            updatePrice: function() {
                  var count = 0;
                  this.dishsData.forEach((dishs) => {
                        for (var key in dishs.orderedDishs) {
                              if (key !== "length") {
                                    count += dishs.orderedDishs[key].num * dishs.orderedDishs[key].dishPrice;
                              }
                        }
                  });
                  this.totalPri = count;
            },
            clickTip: function(val) {
                  this.filterKey = val;
            },
            closePicCard: function() {
                  this.picCardSrcs = '';
                  this.showPicCard = false;
            },
            toggleTip: function() {
                  this.isSearching = !this.isSearching;
                  this.filterKey = '';
            },
            toggleScroll: function() {
                  if (document.documentElement.classList.contains("lock")) {
                        document.documentElement.classList.remove("lock");
                  } else {
                        document.documentElement.classList.add("lock");
                  }
            },
            toggleMenu: function() {
                  this.showCatalog = !this.showCatalog;
            },
            openPicCard: function(srcs) {
                  // 验证
                  if (srcs.smallSrcs.length && srcs.smallSrcs.length === srcs.bigSrcs.length) {
                        this.picCardSrcs = srcs;
                        this.showPicCard = true;
                  }
            },
            updataFilterkey: function(val) {
                  this.filterKey = val;
            },
            updateCatalog: function(index) {
                  window.scrollTo(0, this.catalogPos[index]);
                  this.$nextTick(function() {
                        this.activeIndex = index;
                  });
            },
            addDish: function(did, cid) {
                  var dishInfo = this.searchDish(did, cid);
                  if (dishInfo.length === 3) {
                        if (this.dishsData[dishInfo[0]].orderedDishs.length === undefined) {
                              this.dishsData[dishInfo[0]].orderedDishs.length = 0;
                        }
                        this.dishsData[dishInfo[0]].orderedDishs.length++;

                        if (this.dishsData[dishInfo[0]].orderedDishs[did] === undefined) {
                              this.dishsData[dishInfo[0]].orderedDishs[did] = {};
                              this.dishsData[dishInfo[0]].orderedDishs[did].num = 0;
                              this.dishsData[dishInfo[0]].orderedDishs[did].dishIndex = dishInfo[1];
                              this.dishsData[dishInfo[0]].orderedDishs[did].dishPrice = dishInfo[2];
                        }
                        this.dishsData[dishInfo[0]].orderedDishs[did].num++;
                        this.dishsData[dishInfo[0]].dishs[dishInfo[1]].dishNum++;
                  }
            },
            minusDish: function(did, cid) {
                  var dishInfo = this.searchDish(did, cid);
                  if (dishInfo.length === 3) {
                        if (this.dishsData[dishInfo[0]].orderedDishs[did]) {
                              this.dishsData[dishInfo[0]].orderedDishs[did].num--;
                              this.dishsData[dishInfo[0]].orderedDishs.length--;
                        } else {
                              console.log("something wrong when minus dish")
                        }
                        if (this.dishsData[dishInfo[0]].orderedDishs[did].num <= 0) {
                              delete this.dishsData[dishInfo[0]].orderedDishs[did];
                        }
                        this.dishsData[dishInfo[0]].dishs[dishInfo[1]].dishNum--;
                  }
            },
            initCatalogPos: function() {
                  var eles = document.querySelectorAll(".menu-catalog");
                  for (var i = 0; i < eles.length; i++) {
                        this.catalogPos.push(eles[i].offsetTop - 44);
                  }
            },
            searchDish: function(did, cid) {
                  var len = this.dishsData.length;
                  var res = [];
                  for (var i = 0; i < len; i++) {
                        if (this.dishsData[i].catalogID == cid) {
                              res.push(i);
                              break;
                        }
                  }
                  if (i < len) {
                        len = this.dishsData[i].dishs.length;
                        for (var j = 0; j < len; j++) {
                              if (this.dishsData[i].dishs[j].dishID == did) {
                                    res.push(j);
                                    res.push(this.dishsData[i].dishs[j].dishPrice);
                                    break;
                              }
                        }
                        return res;
                  }
            }
      }
}
</script>
<style>
.test-enter-active,
.test-leave-active {
      transition: all .5s ease;
      transform-origin:50% 0%;
}

.test-enter-active {
       opacity: 0;
}
.test-leave-active {
      opacity: 0;
      transform: scale(0.3);
}

body {
      font-family: "PingFang SC", "Hiragino Sans GB", "Helvetica Neue", Roboto, Noto, sans-serif;
      font-size: 12px;
      -webkit-font-smoothing: antialiased;
      text-justify: 100%;
}

* {
      margin: 0;
      padding: 0;
      outline: 0;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      text-decoration: none;
}

html.lock {
      overflow: hidden;
      touch-action: none;
}

.lock body {
      overflow: hidden;
      touch-action: none;
}

#app {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
}

#app .showCart .menu-wrap {
      padding-bottom: 54px;
}

.piccard-enter-active,
.piccard-leave-active {
      transition: all 0.3s ease;
      will-change: transform, opacity;
      transform: scale(1);
      opacity: 1;
}

.piccard-leave-active,
.piccard-enter {
      transform: scale(0.8);
      opacity: 0;
}

.searchtip-enter-active,
.searchtip-leave-active {
      transition: opacity 0.5s ease;
      will-change: opacity;
}

.searchtip-enter,
.searchtip-leave-active {
      opacity: 0;
}
</style>
