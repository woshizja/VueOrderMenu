<style scoped>
.menu-cart {
      position: fixed;
      z-index: 10;
      left: 0;
      bottom: 0;
      padding: 0 15px;
      box-sizing: border-box;
      width: 100%;
      height: 55px;
      border-top: 1px solid #e1e1e1;
      background: rgba(255, 255, 255, 0.933);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      transform: translateZ(0);
}

.menu-cart .cart-totalnum {
      width: 35px;
      height: 35px;
      line-height: 35px;
      border-radius: 50%;
      background: #6CCA6A;
      text-align: center;
      flex-grow: 0;
}

.cart-totalnum .num {
      color: #fff;
      font-size: 18px;
      text-align: left;
}

.menu-cart .cart-desc {
      color: #333;
      font-size: 12px;
      margin-left: 5px;
      flex-grow: 1;
}

.menu-cart .cart-btn {
      box-sizing: border-box;
      width: 115px;
      height: 35px;
      line-height: 35px;
      font-size: 15px;
      background-color: #f63;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
      border: none;
      outline: none;
      flex-grow: 0;
}

.menu-cart .cart-price {
      color: #f63;
      font-size: 18px;
      font-weight: 600;
      flex-grow: 1;
}
</style>
<template>
      <div class="menu-cart">
            <div class="cart-totalnum">
                  <span class="num">{{totalNumber}}</span>
            </div>
            <div class="cart-desc">
                  <span class="text">共{{totalNumber}}个菜</span>
            </div>
            <div class="cart-price">
                  <span class="price">￥{{totalPrice}}</span>
            </div>
            <button class="cart-btn" v-on:click="gotoCart">查看购物车</button>
      </div>
</template>
<script>
export default {
      props: ['totalNumber', "totalPrice"],
      methods: {
            gotoCart: function() {
                  this.$router.push('cart');
            }
      }
}
</script>
