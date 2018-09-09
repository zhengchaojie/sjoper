<template>
  <div class="shop"  ref="shop">
    <div>
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <span class="icon-love" style=" right: 15px;position: absolute;" id="love"  @click="love"></span>
      <div class="desc ">
        <star24  :score="seller.score" class="star" ></star24>
        <span class="ratingCount">({{seller.ratingCount}})</span>
        <span class="sellCount">月售{{seller.sellCount}}单</span>

      </div>
      <ul class="remark">
      <li  class="block">
        <h2  >起送价</h2>
        <div class="content">
          <span class="stress">{{seller.minPrice}}</span>元
        </div>
      </li>
      <li class="block">
        <h2>商家配送</h2>
        <div class="content">
          <span class="stress">{{seller.deliveryPrice}}</span>元
        </div>
      </li>
      <li class="block">
        <h2>平均配送时间</h2>
        <div class="content">
          <span class="stress">{{seller.deliveryTime}}</span>元
        </div>
      </li>
      </ul>

    </div>

    <div class="bulletin">
      <h1 class="gonggao">公告与活动</h1>
      <div class="content-wrapper ">
        <p class="content1">{{seller.bulletin}}</p>
      </div>
      <div v-if="seller.supports" class="supports">
        <li v-for="(item,index) in seller.supports">
          <span>⭐</span>
          <span class="s-text">{{seller.supports[index].description}} </span>
        </li>
      </div>

    </div>
      <div class="info">
        <div class="title  border-1px">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in seller.infos" :key="info.id">{{info}}</li>
        </ul>
      </div>


    </div>
    </div>
</template>

<script>
  import star24 from '../../components/star/star24'
  import BScroll from "better-scroll"

    export default {

      data(){
         return{
           seller:[]
         }
      },
      mounted :function(){
        this.getseller();
      },
      methods:{
        getseller(){
          this.$http.get('/api/seller').then(
            function (response) {
              this.seller = response.body.seller;
               this.$nextTick(()=>{
                 this.scroll = new BScroll(this.$refs.shop, {
                   click: true
                 });
               })


            }
          )
        },
        love(){
            let favourite = document.getElementById('love')

            if( favourite.style.color = "black"){
                    favourite.style.color = "red" ;
            }else {
                  favourite.style.color = "black" ;;
            }
        },



        },
      components:{
        star24,

      }
    }
</script>

<style scoped>
  .shop{ position: absolute;top :174px;bottom: 0;left :0;width :100%;overflow :hidden;}
  .icon-love{color: black}
  .overview{ padding:18px;position:relative;}
  .title{margin-bottom:8px;line-height :4px;color:rgb(7,17, 27);font-size:14px;display: inline-block}
  .desc{ padding-bottom :18px;}
  .star{display :inline-block;vertical-align :top;margin-right:8px;}
  .ratingCount{display: inline-block;vertical-align: top;margin-right :12px;line-height :18px;
    font-size :10px;color: rgb(77, 85, 93);}
  .sellCount{display: inline-block;vertical-align: top;margin-right :12px;line-height :18px;
   font-size :10px;color: rgb(77, 85, 93);}

  .remark{ display: flex;padding-top: 18px;}
  .block{flex: 1;text-align :center;border-right :1px solid rgba(7, 17, 27, 0.1);color: rgb(7, 17, 27)}
  h2{color: rgb(7,17,27);font-size: 18px}
  .content{line-height :24px;font-size :10px;}

  .stress{font-size: 24px;color :rgb(7, 17, 27)}
  .gonggao{margin-bottom:8px;line-height :4px;color:rgb(7,17, 27);
    font-size:14px;display: inline-block;text-align: center}
  .content1{line-height :24px;font-size :10px;}
  .supports{width: 80%;margin: 0 auto;font-size: 16px;}
</style>
