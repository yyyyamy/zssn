<template>
  <div class="app">
    <div class="header"> 
     <!-- 头 -->
      <div class="title">
     <i class="fa fa-hand-spock-o" aria-hidden="true"></i>
     <i>知书少年</i>
   </div>
    </div>
    <div class="center">
      <!-- 体 -->
      <div class="left-nav">
       <!-- 左侧导航 -->

       <ul>
         <li>
           <i class="fa fa-snowflake-o" aria-hidden="true"></i>
           <router-link to='./main' class='current'>首页</router-link>
           <i class="fa fa-angle-right"></i>
         </li>
         <li>
          <i class="fa fa-align-justify"></i>
           <router-link to='./category' class='current'>书籍分类</router-link>
           <i class="fa fa-angle-right"></i>
         </li>
         <li>
          <i class="fa fa-desktop"></i>
       <router-link to='/Article' class='current'>推荐书目</router-link> 
           <i class="fa fa-angle-right"></i>       
         </li>
         <li>
          <i class="fa fa-codepen"></i>
       <router-link to='/Setting' class='current'>杂志推荐</router-link>
           <i class="fa fa-angle-right"></i>     
         </li>
           <li>
          <i class="fa fa-angellist"></i>
       <router-link to='/User' class='current'>少年们</router-link>  
           <i class="fa fa-angle-right"></i>      
         </li>
       </ul>
       
       

      </div>
      <div class="content">
        <!-- 右侧内容 -->
        <div class="wrapper">

          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default{
    data(){
      return{
        currentRoute:'/'

      }
    }
  }
</script>
<style>
  html{
    font: normal normal 14px '微软雅黑'，'Microsoft YaHei';
    color: #666;
  }
  body,ul,ol,dl,p,h1,h2,h3{
    margin:0;
    padding: 0;
  }
  ul,ol{
    list-style: none;
  }
  a{
    color:#666;
    text-align: center;
    text-decoration: none;
  }
  div{
    box-sizing: border-box;
  }
  .header{
    height: 60px;
    position: absolute;
    width: 100%;
    top:0;
    background-color:#808080;
  }
  .header .title{
    color:#fff;
    line-height: 60px;
    font-size: 24px;
    padding: 0  1em;
  }
  .center{
    position: absolute;
    top:60px;
    bottom: 0;
    width: 100%;
  }
  .center>.left-nav{
    width:180px;
    height: 100%;
    background-color:#fff;
    float: left;
  }
  .center>.left-nav>ul{

  }
  .center>.left-nav>ul>li{
    position: relative;
    line-height: 3em;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .center>.left-nav>ul>li.current{
    cursor:pointer;
  }
  .center>.left-nav>ul>li i.fa{
    position: absolute;
    top:50%;
    margin-top:-.5em;
    left: 1em;
  }
  i.fa.fa-award{
    position: absolute;
    left: 2em;
  }
  i.fa.fa-angle-right{
    position: absolute;
    right: -8em;
  }
  .center>.content{
    background-color:#f0f0f0;
    margin-left: 180px;
    height: 100%;
    overflow-y:auto;
    padding: 1em 1em 0 1em;
  }
  .center>.content>.wrapper{
    width: 100%;
    height: 100%;
    background-color:#fff;
    border-radius:5px;
    padding:.5em;
  }
</style>