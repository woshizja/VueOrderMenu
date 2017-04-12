# ordermenu

> ordermenu by vue, on mobile

实习的时候有接触过类似的一个项目，当时是用React构建的，为了熟悉Vue想着再把它重写一次，当然交互变化还是蛮大的：

- [老版](http://m.dianping.com/hobbit/mdp/spuDishMenuPage?shopId=21360289)；
- [新版](https://woshizja.github.io/VueOrderMenu/)；

目前（截止10.7）这个“重写”只完成了部分最基本的功能，未来有待完善的地方很多，个人觉得还要加入`vue-router`用于组织多页面，完成一个单页面应用。这篇文章只是重写过程中的一些小小总结吧。

### 一、组件化
项目是由`vue-cli`生成的vue+webpack模板基础上构建的：

``` javascript
vue init webpack OrderMenu
```

目前整个页面分成了**8个**组件：
![](http://oenqoxl4h.bkt.clouddn.com/orderMenu.jpg)

八个组件是分层次的：组件分层嵌套。层次的确定有的是根据功能区分，有的是根据渲染的位置和层次。**根组件**下只包含四个子组件：

- `menu-header`：头部结构，包含店铺信息，搜索模块等；
- `menu-item`：v-for渲染的list，用于显示菜品；
- `menu-cart`：用于显示当前点菜的数量和价格；
- `pic-card`：卡片式大图查看组件，在点击菜品缩略图时弹出；

这里组件的划分也不是最合理的，我感觉在功能划分上做的还不够好。

### 二、数据设计
既然是一个点菜的页面，那么菜品信息必然是主要的部分：

``` javascript
var dishs = [{
    catalog: "招牌鲜鱼",
    catalogID: 1100,
    dishs: [{
        dishID: 100,
        dishName: "花鲢",
        dishDesc: "约350g，原产地当日直供。本店所有鱼均由省重点养殖企业 龙华渔场 提供。",
        dishPrice: 25,
        likeNum: 488,
        imgSrc: require('../img/hualian1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: ["招牌推荐", "鱼类", "热门"],
        dishNum: 0,
	   imgSrcs: {
	   	smallSrcs: [],
    		bigSrcs: []
	   }
    }, {
        // 次分类的下一道菜品
	   // ...
    }]
}, {
    // 下一个分类
    // ...
}];
```

在实际中页面渲染可以在客户端或者服务端，在客户端可以通过网络请求获取JSON格式的数据，或者从**本地存储**（localStorage）中读取，服务端渲染则是计算出可用的HTML和相应的CSS，JS直接返回给客户端。

### 三、组件设计
这个项目是Vue+webpack，所以可以使用`vue-html-loader`，`vue-loader`，`vue-style-loader`来处理`.vue`文件，将html模板，组件样式和js都写在一个文件里，实现更完美的组件封装，我觉得这种方式相对于react等框架的一个明显优点就是我们可以更好的管理css。
下面是一个`.vue`文件的大致结构：

``` javascript
<template>
    <div id="app">
        <menu-header></menu-header>
        <menu-item></menu-item>
        <menu-cart></menu-cart>
        <pic-card></pic-card>
    </div>
</template>
<script>
import MenuHeader from './components/MenuHeader'
import MenuItem from './components/MenuItem.vue'
import MenuCart from './components/MenuCart.vue'
import PicCard from './components/PicCard.vue'
import dishsData from './data/dishs.js'

export default {
    data: function() {
        return {
            filterKey: '',
            totalNum: 0,
            totalPri: 0,
            lockScroll: false,
            picCardSrcs: '',
            showPicCard: false,
            activeIndex: 0,
            catalogPos: [],
            orderedDishs: {
                pos: [],
                num: []
            }
        };
    },
    components: {
        MenuHeader,
        MenuItem,
        MenuCart,
        PicCard
    },
    created: function() {},
    ready: function() {},
    methods: {
        initCatalogPos: function() {},
        initOrderedDishs: function() {},
        getDishPos: function(id) {}
    },
    watch: {
        orderedDishs: function(nv, ov) {}
    },
    events: {
        updateCatalog: function(index) {},
        updataFilterkey: function(val) {},
        addCart: function(id) {},
        minusCart: function(id) {},
        toggleScroll: function() {},
        openPicCard: function(srcs) {},
        closePicCard: function() {}
    }
}
</script>
<style>
</style>

```

- `.vue`文件默认生成一个以文件名命名的组件，生成该组件无需调用`Vue.component()`，组件选项以对象形式输出（export {}）；
- 在`.vue`文件中也可以引入Vue（`import Vue from 'vue'`），然后按照常规的方式生成组件：

``` javascript
<script>
import Vue from 'vue'

Vue.component('tag-combo', {
    template: '<div class="dish-tag">' +
        '<span>套餐</span>' +
        '</div>'
});

Vue.component('tag-promotion', {
    template: '<div class="dish-tag">' +
        '<span>特价</span>' +
        '</div>'
});
</script>
<style>
.dish-tag{}
</style>
```

- 调用`Vue.component()`生成的组件会自动输出，模板选项中**不能写类或者ID选择器**；
- 使用 `import {TagCombo,TagPromotion} from './DishTag.vue'`引入组件；
- 如果template模板中有嵌套子组件，组件必须在`components`选项中注册（先import再注册）；

### 四、组件通信
在这个项目中主要采用了两种通信方式：
#### 4.1 Props
通过`props`传递数据，这种方式符合Vue**数据驱动**的理念，但是实现起来比较麻烦：

``` javascript
// 父组件中嵌套子组件 menu-header，使用v-bind动态的传递父组件中的数据
<div id="app" v-bind:class="{showCart:totalNum}">
        <menu-header v-bind:active-index="activeIndex" v-bind:ordered-tips="orderedDishs.num"></menu-header>
</div>

// 子组件中声明props字段，并同样使用v-bind传递给嵌套的子组件
<template>
    <menu-contents v-bind:active-catalog="activeIndex" v-bind:number-tips="orderedTips"></menu-contents>
</template>
export default {
    props: ['activeIndex', 'orderedTips']
}

// 在子子组件中使用根组件传递过来的数据
<span class="num" v-show="numberTips[$index]">{{numberTips[$index]}}</span>
props: ['activeCatalog', 'numberTips']
```

- 可以看到通过props传递数据需要在中间组件设置**过渡**字段，看起来略显麻烦，所以我们应该拆分组件时尽量避免深层次的嵌套，这也是最开始我说这个项目组件划分并不完美的原因；

#### 4.2 自定义事件
项目中还使用了自定义事件来进行通信：在`events`字段中订阅事件，使用`$dispatch()`派发事件并传递数据。一般来说我觉得如果嵌套不是特别深最好是还用第一种方法。

当然如果数据结构设计的合理可以大大简化这方面的工作，举个例吧，需求是这样的：

> 当用户点击加菜或者点菜时，需要在目录相应分类处标识该类别下点了有多少道菜品。

第一版是这样实现的：

> 在根组件中创建一个字段`orderedDishs`，它是一个对象，其中num属性是一个数组，数组中代表了各个大类下被点的菜品数量，然后通过props传递给目录组件。

比较麻烦的是：中间需要生成间接props；根组件需要在合适的时候初始化`orderedDishs`；用户操作时通过dispatch派发事件。所以第二版中我更改了一下数据结构：在菜品信息下每一个大类中新设立一个字段：orderedDishs。它是个数组，里面存放该类别下被点菜品的index。比如：`orderedDishs = [0,2,3]`代表该类别下第1,3和4道菜被点了。目录渲染已点菜品数量时直接根据orderedDishs的长度进行。
第二版带来的好处在于：相比于以前派发菜品id，现在不用到整个菜品数据中搜索需要的信息（比如价格等），而是直接根据位置信息读取，复杂度变为O(1)。其次，不需要中间组件传递数据，目录直接和菜品信息绑定。

### 五、一些感想
- Vue的组件没有使用shadowDOM，如果给css样式设置`scoped`，那么模板内每一个DOM元素会添加类似`_v-36628053`这样的自定义属性，感觉有点冗余；
- Vue对`camelCase`和`kebab-case`的处理可能最开始会让你不适应；
- 感觉在移动端浏览器兼容方面还是有些问题（在UC上存在bug）；
- 往后还需要研究哈`vue-router`和`vuex`；