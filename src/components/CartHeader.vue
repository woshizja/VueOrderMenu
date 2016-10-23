<template>
      <div class="cart-head">
            <div class="back">
                  <router-link to="/"><span class="text">返回</span></router-link>
            </div>
            <div class="title">
                  <p>{{shopName}}</p>
            </div>
            <div class="delete"></div>
      </div>
</template>
<script>
export default {
      props: ["shopName"]
}
</script>
<style scoped>
.cart-head {
      height: 44px;
      line-height: 44px;
      color: #333;
      font-size: 15px;
      box-shadow: 0 0 2px 1px #b2b2b2;
      margin-bottom: 10px;
      padding: 0 15px;
      display: flex;
      flex-direction: row;
}

.cart-head .back {
      width: 70px;
}

.cart-head .title {
      flex-grow: 1;
      text-align: center;
}

.cart-head .delete {
      width: 70px;
      flex-grow: 0;
}

.back .text {
      margin-left: 12px;
      line-height: 44px;
      font-size: 14px;
      color: #333;
}

.back a {
      width: 70px;
      position: absolute;
}

.back a:before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      position: absolute;
      left: 0px;
      top: 15px;
      border: 2px solid #f63;
      border-top: none;
      border-right: none;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
}

.title p {
      max-width: 180px;
      height: 44px;
      line-height: 44px;
      margin: 0 auto;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
}
</style>
