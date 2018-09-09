<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"> <img width="30" height="18" src="../../img/品牌.png"/> </span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

    </div>
    <div class="bulletin-wrapper" @click="mengceng">
      <span class="bulletin-title">
          <img  width="22" height="12" src="../../img/公告1.png"  style="vertical-align: top"/>
      </span><span class="bulletin-text">{{seller.bulletin}}</span>

    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="mengceng"  v-show="show1" >
      <div class="mengceng-warpper" >
        <div class="mengceng-content">
          <h1 class="h-name">{{seller.name}}</h1>
          <div class="star"><star   :score="seller.score"></star> </div>
          <div class="tittle">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div></div>



          <div v-if="seller.supports" class="supports">
            <li v-for="(item,index) in seller.supports">
              <span>⭐</span>
              <span class="s-text">{{seller.supports[index].description}} </span>
            </li>
          </div>
          <div class="tittle">
            <div class="line"></div>
            <div class="text">商家信息</div>
            <div class="line"></div></div>
          <div style="font-size: 16px; width: 80%;padding-left: 10%;">
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="close" @click="close1"> x </div>
    </div>

  </div>


</template>

<script>
   import star from '../../components/star/star'
    export  default {
      props:{
        seller:{
          type:Object
        }
      },
      data(){
        return{
          show1:false,
        }
      },
      methods:{
        mengceng: function(){
          this.show1 = true;
        },
        close1:function(){
          this.show1 = false;
        }
      },

      components:{
        star
      }

    };
</script>

<style scoped>
     .header{position: relative;overflow: hidden;
       color: #fff;background: rgba(7, 17, 27, 0.5)}
     .content-wrapper{ position: relative;padding: 24px 12px 18px 24px;font-size: 0}
     .avatar{display: inline-block;vertical-align: top}
     img{ border-radius: 2px}
     .content{ display: inline-block;margin-left: 16px}
     .title{ margin: 2px 0 8px 0}
     .brand{ display: inline-block;vertical-align: top;width: 30px;height: 18px;
       background-size: 30px 18px;background-repeat: no-repeat}
     .name{margin-left: 6px;font-size: 16px;line-height: 18px;font-weight: bold}
     .description{margin-bottom: 10px;line-height: 12px;font-size: 12px}
     .icon{display: inline-block;vertical-align: top;width: 12px;height: 12px;
       margin-right: 4px;background-size: 12px 12px;background-repeat: no-repeat}
     .text{ line-height: 12px;font-size: 10px;}
      .bulletin-wrapper{position: relative;height: 28px;line-height: 28px;padding: 0 22px 0 12px;
        white-space: nowrap;overflow: hidden;text-overflow: ellipsis;background: rgba(7, 17, 27, 0.2)}
     .bulletin-title{display: inline-block;vertical-align: top;margin-top: 8px;width: 22px;height: 12px;
        background-size: 22px 12px;background-repeat: no-repeat}
     .bulletin-text{vertical-align: top;margin: 0 4px;font-size: 10px;}

     .background{ position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: -1;filter: blur(8px)}
     .mengceng{ top: 0;position: fixed;z-index: 200;width: 100%; height: 100%;overflow: auto;background-color: rgba(7,17,27,0.8);}
     .mengceng-warpper{display: inline-block;width: 100%;
       min-height: 100%; color: #fff; }
     .mengceng-content{margin-top: 64px;padding-bottom: 64px; font-size: 16px;}
     .close{position: relative;width: 32px;height: 32px;margin: -64px auto 0 auto ;clear: both;font-size: 32px;display: flex;}
     .h-name{line-height: 16px;text-align: center;font-size: 16px;font-weight: 700;}
     .tittle{display: flex;width: 80%;margin: 30px auto 24px auto ;}
     .line{flex: 1;position: relative;top: -6px;border-bottom: 1px solid rgba(255,255,255,0.2);}
     .text{font-size: 14px; padding: 0 12px;}
     .supports{width: 80%;margin: 0 auto;font-size: 16px;}
</style>
