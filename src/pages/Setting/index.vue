<template>
	<div class="setting">
		<ul class="setting-nav">
			<li :class="{current:currentRoute=='/setting/info'}">
				<router-link to='/setting/info'>人文社科</router-link>
			</li>
			<li :class="{current:currentRoute=='/setting/auth'}">
				<router-link to='/setting/auth'>时尚杂志</router-link>
			</li>
			<li :class="{current:currentRoute=='/setting/adv'}">
				<router-link to='/setting/adv'>最近更新</router-link>
			</li>
		</ul>
		<div class="setting-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				currentRoute:'/setting/info'
			}
		},
		watch:{
			'$route':function(to,from){
				this.currentRoute = to.path;
			}
		},
		mounted(){
			this.$router.push(this.currentRoute);
		}
	}

</script>
<<style>
	.setting-nav{
		border-bottom: 1px solid #ccc;
		overflow: hidden;
	}
	.setting-nav::after{
		content: '';
		display: block;
		clear: both;
	}
	.setting-nav>li{
		float: left;
		width: 120px;
		text-align: center;
	} 
	.setting-nav>li.current{
		border-bottom: 1px solid pink;
	}
	.setting-content{
		padding:0 .5em;
	}
</style>