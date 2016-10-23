<template>
      <div class="cart-items">
            <ul class="cart-index">
                  <li>菜名</li>
                  <li>单价</li>
                  <li>数量</li>
            </ul>
            <ul class="ordered-dish" v-for="dishs in dishsData" v-if="dishs.orderedDishs.length">
                  <li v-for="(dish, dishID) in dishs.orderedDishs" v-if="dishID!=='length'">
                        <span class="dish-name">{{dishs.dishs[dish.dishIndex].dishName}}</span>
                        <span class="dish-price">￥{{dish.dishPrice}}</span>
                        <item-oper v-bind:dish-num="dish.num" v-bind:dish-id="dishID" v-bind:catalog-id="dishs.catalogID"></item-oper>
                  </li>
            </ul>
      </div>
</template>
<script type="text/javascript">
import ItemOper from './ItemOper.vue'

export default {
      props: ["dishsData"],
      components: {
            ItemOper
      }
}
</script>
<style type="text/css" scoped>
.cart-index {
      line-height: 30px;
      font-size: 12px;
      color: #435664;
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 0 15px;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      background: #F0F0F0;
}

.cart-index li {
      list-style: none;
}

.cart-index li:nth-child(1) {
      flex-grow: 1;
}

.cart-index li:nth-child(2) {
      flex-grow: 0;
      width: 90px;
      text-align: left;
}

.cart-index li:nth-child(3) {
      width: 88px;
      text-align: center;
      flex-grow: 0;
}

.cart-items .ordered-dish li {
      height: 40px;
      border-bottom: 1px solid #e1e1e1;
      padding: 0 15px;
      color: #333;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
}

.dish-name {
      font-weight: bold;
      flex-grow: 1;
}

.dish-price {
      flex-grow: 0;
      font-weight: bold;
      color: #999;
      width: 90px;
      text-align: left;
}

.dish-num {
      flex-grow: 0;
}
</style>
