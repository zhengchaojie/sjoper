<template>

  <div class="controlmenu">
    <div class="delete" v-show="food.count>0" @click.stop.prevent="decreaseCart" >
      <span class="icon-sad"></span>
    </div>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add " @click.stop.prevent="addCart">
      <span class="icon-smile"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';


    export default {
      props: {
        food: {
          type: Object
        }
      },
        data(){
         return{

         }
        },


      methods: {

        addCart(event) {
          if (!event._constructed) {
            return;  //解决PC端双点击的问题 浏览器直接return掉,去掉自带click事件的点击
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
        },
        decreaseCart(event) {
          if (!event._constructed) {
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      },

      }
</script>

<style scoped>
  .controlmenu{display:inline-block;font-size: 0}
  .delete {display: inline-block;line-height: 18px;font-size: 18px;}
  .icon-sad{color: rgb(0,160,220);}
  .count{display: inline-block;vertical-align: top;width: 12px;padding-top: 8px;
    line-height: 20px;text-align: center;font-size: 10px;color: rgb(147,153,159);}
  .add{display: inline-block;line-height: 18px;font-size: 18px;}
  .icon-smile{color: rgb(0,160,220);}
</style>
