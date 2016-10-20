import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick';
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: (createElement)=>{
        return createElement(App);
    }
})