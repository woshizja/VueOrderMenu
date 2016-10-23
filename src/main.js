import Vue from 'vue'
import App from './App'
import Cart from './Cart.vue'

import FastClick from 'fastclick';
FastClick.attach(document.body);

import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [
    { path: '/', component: App },
    { path: '/cart', component: Cart },
    { path: '', component: App }
];

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x:0, y:0};
        }
    }
});


const app = new Vue({
    router
}).$mount('#app')
