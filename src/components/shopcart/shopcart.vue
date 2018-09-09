<!--suppress ALL -->
<template>
  <div class="shopcart">
    <div class="content">
      <div class="left">
        <div class="logo-warpper">
          <div class="logo" :class="{'lightlogo':tolcount>0}">
            <span class="icon-shopcart" :class="{'lighticon':tolcount>0}"></span>

          </div>
          <div class="count"  v-show="tolcount>0" >{{tolcount}}</div>
        </div>
        <div class="price" :class="{'lightprice':tolprice>0}"> ￥{{tolprice}}元  </div>
        <div class="des">另需配送费{{deliveryPrice}} 元</div>
      </div>

      <div class="right">
        <div class="pay" :class="payclass">
          {{pay}} </div></div>
    </div>
  </div>
</template>

<script>

     export default {
      props:{
				selectFoods:{
					type:Array,
					default(){return [
            {price: 10,
              count: 1}
          ];
					}
				},
				deliveryPrice:{
					type:Number,
					default:4
				},
				minPrice:{
					type:Number,
					default:20
				}
			},

	 	 	 computed:{
	 	 	 	tolprice(){
          let sum = 0;
          this.selectFoods.forEach((food) => {
            sum += food.price * food.count;
          });
          return sum;
	 	 	 	},
         tolcount (){
             	let count = 0 ;
             	this.selectFoods.forEach((food) =>{
	 	 	 			  count +=  food.count;
              }
              )
                 return count;},
         pay (){
                	if(this.tolprice === 0){
                      		return `￥${this.minPrice}元起送`;
                     	}else if(this.tolprice<this.minPrice){
                      		let sum = this.minPrice - this.tolprice;
                      		return `还差￥${sum}元起送`;
                      	}else{
                     		return '可以支付啦';
                      	}
                     },
         payclass(){
                     	  if(this.minPrice>this.tolprice){
                     	  	return  'notpay' ;
                     	  }else{
                      	  	return 'canpay';
                     	  }
                     }
	 	 },


    }
</script>

<style scoped>

  .shopcart{position: fixed;left: 0;bottom: 0;z-index: 50;width: 100%;height: 48px;background: #55A532;}
  .content{display: flex;background: #141d27;font-size: 0;}
  .left{flex: 1;}
  .logo-warpper{display: inline-block;position: relative;top: -10px;margin: 0 12px;
    padding: 6px;width: 56px;height: 56px;box-sizing: border-box;vertical-align: top;
    border-radius: 50%; background:#141d27 ;   }
  .logo{width: 100%;height: 100%;border-radius: 50%;background: #2b343c;}
  .lightlogo{background: rgb(0,160,220);}

  .icon-shopcart{font-size: 40px;color: #80858a;line-height: 40px;}
  .lighticon{color: #fff;}
  .price{display: inline-block;vertical-align: top;line-height: 24px;margin-top:12px ;padding-right: 12px;
    box-sizing: border-box;border-right: 1px solid rgba(255,255,255,0.1);font-size: 16px;
    font-weight: 700;color: rgba(255,255,255,0.4);}
  .lightprice{color: #fff;}
  .des{display: inline-block;vertical-align: top;line-height: 24px;margin: 12px 0 0 12px;
    color: rgba(255,255,255,0.4);font-size: 10px;}
  .right{flex: 0 0 105px;width: 105px;}
  .pay{height: 48px;line-height: 48px;text-align: center;font-size: 12px;font-weight: 700;
    color: rgba(255,255,255,0.4);background: #2b333b;}
  .notpay{background: #2b333b;}
  .canpay{background: #00b43c;color: #fff;}

  .count{position: absolute;top: 0;right: 0;width: 24px;height: 16px;line-height: 16px;
    text-align: center;border-radius: 16px;font-size: 9px;font-weight: 700;background:rgb(240,20,20) ;box-shadow: 0 4px  8px 0 rgba(0,0,0,0.4);}

</style>
