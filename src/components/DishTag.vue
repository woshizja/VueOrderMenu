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
.dish-tag{
    display: inline-block;
    width: 30px;
    height:18px;
    line-height: 16px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: normal;
    color:#f63;
    text-align: center;
    border: 1px solid #f63;
    border-radius: 3px;
    margin-left: 10px;
    transform: translateY(-2px);
}
</style>
