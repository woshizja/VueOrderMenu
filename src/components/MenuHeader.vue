<template>
      <div ref="head" class="menu-header">
            <div v-bind:style="titleBg" class="header-title fixed">
                  <a class="header-menu" v-bind:style="menuPos" v-on:click="toggleMenu"></a>
                  <p ref="title" id="title" v-bind:style="titlePos">{{shopInfo.shopTitle}}</p>
                  <div class="search-wrap" v-bind:class="{show:isSearching}" v-on:click.stop="toggleSearch">
                        <input type="text" class="search-input" placeholder="搜索菜品" v-model="filterKeyComputed"></input>
                        <span class="search-icon" v-bind:class="icoStyle"></span>
                        <span class="search-cancel">取消</span>
                  </div>
            </div>
            <div class="header-address">地址：{{shopInfo.shopAddress}}</div>
            <div class="header-tel">电话：{{shopInfo.shopTel}}</div>
            <div class="header-describe">{{shopInfo.shopDesc}}</div>
      </div>
</template>
<script>
import eventHub from '../eventHub.js'

export default {
      props: ['shopInfo', 'isSearching', 'filterKey'],
      data: function() {
            return {
                  icoStyle: "search",
                  headHeight: 0,
                  moveWidth: 0,
                  titleBg: {
                        backgroundColor: 'rgba(255,255,255,0.3)'
                  },
                  titlePos: {
                        transform: 'translateX(0) scale(1)'
                  },
                  menuPos: {
                        transform: 'translateY(0)'
                  }
            };
      },
      computed: {
            filterKeyComputed: {
                  get: function() {
                        return this.filterKey;
                  },
                  set: function(val) {
                        eventHub.$emit('updata-filterkey', val);
                  }
            }
      },
      mounted: function() {
            this.headHeight = this.$refs.head.offsetHeight - 44;
            this.moveWidth = (window.innerWidth - this.$refs.title.offsetWidth * 1.2 - 15) / 2;
            var me = this;
            window.addEventListener("scroll", this.handleScroll);
      },
      methods: {
            handleScroll: function(e) {
                  var scrollHeight = document.body.scrollTop;
                  var p = scrollHeight / this.headHeight;
                  p = p > 1 ? 1 : p;
                  if (this.$route.path === '/') {
                        this.titleAnimation(p);
                  }
            },
            titleAnimation: function(p) {
                  window.requestAnimationFrame ? requestAnimationFrame(() => {
                        this.titleBg.backgroundColor = "rgba(255,255,255," + (0.3 + 0.63 * p) + ")";
                        this.titlePos.transform = "translateX(" + p * this.moveWidth + "px)" + " scale(" + (1 + 0.2 * p) + ")";
                        this.menuPos.transform = "translateY(" + p * 34 + "px)";
                  }) : null;
            },
            toggleMenu: function() {
                  eventHub.$emit('toggle-menu');
            },
            toggleSearch: function(e) {
                  if (e.target.tagName !== "INPUT") {
                        eventHub.$emit('toggle-tip');
                  }
            }
      }
}
</script>
<style scoped>
.menu-header {
      font-size: 12px;
      color: #666;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      line-height: 2;
      border-bottom: 1px solid #e1e1e1;
      padding: 44px 15px 0 15px;
      position: relative;
}

.menu-header:before {
      content: '';
      opacity: 0.3;
      filter: blur(5px);
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background: url(../img/titleBG.jpg) no-repeat #ccc;
      background-size: cover;
}

.header-title {
      flex-basis: content;
      width: 100%;
      height: 44px;
      line-height: 44px;
      color: #333;
      font-size: 14px;
      box-shadow: 0 0 2px 1px #b2b2b2;
      margin-left: -15px;
      overflow: hidden;
      transform-origin: center center;
}

.header-title .header-menu {
      text-decoration: none;
      position: absolute;
      width: 24px;
      height: 24px;
      top: -24px;
      left: 15px;
      background: url(../img/menu.png) center center no-repeat;
      background-size: 24px;
      transition: transform 0.6s ease;
      will-change: transform;
}

.header-title p {
      width: fit-content;
      width: -webkit-fit-content;
      max-width: 150px;
      margin: 0;
      padding-left: 15px;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-shadow: none;
      overflow: hidden;
      transition: transform 0.6s ease;
      will-change: transform;
}

.header-title.fixed {
      position: fixed;
      z-index: 100;
      top: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.3);
      will-change: background;
}

.header-title .search-wrap {
      position: absolute;
      top: 0;
      right: 0;
      width: 48px;
      height: 44px;
      margin: 0;
      background: transparent;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      overflow: hidden;
}

.header-title .search-wrap.show {
      transition: width 0.3s ease;
      width: 100%;
}

.search-wrap .search-input {
      border: none;
      height: 100%;
      display: none;
      flex-grow: 1;
      font-size: 14px;
      color: #333;
      padding-left: 10px;
}

.search-wrap .search-cancel {
      width: 48px;
      text-align: center;
      background: #f63;
      color: #fff;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      display: none;
      flex-grow: 0;
}

.search-wrap.show .search-input {
      display: inline-block;
}

.search-wrap.show .search-icon {
      display: none;
}

.search-wrap.show .search-cancel {
      display: inline-block;
}

.header-title .search-icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url("../img/icos.png") 10px no-repeat transparent;
      background-clip: content-box;
      background-origin: content-box;
      background-size: 300%;
      cursor: pointer;
      outline: none;
}

.header-title .search-icon.search {
      background-position: left;
}

.header-title .search-icon.empty {
      background-position: -37px;
}

.header-title .search-icon.report {
      background-position: -78px;
}
</style>
