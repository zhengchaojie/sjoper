<template>
  <div class="evaStar" >
    <ul class="star">
      <li v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"
          track-by="index"></li><!--性能优化 track-by 数据不改变时不会重新渲染-->
    </ul>
  </div>
</template>

<script>
  export default {
    props:{
      score:{
        type:Number
      }
    },
    computed:{
      itemClasses:function(){
        let result = []; // 返回的是一个数组,用来遍历输出星星
        let score = Math.floor(this.score * 2 ) / 2; // 计算所有星星的数量
        let hasDecimal = score % 1 !== 0; // 非整数星星判断
        let integer = Math.floor(score); // 整数星星判断
        for(let i=0;i<integer;i++){ // 整数星星使用on
          result.push("on"); // 一个整数星星就push一个CLS_ON到数组
        }
        if(hasDecimal){ // 非整数星星使用half
          result.push("half");
        }
        while(result.length < 5){// 余下的用无星星补全,使用off
          result.push("off");
        }
        return result;
      }
    }
  }
</script>

<style scoped>
  .evaStar{

    display: inline-block;


  }
  .star{
    text-align: center;
    display: inline-block;

  }
  .star-item{
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;

    background-size:24px ;
  }
  .star-item.on{
    background-image: url(全星.png);
  }
  .star-item.half{
    background-image: url(半颗星.png);
  }
  .star-item.off{
    background-image: url(无星.png);
  }
</style>
