<template>
    <div class="search-tips">
        <div class="search-tip" v-for="tip in tips" v-on:click="handleClick(tip.name)">
            <span v-bind:class="tip.tag">{{tip.name}}</span>
        </div>
    </div>
</template>
<script>
import Tips from '../data/tips.js'

export default {
    data: function(){
        return {
            tips: Tips
        };
    },
    methods: {
        handleClick: function(tip){
            this.$emit('click-tip', tip);
        }
    }
}
</script>
<style scoped>
.search-tips {
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    min-height: 120px;
    background: rgba(248,248,248,0.9);
    z-index: 100;
    font-size: 12px;
    color: #333;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding: 10px 40px;
    box-sizing: border-box;
}
.search-tips .search-tip {
    height: 22px;
    line-height: 20px;
    border-radius: 3px;
    border: 1px solid #888;
    color: #1CAF9A;
    padding: 0 4px;
    text-align: center;
    margin: 8px 15px 8px 15px;
    box-sizing: border-box;
}
.search-tips .search-tip span.hot{
    color: #f63;
}
</style>
