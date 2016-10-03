<template>
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
            <li v-for="catalog in catalogs" v-bind:class="{active:$index==activeCatalog}" v-on:click="updateCatalog($index)">{{catalog.name}}</li>
        </ul>
    </div>
</template>
<script>
import ContentsData from '../data/catalog.js'

export default {
    props: ['activeCatalog'],
    data: function() {
        return {
            catalogs: ContentsData
        };
    },
    methods: {
        updateCatalog: function(index){
            this.$dispatch("updateCatalog", index)
        }
    }
}
</script>
<style scoped>
.menu-contents {
    color: #444;
    font-size: 14px;
    font-weight: bold;
}

.menu-contents .avatar {
    width: 70px;
    height: 70px;
    display: inline-block;
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
    background: rgba(225,225,225,0.5);
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
</style>
