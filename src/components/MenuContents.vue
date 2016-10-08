<template>
    <div class="catalogs" v-on:touchstart="handleStart" v-on:touchend="handleEnd">
        <div class="menu-contents">
            <div class="avatar">
                <img src="../img/avatar.jpg">
            </div>
            <div class="my-center">
                <a>个人中心</a>
            </div>
            <div class="tip">
                <span>本店菜单</span>
            </div>
            <ul class="catalog">
                <li v-for="catalog in catalogs" v-bind:class="{active:$index==activeCatalog}" v-on:click="updateCatalog($index)">
                    <span>{{catalog.catalog}}</span>
                    <span class="num" v-show="catalog.orderedDishs.length">{{catalog.orderedDishs.length}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import ContentsData from '../data/dishs.js'

export default {
    props: ['activeCatalog', 'toggleMenu'],
    data: function() {
        return {
            catalogs: ContentsData,
            touchStartPos: 0
        };
    },
    methods: {
        updateCatalog: function(index) {
            this.$dispatch("updateCatalog", index)
        },
        handleStart: function(e){
            this.touchStartPos = e.targetTouches[0].clientX;
        },
        handleEnd: function(e){
            if(this.touchStartPos - e.changedTouches[0].clientX>35){
                this.toggleMenu();
            }
            this.touchStartPos = 0;
        }
    }
}
</script>
<style scoped>
.catalogs {
    position: fixed;
    left: 0;
    top: 44px;
    bottom: 0;
    width: 38.2%;
    /*right: 0;*/
    z-index: 9999;
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    will-change: transform, opacity;
    transition: all 200ms ease;
    opacity: 0;
}

.catalogs.visible {
    transform: translateX(0);
    opacity: 1;
}
.catalogs .menu-contents {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 2px 0 8px 2px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    color: #333;
    padding: 10px 10px 0 10px;
    text-align: center;
    overflow-x: hidden;
    overflow-y: auto;
    font-weight: bold;
}

.menu-contents .avatar {
    width: 70px;
    height: 70px;
    margin: 0 auto;
}

.avatar img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
}

.menu-contents .my-center {
    color: #435664;
    line-height: 30px;
    background: #fafafa;
    cursor: pointer;
}

.menu-contents .tip {
    font-weight: normal;
    line-height: 30px;
    text-align: left;
    font-size: 12px;
    color: #666;
    background: #F0F0F0;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
}

.menu-contents .catalog {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
}

.catalog li {
    position: relative;
    line-height: 40px;
    border-bottom: 1px solid #e1e1e1;
}

.catalog li.active {
    background: rgba(225, 225, 225, 0.5);
}

.catalog li.active:before {
    content: "";
    width: 5px;
    height: 100%;
    background: #f63;
    display: inline-block;
    position: absolute;
    top: 0;
    left: -10px;
}

.catalog li .num {
    display: inline-block;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    font-weight: normal;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    background: #6CCA6A;
    margin-left: 10px;
}
</style>
