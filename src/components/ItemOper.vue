<template>
      <div class="oper-wrap">
            <div class="minus" v-show="num" v-on:click.stop="minusDish">
                  <i class="bg"></i>
            </div>
            <div class="num" v-show="num">
                  <span>{{num?num:''}}</span>
            </div>
            <div class="add" v-on:click.stop="addDish">
                  <i class="bg"></i>
            </div>
      </div>
</template>
<script>
import eventHub from '../eventHub.js'

export default {
      props: ["dishNum", "dishId", "catalogId", "insideMenu"],
      computed: {
            num: function() {
                  return this.dishNum;
            }
      },
      methods: {
            addDish: function() {
                  if(this.insideMenu){
                        eventHub.$emit("add-dish", this.dishId, this.catalogId);
                  } else {
                        eventHub.$emit("cart-add-dish", this.dishId, this.catalogId);
                  }
            },
            minusDish: function() {
                   if(this.insideMenu){
                        eventHub.$emit("minus-dish", this.dishId, this.catalogId);
                  } else {
                        eventHub.$emit("cart-minus-dish", this.dishId, this.catalogId);
                  }
            }
      }
}
</script>
<style scoped>
.oper-wrap {
      width: fit-content;
      max-width: 88px;
      min-width: 30px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #d0d0d0;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      overflow: hidden;
}

.oper-wrap .minus {
      flex-grow: 0;
      display: inline-block;
      width: 30px;
      height: 30px;
      position: relative;
      background: transparent;
      cursor: pointer;
}

.minus .bg {
      display: inline-block;
      background: url(../img/addminus.png) no-repeat;
      background-size: 48px auto;
      background-position: -12px 0;
      width: 12px;
      height: 12px;
      position: absolute;
      top: 8px;
      left: 9px;
}

.oper-wrap .num {
      box-sizing: border-box;
      flex-grow: 0;
      display: inline-block;
      width: 30px;
      height: 20px;
      color: #323232;
      line-height: 20px;
      text-align: center;
      border-left: 1px solid #d0d0d0;
      border-right: 1px solid #d0d0d0;
      margin-top: 5px;
}

.oper-wrap .add {
      flex-grow: 0;
      display: inline-block;
      width: 30px;
      height: 30px;
      position: relative;
      background: transparent;
      cursor: pointer;
}

.add .bg {
      display: inline-block;
      background: url(../img/addminus.png) no-repeat;
      background-size: 48px auto;
      width: 12px;
      height: 12px;
      position: absolute;
      top: 8px;
      right: 9px;
}
</style>
