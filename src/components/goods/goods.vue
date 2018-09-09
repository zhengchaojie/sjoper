<template>
  <div class="goods">

    <div class="left" ref="leftscroll">
      <ul>
        <li v-for="(item,index) in goods" class="left-menu"  :class="{'current':currentIndex === index}"
            @click="selectMenu(index,$event)"  ref="menuList">
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="right" ref="rightscroll">
      <ul>
        <li v-for="item in goods" class="foods-list"  ref="foodList">
          <h1 class="tittle">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="foods-item ">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}% </span>
                </div>
                <div class="price">
                  <span class="new">￥{{food.price}}元</span>
                  <span class="old"  v-show="food.oldPrice">￥{{food.oldPrice}}元</span>

                </div>
                <div class="controlmenu">
                 <controlmenu  :food="food"></controlmenu>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shopcart>
  </div>

</template>

<script>
  import BScroll from "better-scroll"
  import shopcart from '@/components/shopcart/shopcart'
  import  controlmenu from "@/components/controlmenu/controlmenu"
    export default {
    props:{

    },

      data(){
         return {
           seller:[],
           goods:[],
           listHeight:[],
           scrollY:0
         }
      },
      mounted: function (){
        this.getgoods();
        this.getseller();


      },
      computed:{
        currentIndex:function() {
          for(let i=0;i< this.listHeight.length;i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i+1];
            if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
              return i;
            }
          }
          return 0;
        },
        selectFoods() {
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
          });
          return foods;
        }

      },
      methods: {
        getseller(){
          this.$http.get('/api/seller').then(
            function (response) {
              this.seller = response.body.seller;
            }
          )
        },
        getgoods(){
          this.$http.get("/api/goods").then(
            function(response){
              this.goods = response.body.goods;
              this.$nextTick(()=>{
                this.scroll();
                this.calculateHeight();
              })

            }
          )
        },
        scroll: function () {
          this.leftscroll = new BScroll(this.$refs.leftscroll, {click: true});
          this.rightscroll = new BScroll(this.$refs.rightscroll, {click: true, probeType: 3});
          this.rightscroll.on('scroll', (pos) => {
            // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
            if (pos.y <= 0) {
              this.scrollY = Math.abs(Math.round(pos.y));
            }
          })
        },
        selectMenu: function (index, event) {
          if (!event._constructed) {
            return;
          }
          let foodList = this.$refs.foodList;
          let el = foodList[index];
          this.rightscroll.scrollToElement(el, 300);
        },


        calculateHeight: function () {
          let foodList = this.$refs.foodList;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        }
      },
      components:{
        shopcart,
        controlmenu
      }
    }


</script>

<style scoped>
  .goods{display: flex;overflow: hidden;position: absolute; top: 174px; width: 100%;bottom:46px;}
  .left{flex: 0 0 80px;width: 80px;background: #f3f5f7;}
  .left-menu{display: table;line-height: 14px;width: 56px;height: 54px;padding: 0 12px;}
  .current{ position: relative;z-index: 10;margin-top: -1px;background: #fff;font-weight: 700;}
  .text{display: table-cell;width: 56px;vertical-align: middle;font-size: 12px;
    border: 1px solid rgba(7,17,27,0.1);text-align: center;}
  .tittle{padding-left: 14px;height: 26px;line-height: 26px;border-left: 2px solid #d9dde1;
    font-size: 12px;color: rgb(147,153,159);background: #f3f5f7;}
  .right{flex: 1;}
  .foods-item{display: flex;margin:18px;padding-bottom:18px;}
  .icon{display: inline-block; vertical-align: top;height: 12px;margin-right: 2px;
    background-size: 12px 12px;background-repeat: no-repeat;}
   icon{flex: 0 0 57px;width: 57px;height:57px ;margin-right: 10px;vertical-align: top;}
  .content{flex: 1;position: relative}
  .name{margin:2px 0 8px 0;height: 14px;line-height: 14px;font-size: 14px;color: rgb(7,17,27);}
  .description{margin-bottom: 8px;line-height: 12px;font-size: 10px;color: rgb(147,153,159);}
  .extra{line-height: 10px;font-size: 10px;color: rgb(147,153,159);}
  .count{margin-right: 12px;}
  .price{font-weight: 700;line-height: 24px;display: inline-block}
  .new{margin-right: 8px;font-size: 14px;color: rgb(240,20,20);}
  .old{text-decoration: line-through;font-size: 10px;color: rgb(147,153,159);}
  .controlmenu{position: absolute;right: 0;bottom: 0;display: inline-block}
  /* .bottom{position: absolute;height: 68px;width: 100%;}*/
</style>
