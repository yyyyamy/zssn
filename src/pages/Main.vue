<template>
	<div class="main">
		<!-- 按钮区 -->
		<div class="btns">
			<el-button size='small' type="info" plain>say</el-button>
		<el-button size='small' type="danger" plain>hi</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 内容区 -->
		<div class="content">
			<p>
				你好呀<br>
				我是一个超级爱音乐，喜欢民谣也享受电音的小姑娘<br>
				一直在完善这个项目,做的不好的地方还请多多指教<br>
			</p>
			<img src="@/assets/e.jpg" alt="">
		</div>
		<!-- 内容区结束 -->
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style>
.content{
	margin: .5em;
	}
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

i.fa.fa-kiss-wink-heart{
	color: pink;
}
.content>img{
	width: 300px;
	height: 300px;
}
</style>