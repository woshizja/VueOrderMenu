<template>
      <div class="menu-wrap">
            <div class="menu-items" v-for="items in catalogFilter" v-bind:key="items.catalogID">
                  <div class="menu-catalog">{{items.catalog}}</div>
                  <div class="menu-item" v-for="item in dishFilter(items.dishs)" v-bind:key="item.dishID">
                        <div class="menu-img">
                              <img v-bind:src="item.imgSrc" v-on:click.stop="openPicCard(item.imgSrcs)">
                        </div>
                        <div class="menu-info">
                              <div class="info-title">
                                    <span>{{item.dishName}}</span>
                                    <tag-combo v-if="item.isCombo"></tag-combo>
                                    <tag-promotion v-if="item.isPromotion"></tag-promotion>
                              </div>
                              <div class="info-desc">
                                    <span>{{item.dishShortDesc?item.dishShortDesc:item.dishDesc}}</span>
                              </div>
                              <div class="info-sale">
                                    <span class="dish-price">￥{{item.dishPrice}}</span>
                                    <span class="dish-like">
                        <i></i> {{item.likeNum}}</span>
                              </div>
                        </div>
                        <div class="menu-operation">
                              <item-oper v-bind:dish-num="item.dishNum" v-bind:dish-id="item.dishID" v-bind:catalog-id="items.catalogID" inside-menu="true"></item-oper>
                        </div>
                  </div>
            </div>
      </div>
</template>
<script>
import ItemOper from './ItemOper.vue'
import {
      TagCombo,
      TagPromotion
} from './DishTag.vue'
import eventHub from '../eventHub.js'

export default {
      props: ['filterData', 'dishsData'],
      computed: {
            catalogFilter: function() {
                  if (!this.filterData) {
                        return this.dishsData;
                  } else {
                        var key = this.filterData;
                        return this.dishsData.filter((item) => {
                              var flag = item.dishs.some((dish) => {
                                    if (dish.dishName.indexOf(key) > -1 || dish.dishDesc.indexOf(key) > -1 || dish.searchKey.indexOf(key) > -1) {
                                          return true;
                                    }
                              });
                              return flag;
                        });
                  }
            }
      },
      created: function() {
            this.dishsData.forEach(function(items) {
                  items.dishs.forEach(function(item, index, items) {
                        if (item.dishDesc.length > 30) {
                              items[index].dishShortDesc = item.dishDesc.slice(0, 30) + '...';
                        }
                  });
            });
      },
      methods: {
            openPicCard: function(imgSrcs) {
                  eventHub.$emit("open-imgcard", imgSrcs);
                  eventHub.$emit('toggle-scroll');
            },
            dishFilter: function(dishs) {
                  var key = this.filterData;
                  return dishs.filter((dish) => {
                        if (dish.dishName.indexOf(key) > -1 || dish.dishDesc.indexOf(key) > -1 || dish.searchKey.indexOf(key) > -1) {
                              return true;
                        }
                        return false;
                  });
            }
      },
      components: {
            ItemOper,
            TagCombo,
            TagPromotion
      }
}
</script>
<style scoped>
.menu-wrap {
      font-size: 12px;
      color: #333;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      background: #fff;
      width: 100%;
      margin: 0;
}

.menu-wrap .menu-items {
      width: 100%;
}

.menu-items .menu-catalog {
      width: 100%;
      color: #435664;
      line-height: 30px;
      background: #F0F0F0;
      cursor: pointer;
      padding-left: 10px;
      box-sizing: border-box;
}

.menu-wrap .menu-item {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      line-height: 2;
      padding: 10px;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
}

.menu-item .menu-img {
      width: 66px;
      height: 66px;
      flex-grow: 0;
      flex-shrink: 0;
}

.menu-img img {
      width: 66px;
      height: 66px;
      border-radius: 50%;
}

.menu-item .menu-info {
      height: 66px;
      margin-left: 10px;
      line-height: normal;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      flex-grow: 1;
}

.menu-info .info-title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      flex-grow: 1;
}

.menu-info .info-desc {
      color: #666;
      flex-grow: 1;
}

.menu-info .info-sale {
      flex-grow: 1;
}

.info-sale .dish-price {
      font-size: 14px;
      color: #f63;
}

.info-sale .dish-like {
      margin-left: 15px;
      color: #666;
}

.dish-like i {
      background: url(../img/like.png) no-repeat;
      background-size: 12px 12px;
      display: inline-block;
      box-sizing: border-box;
      width: 12px;
      height: 12px;
      transform: translateY(1px);
}

.menu-item .menu-operation {
      position: absolute;
      right: 10px;
      bottom: 5px;
      flex-grow: 0;
      background: transparent;
      z-index: 10;
}
</style>
