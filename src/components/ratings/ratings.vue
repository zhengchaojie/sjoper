<template>
  <div class="ratings"  ref="ratings"  >
    <div>

      <div class="overview">
        <div class="left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="tittle">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="servicewarpper">
            <span class="service">服务评分</span>
            <star36  :score="seller.serviceScore" class="star36"></star36>
            <span class="serviescore">{{seller.serviceScore}}</span>
          </div>
          <div class="servicewarpper">
          <span class="service">服务态度</span>
          <star36  :scor="seller.foodScore" class="star36"></star36>
          <span class="serviescore">{{seller.foodScore}}</span>
          </div>
          <div class="servicewarpper">
            <span class="service">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>

      </div>
      <div class="ratingswarpper" >
        <ul>
          <li v-for=" item in ratings" class="item">
            <div class="avater">
              <img width="28" height="28"  :src="item.avatar" />
            </div>
            <div class="content">
              <h1 class="user">{{item.username}}</h1>
              <div class="star24">
               <span class="delivery" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="time" >{{item.rateTime }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star36 from '../../components/star/star36'
  import BScroll from "better-scroll"
    export default {

      data(){
        return {
         seller:[],
          ratings:[],

        }
      },
      mounted :function(){
        this.getseller();
        this.getrangtings();

      },
      methods:{
        getseller(){
          this.$http.get('/api/seller').then(
            function (response) {
              this.seller = response.body.seller;
            }
          )
        },
        getrangtings(){
          this.$http.get('/api/ratings').then(
            function(response){
              this.ratings = response.body.ratings;

              this.$nextTick(()=>{

                 this.scroll = new BScroll(this.$refs.ratings, {
                   click: true
                });
              })

            })
        }


      },



      components:{
        star36
      }



    }
</script>

<style scoped>
  .ratings{position: absolute;top: 174px;bottom: 0;left: 0;width: 100%; overflow: hidden;}
  .overview{display: flex;padding: 18px 0;}
  .left{flex: 0 0 137px;width: 137px;border-right:1px solid rgba(7,17,27,0.1) ;text-align: center;
    padding-bottom: 6px;padding-top: 20px}
  .score{line-height: 28px;font-size: 24px;color: rgb(255,153,0);}
  .tittle{line-height: 12px;font-size: 12px;margin-top:6px ;color: rgb(7,17,27);}
  .rank{line-height: 10px;font-size: 10px;color: rgb(147,153,159);margin-top: 8px;}

  .right{flex: 1;padding: 6px 0 6px 24px;}
  .servicewarpper{line-height: 18px;margin-bottom: 8px;font-size: 0;}
  .service{font-size: 12px;color: rgb(7,17,27);display: inline-block;padding: 4px}
  .star36{display: inline-block;vertical-align: top}
  .serviescore{font-size: 12px;color: rgb(255,153,0); display: inline-block;padding: 4px}
  .deliveryTime{font-size: 12px;color: rgb(147,153,159);margin-left: 12px;}
  .ratingswarpper{padding: 0 18px;}
  .item{display: flex;padding-top: 18px;border-bottom: 1px  solid rgba(7,17,27,0.1);}
  .avater{flex: 0 0 28px;width: 28px;margin-right: 12px;}
  img{border-radius: 50%;}
  .content{position: relative;flex: 1;}
  .user{margin-bottom:4px;line-height: 12px;font-size: 10px;color: rgb(7,17,27);}
  .star24{margin-bottom: 6px;font-size: 0}
  .delivery{display: inline-block;vertical-align: top;color: rgb(147,153,159);font-size: 10px;line-height: 12px}
  .text{line-height: 18px;color: rgb(7,17,27);font-size: 12px;margin-bottom: 8px;}

  .time{position: absolute;top: 0;right: 0;font-size: 10px;color:rgb(147,153,159) ;}
</style>
