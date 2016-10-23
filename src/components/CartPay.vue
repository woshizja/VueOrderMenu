<template>
      <div class="cart-pay">
            <div class="cart-price" v-show="totalNumber">
                  <span class="desc">总计： </span>
                  <span class="num">{{totalNumber}}个菜</span>
                  <span class="price">￥{{totalPrice}}</span>
                  <span class="pay">确认下单</span>
            </div>
            <transition name="gotomenu">
                  <div class="goto-menu" v-show="!totalNumber">
                        <router-link to="/">查看菜单</router-link>
                  </div>
            </transition>
      </div>
</template>
<script type="text/javascript">
export default {
      props: ["totalPrice", "totalNumber"]
}
</script>
<style type="text/css" scoped>
.gotomenu-enter-active,
.gotomenu-leave-active {
      transition: transform .3s ease;
}

.gotomenu-enter {
      transform: scale(0);
}

.cart-price {
      padding: 10px 15px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
      display: flex;
      flex-grow: 0;
      flex-direction: row;
      border-bottom: 1px solid #e1e1e1;
      background: #f0f0f0;
}

.cart-price .desc {
      font-weight: 600;
      flex-shrink: 0;
}

.cart-price .num {
      color: #666;
      flex-grow: 1;
}

.cart-price .price {
      width: 90px;
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #6CCA6A;
}

.cart-price .pay {
      text-align: center;
      width: 88px;
      cursor: pointer;
      border-radius: 2px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: #F35D56;
}

.cart-price .pay:active {
      background: #C3605B;
}

.goto-menu {
      text-align: center;
      font-size: 14px;
      margin-top: 200px;
}

.goto-menu a {
      display: inline-block;
      color: #fff;
      background: #f63;
      width: 88px;
      height: 30px;
      line-height: 30px;
}
</style>
