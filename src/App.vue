<template>
  <div id="app">


    <tabhead :seller="seller"></tabhead>
    <router-view ></router-view>
    <div class="tab">
      <div class="tab-item">  <router-link to="/goods">商品</router-link> </div>
      <div class="tab-item">  <router-link to="/ratings">评论</router-link> </div>
      <div class="tab-item">  <router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
    <router-view seller="seller"></router-view>
  </keep-alive>


  </div>

</template>

<script>
  import tabhead from '@/components/tabhead/tabhead'

export default {
  data () {
    return{
      seller:{},

    };
  },
  created() {
    this.$http.get("/api/seller").then((response)=>{
             response = response.body;
            if(response){
            //  console.log(res);
              this.seller = response.seller;

            }else {
              alert("请求i失败");
            }
      })




    },
  components:{
    tabhead,

  }

}
</script>

<style scoped>

   .tab {width: 100%;height: 40px;display: flex;line-height: 40px}
   .tab-item{ text-align: center;flex:1}


</style>
