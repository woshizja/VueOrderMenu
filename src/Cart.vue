<template>
      <div class="cart-wrap">
            <cart-header v-bind:shop-name="shopName"></cart-header>
            <cart-items v-bind:dishs-data="dishsData" v-on:add-dishz="addDish" v-on:minus-dish="minusDish"></cart-items>
            <cart-pay v-bind:total-number="totalNum" v-bind:total-price="totalPri"></cart-pay>
      </div>
</template>
<script>
import CartHeader from './components/CartHeader.vue'
import CartItems from './components/CartItems.vue'
import CartPay from './components/CartPay.vue'
import shopData from './data/shopData.js'
import eventHub from './eventHub.js'

export default {
      data: function() {
            return {
                  dishsData: shopData.dishsData,
                  shopName: shopData.shopInfo.shopTitle,
                  totalPri: 0
            };
      },
      computed: {
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
            eventHub.$on('cart-add-dish', this.addDish);
            eventHub.$on('cart-minus-dish', this.minusDish);
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
                  }
                  return res;
            }
      },
      components: {
            CartHeader,
            CartItems,
            CartPay
      }
}
</script>
<style type="text/css">
body {
      background: #f8f8f8;
}
</style>
