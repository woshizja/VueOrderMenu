<style scoped>
.wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    z-index: 101;
}

.wrap .card-layer {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}

.wrap .card-wrap {
    width: 77.5vmin;
    height: 100vmin;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow: hidden;
}

.pic-wrap {
    overflow: hidden;
    white-space: nowrap;
}

.pic-wrap img {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: all 0.3s ease;
    will-change: margin;
}

.pic-wrap img.blur {
    /*filter: blur(2px);*/
    filter: grayscale(100%);
}

.card-desc .title {
    margin-left: 15px;
    font-size: 16px;
    line-height: 2;
    color: #444;
    font-weight: 600;
    display: inline-block;
}
.card-desc .loading {
    margin-left: 10px;
    font-size: 12px;
    color: #f63;
    font-weight: 300;
}
.card-desc .desc {
    margin-left: 15px;
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    font-weight: 300;
}

.oper-btn {
    width: 80px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0;
    font-weight: 600;
    text-align: center;
    color: #177ECA;
}

.oper-btn .pre {
    font-size: 48px;
    display: inline-block;
    width: 45%;
    height: 100%;
    margin-right: 5%;
    box-sizing: border-box;
}

.oper-btn .pre.disable {
    color: #aaa;
}

.oper-btn .pre:not(.disable):active {
    color: #c30;
}

.oper-btn .next {
    font-size: 48px;
    display: inline-block;
    width: 45%;
    height: 100%;
    margin-left: 5%;
    box-sizing: border-box;
}

.oper-btn .next.disable {
    color: #aaa;
}

.oper-btn .next:not(.disable):active {
    color: #c30;
}
</style>
<template>
    <div class="wrap">
        <div class="card-layer" v-on:click.stop="closePicCard"></div>
        <div class="card-wrap">
            <div class="pic-wrap" v-el:pic-wrap>
                <img v-for="imgsrc in imgSrcs.smallSrcs" v-bind:src="imgsrc.src" v-bind:class="{blur: imgsrc.isBlur}">
            </div>
            <div class="card-desc">
                <p class="title">{{imgSrcs.smallSrcs[curIndex].title}}</p>
                <span class="loading" v-show="imgSrcs.smallSrcs[curIndex].isBlur">加载中...</span>
                <p class="desc">{{imgSrcs.smallSrcs[curIndex].desc}}</p>
            </div>
            <div class="oper-btn">
                <a class="pre" v-on:click="preImg" v-bind:class="{disable: curIndex==0}">&lsaquo;</a>
                <a class="next" v-on:click="nextImg" v-bind:class="{disable: curIndex==(imgSrcs.smallSrcs.length-1)}">&rsaquo;</a>
            </div>
        </div>
    </div>
</template>
<script>
import srcs from '../data/imgsrcs.js'

export default {
    props: ['imgSrcs'],
    data: function() {
        return {
            curIndex: 0
        }
    },
    methods: {
        preImg: function() {
            if ((this.curIndex - 1) >= 0) {
                this.curIndex--;
                this.$els.picWrap.children[0].style.marginLeft = '-' + this.curIndex * 100 + '%';
            }
        },
        nextImg: function() {
            if ((this.curIndex + 1) < this.imgSrcs.smallSrcs.length) {
                this.curIndex++;
                this.$els.picWrap.children[0].style.marginLeft = '-' + this.curIndex * 100 + '%';
                var index = this.curIndex;
                var me = this;
                this.$nextTick(function(index) {
                    if (me.imgSrcs.smallSrcs[index].isBlur) {
                        var image = new Image();
                        image.src = me.imgSrcs.bigSrcs[index];
                        image.onload = function() {
                            me.imgSrcs.smallSrcs[index].src = image.src;
                            me.imgSrcs.smallSrcs[index].isBlur = false;
                        }
                    }
                }.bind(this, index));
            }
        },
        closePicCard: function() {
            this.$dispatch("closePicCard");
            this.$dispatch('toggleScroll');
        }
    },
    ready: function() {
    	var index = this.curIndex;
        this.$nextTick(function() {
            if (this.imgSrcs.smallSrcs[index].isBlur) {
                var image = new Image();
                image.src = this.imgSrcs.bigSrcs[index];
                var me = this;
                image.onload = function() {
                    me.imgSrcs.smallSrcs[index].src = image.src;
                    me.imgSrcs.smallSrcs[index].isBlur = false;
                }
            }
        }.bind(this, index));
    }
}
</script>
