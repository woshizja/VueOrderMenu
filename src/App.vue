<template>
    <div id="app" v-bind:class="{showCart:totalNum}">
        <menu-header v-bind:active-index="activeIndex"></menu-header>
        <menu-item v-bind:filter-data="filterKey"></menu-item>
        <menu-cart v-bind:total-number="totalNum" v-show="totalNum"></menu-cart>
        <pic-card v-bind:img-srcs="picCardSrcs" v-if="showPicCard&&picCardSrcs" transition="piccard"></pic-card>
    </div>
</template>
<script>
import MenuHeader from './components/MenuHeader'
import MenuItem from './components/MenuItem.vue'
import MenuCart from './components/MenuCart.vue'
import PicCard from './components/PicCard.vue'

export default {
    data: function() {
        return {
            filterKey: '',
            totalNum: 0,
            lockScroll: false,
            picCardSrcs: '',
            showPicCard: false,
            activeIndex: 0,
            catalogPos: []
        };
    },
    components: {
        MenuHeader,
        MenuItem,
        MenuCart,
        PicCard
    },
    ready: function() {
        this.initCatalogPos();
        var me = this;
        window.addEventListener("scroll", function(e) {
            var st = document.body.scrollTop;
            var len = me.catalogPos.length;
            for (var i = 0; i < len; i++) {
                if (st < me.catalogPos[i]) {
                    me.activeIndex = i - 1;
                    break;
                }
            }
        });
    },
    methods: {
        initCatalogPos: function() {
            var eles = document.querySelectorAll(".menu-catalog");
            for (var i = 0; i < eles.length; i++) {
                this.catalogPos.push(eles[i].offsetTop - 44);
            }
        }
    },
    events: {
        updateCatalog: function(index) {
            window.scrollTo(0, this.catalogPos[index]);
            this.$nextTick(function() {
                this.activeIndex = index;
            });
        },
        updataFilterkey: function(val) {
            this.filterKey = val;
        },
        addCart: function() {
            this.totalNum++;
        },
        minusCart: function() {
            this.totalNum--;
        },
        toggleScroll: function() {
            if (document.documentElement.classList.contains("lock")) {
                document.documentElement.classList.remove("lock");
            } else {
                document.documentElement.classList.add("lock");
            }
        },
        openPicCard: function(srcs) {
            // 验证
            if (srcs.smallSrcs.length && srcs.smallSrcs.length === srcs.bigSrcs.length) {
                this.picCardSrcs = srcs;
                this.showPicCard = true;
            }
        },
        closePicCard: function() {
            this.picCardSrcs = '';
            this.showPicCard = false;
        }
    }
}
</script>
<style>
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

#app.showCart .menu-wrap {
    padding-bottom: 54px;
}

.piccard-transition {
    transition: all 0.3s ease;
    will-change: transform, opacity;
    transform: scale(1);
    opacity: 1;
}

.piccard-leave,
.piccard-enter {
    transform: scale(0.8);
    opacity: 0;
}
</style>
