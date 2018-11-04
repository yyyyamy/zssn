<tenplate>
	<div class="login">
		<h2>登陆页面</h2>
		
		<el-button @click='login'>登录</el-button>
	</div>
</tenplate>
<script>
	export default{
		data(){
			return{
				form:{},
			}
		},
		methods:{
			login(){
				alert(1);
				axios.post('/login',this.form).then((result)=>{
					console.log('success','result');
				})
				.catch((error)=>{
					console.log('error',error);
				});
				//this.$root.currentComponent = 'App';
			}
		}
	}
</script>
<style>
	
</style>