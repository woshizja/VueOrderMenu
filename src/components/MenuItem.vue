<template>
    <div class="menu-wrap">
        <div class="menu-items" v-for="items in dishItems | filterBy filterData " v-bind:key="items.catalogID">
            <div class="menu-catalog">{{items.catalog}}</div>
            <div class="menu-item" v-for="item in items.dishs | filterBy filterData in 'dishDesc' 'dishName' 'searchKey' " v-bind:key="item.dishID">
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
                        <span v-el:desc>{{item.dishShortDesc?item.dishShortDesc:item.dishDesc}}</span>
                    </div>
                    <div class="info-sale">
                        <span class="dish-price">￥{{item.dishPrice}}</span>
                        <span class="dish-like">
                        <i></i> {{item.likeNum}}</span>
                    </div>
                </div>
                <div class="menu-operation">
                    <item-oper v-bind:dish-num.sync="item.dishNum" v-bind:dish-id="item.dishID" v-bind:catalog-id="items.catalogID"></item-oper>
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
import dishsData from '../data/dishs.js'

export default {
    props: ['filterData'],
    data: function() {
        return {
            dishItems: dishsData
        };
    },
    created: function() {
        this.dishItems.forEach(function(items) {
            items.dishs.forEach(function(item, index, items) {
                if (item.dishDesc.length > 30) {
                    items[index].dishShortDesc = item.dishDesc.slice(0, 30) + '...';
                }
            });
        });
    },
    methods: {
        openPicCard: function(imgSrcs) {
            this.$dispatch("openPicCard", imgSrcs);
            this.$dispatch('toggleScroll');
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
    /*background: #fff;*/
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
