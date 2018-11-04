<template>
	<div class="article">
		<!-- 按钮区开始 -->
		<div class="btns" >
		 <el-select size="small" v-model="params.categoryId" clearable placeholder="书籍分类">
    <el-option v-for='c in categories' :label='c.name' :value='c.id' :key='c.id'>
    </el-option>
  </el-select>
  <el-input
  style="width:130px" size="small"
  placeholder="请输入关键字"
  v-model="params.keywords"
  clearable>
</el-input>
		<el-button size='small' @click='toAddArticle'>添加</el-button>
		<el-button size='small' @click='batchDeleteArticles'>批量删除</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 表格区 -->
		<!-- {{params}} -->
		<div class="article-tbl" v-loading='loading'>
			<el-table :border='true' size='small'
      :data="articles"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="title"
        label="推荐书目">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="publishtime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="readtimes"
        label="阅读次数">
      </el-table-column>
       <el-table-column
        label="操作" width='100px'>
        <template slot-scope='{row}'>
        	<i class="fa fa-trash" @click='deleteArticle(row.id)'></i>
        	<i class="fa fa-pencil" @click='toUpdateArticle(row)'></i>
        </template>
        </el-table-column>
    </el-table>
		</div>
		<!-- 表区格结束 -->
		<!-- 分页 -->
		<div class="page">
		  <el-pagination
		    layout="prev, pager, next"
		    :current-change='handleCurrentChange'
		    :total="total"
		    :page-size='params.pageSize'>
		  </el-pagination>
		</div>
		<!-- 分页结束 -->

		<!-- 模态框开始 -->
		<el-dialog  :title="articleDialog.title" :visible.sync="articleDialog.visible">
	{{articleDialog.form}}
  <el-form :model="articleDialog.form">

    <el-form-item label="推荐书目" label-width="120px">
      <el-input v-model="articleDialog.form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="书籍分类" label-width="120px">
      <el-select v-model="articleDialog.form.categoryId" placeholder="一级栏目">
        <el-option :key='index' v-for='(c,index) in categories' :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="列表样式" label-width="120px">
      <div class="list-style">
      	<div class="list-one" 
      	:class='{current:articleDialog.form.liststyle=="style-one"}' 
      	@clcik='articleDialog.form.liststyle="style-one"'>
      		<img src="@/assets/list-one.jpg">
      	</div>
      	<div class="list-two" 
      	:class='{current:articleDialog.form.liststyle=="style-two"}' 
      	@clcik='articleDialog.form.liststyle="style-two"'>
      		<img src="@/assets/list-two.jpg">
      	</div>
      </div>
    </el-form-item>
     <el-form-item label="缩略图" label-width="120px">
     	<el-upload
  action="http://47.107.41.55:8099/manager/file/upload" list-type="picture"
  :file-list="articleDialog.fileList"
  :on-success='handlerUploadSuccess'
  :on-remove='handleUploadRemove'>
  <el-button size="small" type="text">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  <el-form-item label="书评" label-width="120px">
      <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="articleDialog.form.content">
</el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button size='small' @click='closeArticleDialog'>取 消</el-button>
    <el-button type="primary" size='small' @click='saveOrUpdateArticle'>确 定</el-button>
  </div>
</el-dialog>
		<!-- 模态框结束 -->
	</div>
</template>
<script>
	import axios from '@/http/axios'
	import qs from 'qs'
	export default{
		data(){
			return{
				articles:[],
				categories:[],
				multipleSelection:[],
				articles:[],
				loading:false,
				total:0,
				
				params:{
				page:0,
				pageSize:10,
				categoryId:undefined,
				keywords:undefined,
				},
				articleDialog:{
					title:'',
					visible:false,
					content:'',
					form:{
						liststyle:'style-one',
						fileIds:[],
					}
				}
			}
		},
		created(){
				this.findAllArticles();
				this.findAllCategories();
			},
		methods:{
			closeArticleDialog(){
			/*this.ArticleDialog.form={};*/
			this.ArticleDialog.visible = false;
			},
			batchDeleteArticles(){
				let ids = this.multipleSelection.map((item)=>{
					return item.id;	
				})
				alert(ids);
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			saveOrUpdateArticle(){
				let url ='/manager/article/saveOrUpdateArticle';
				axios.post(url,this.articleDialog.form).then(({data:result})=>{
					if(result.status = 200){
						//关闭模态框
						this.closeArticleDialog();
						//提示成功
						this.$notify({
				          title: '成功',
				          message: result.message,
				          type: 'success'});
						
						this.findAllArticles();
					}else{
						this.$notify.error({
				          title: '错误',
				          message: '这是一条错误的提示消息'
				        });
					}
				}).catch((error)=>{
					this.$notify.error({
			          title: '错误',
			          message: '网络异常'
			        });
			        console.log(error);
				});
			},
			handleUploadRemove(file){
				//1.调用接口删除图片
				axios.get('/manager/file/delete',{params:{
					id:file.name
				}
			}).then(()=>{
				this.$notify({
					title:'成功',
					message:'操作成功'
				})
			

				//2.从filelist中移除
				_.remove(this.articleDialog.form.fileIds,(id)=>{
					return id == file.name
				});
				this.articleDialog.form.fileIds.push(1);
					this.articleDialog.form.fileIds.pop();
				}).catch(()=>{
					this.$notify.error({title:'错误', message:'网络异常'})
				})
			},
			handlerUploadSuccess(response,file,fileList){
				this.articleDialog.form.fileIds.pushs(response.data.id);			
			},
			toAddArticle(){
				this.articleDialog.form={
					liststyle:'style-one',
					fileIds:[]
				};
				this.articleDialog.title='添加推荐';
				this.articleDialog.visible=true;
			},
			toUpdateArticle(row){
				this.articleDialog.title='修改推荐';
				//显示模态框
				this.articleDialog.visible=true;
				
				//克隆当前行数据
				let article = _.cloneDeep(row);
				//处理默认附件显示
				this.articleDialog.fileList = article.articleFileVMs.map((item)=>{
					return{
						name:item.
						cmsFile.id,url:'http://39.108.81.60:8888/group1/'+item.cmsFile.id
					}
				})
				//处理表单数据
				//依赖栏目 category-->categoryId
				article.categoryId=article.category.id;
				delete article.category;
				//依赖文件  articleFileVMs-->fileIds
				article.fileIds=article.articleFileVMs.map(item=>item.cmsFile.id);
				delete article.articleFileVMs;
				//取消默认空值
				for(let key in article){
					let val  =article[key]
					if(!val){
						delete article[key];
					}
				}
				//将处理后的结果与表单双向绑定
				this.articleDialog.form=article;
				
			},
			handleCurrentChange(page){
				this.params.page = page-1;
			},
			//查询所有文章
			findAllArticles(){
				this.loading=true;
				let url='/manager/article/findArticle';
				axios.get(url,{
				params:this.params
				})
				.then(({data:result})=>{
					//将查询到的数据绑定到模型中
					this.articles = result.data.list;
					this.total = result.data.total;
				}).catch((error)=>{
					console.log('error',error);
				}).finally(()=>{
					this.loading=false;
				});
			},
			deleteArticle(id){
				this.$confirm('此操作将永久删除该文件，是否继续?','提示',{confirmButtonText:'确定',cancelButtonText:'取消',
					type:'warning'}).then(()=>{
						let url = '/manager/article/deleteArticleById?id='+id;
						axios.get(url).then(({data:result})=>{
							this.notify({
								title:'成功',
								message:result.message,
								type:'success'});
						}).catch(()=>{
							this.notify.error({
								title:'错误',
								message:'删除异常'
							});
							this.findAllArticles();
						})
						}).catch(()=>{

						});
			},
			closeArticleDialog(){
				this.articleDialog.form=[];
				this.articleDialog.visible=false;
			},
			findAllCategories(){
				let url='/manager/category/findAllCategory';
				axios.get(url)
				.then(({data:result})=>{
					//将查询到的数据绑定到模型中
					this.categories = result.data;
				}).catch((error)=>{
					this.$notify.error({
						title:'错误',
						message:'网络异常'
					})
				});
			}
		},
		watch:{
			//只要params中的任意参数发生改变就要刷新数据
			params:{
				handler:function(){
					this.findAllArticles();
				},
				deep:true
			}
		}
	}
</script>
<style scoped>
	.btns{
	margin-bottom: .5em;
}
i.fa{
	margin:0 .5em;
	cursor:pointer;
}
i.fa.fa-trash{
	color:#F56C6C;
}
.btns , .table{
	margin-left: 1em;
}
.table{
	margin-right: 1em;
}
.list-style{
	height: 100px;
}
.list-style>div{
	width: 200px;
	overflow-y:hidden;
	border: 1px solid #ccc;
	padding: .5em;
	border-radius: 5px;
	position: absolute;
	height: 100px;
}
.list-style img{
	width: 100%;
}
.list-style>div.list-one{
	float: left;
}
.list-style>div.list-two{
     margin-left: 220px;
}
.list-style>div.current{
	border-color: pink;
}
</style>

















<!-- <template>
	<div class="article">
		按钮区开始
		<div class="btns">
		<el-select v-model="obj.categoryId" placeholder="请选择" @change='findAllArticles'>
    <el-option
      v-for="item in categories"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
			<el-button size="small" @click=toAddArticle>添加</el-button>
			<el-button size="small">批量删除</el-button>
		</div>
		按钮区结束
		表格开始
		<div class="table" v-loading='loading'>
				<el-table
	      :data="articles" :border='true'
	      style="width: 100%">
	      <el-table-column
	        prop="title"
	        label="文章标题">
	      </el-table-column>
	      <el-table-column
	        prop="liststyle"
	        label="列表样式"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="status"
	        label="审核状态">
	      </el-table-column>
	      <el-table-column
	        prop="author"
	        label="作者">
	      </el-table-column>
	      <el-table-column
	        prop="publishtime"
	        label="发布时间">
	      </el-table-column>
	      <el-table-column
	        prop="readtimes"
	        label="阅读次数">
	      </el-table-column>
	      <el-table-column
	        prop="music"
	        label="背景音乐">
	      </el-table-column>
	      <el-table-column
	        label="操作" width='100px'>
	        <template slot-scope='{row}'>
	        	<i class="fa fa-trash" @clcik='deleteArticle(row.id)'></i>
	        	<i class="fa fa-pencil"></i>
	        </template>
	      </el-table-column>
	    </el-table>
		</div> 
		表格结束
		模态框开始
<el-dialog :title="articleDialog.title" :visible.sync="articleDialog.visible">{{articleDialog.form}}
  <el-form :model="articleDialog.form">
    <el-form-item label="文章标题" label-width="200px">
      <el-input v-model="articleDialog.form.title"></el-input>
    </el-form-item>
  <el-form-item label="所属栏目">
    <el-select v-model="articleDialog.form.status" placeholder="所属栏目">
      <el-option label="军事" value="shanghai"></el-option>
      <el-option label="娱乐" value="beij ing"></el-option>
    </el-select>
    </el-form-item>
      <el-form-item label="列表样式" label-width="200px">
      <el-input v-model="articleDialog.form.liststyle"></el-input>
    </el-form-item>
    <el-form-item label="正文" label-width="200px">
      <el-input v-model="articleDialog.form.fileId" type="textarea" :row="3"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button size='samll' @click=closeArticleDialog>取 消</el-button>
    <el-button size='samll' type="primary" @click=saveOrUpdateArticle>确 定</el-button>
  </div>
</el-dialog>
		模态框结束
	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default{
		data(){
			return{
				articles:[],
				loading:false,
				articleDialog:{
					title:'',
					form:{},
					visible:false
				},
				categories:[],
				obj:{
					categoryId:'',
					pageSize:1000,
					page:0
				}

			}
		},
		// created(){
		// 	//加载所有资讯信息
		// 	this.findAllArticles();
		// },
		mounted(){
			this.optioncategories();
		},
		methods:{
			optioncategories(){
				let url='/manager/category/findAllCategory';
				axios.get(url).then(({data:result})=>{
					this.categories=result.data;
				}).catch((error)=>{
					console.log('error',error);
				});
			},
			saveOrUpdateArticle(){
				let url ='/manager/article/saveOrUpdateArticle';
				axios.post(url,this.articleDialog.form).then(({data:result})=>{
					if(result.status == 200){
						//提示成功
						this.$notify({
				          title: '成功',
				          message: result.message,
				          type: 'success'});
						//关闭模态框
						this.findAllArticles();
					}else{
						this.$notify.error({
				          title: '错误',
				          message: '这是一条错误的提示消息'
				        });
					}
				}).catch((error)=>{
					this.$notify.error({
			          title: '错误',
			          message: '网络异常'
			        });
			        console.log(error);
				});
			},
			closeArticleDialog(){
				this.articleDialog.form={};
				this.articleDialog.visible=false;
			},
			findAllArticles(){
				this.loading=true;
				let url = '/manager/article/findArticle';
				axios.get(url,{params:this.obj}).then(({data:result})=>{
					//将查询到的数据绑定
					this.articles = result.data.list;
				}).catch((error)=>{
					console.log('error',error);
				}).finally(()=>{
					this.loading=false;
				});
			},
			deleteArticle(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		      }).then(()=>{
		      	let url='/manager/article/deleteArticleById?id='+id;
		      	axios.get(url).then(({data:result})=>{
		      		this.$notify({
				          title: '成功',
				          message: result.message,
				          type: 'success'});
		      	}).catch(()=>{
		      		this.$notify.error({
			          title: '错误',
			          message: '删除异常'
			        });
			        this.findAllArticles();
		      	})
		      }).catch(()=>{

		      });
			},
			toAddArticle(){
				this.articleDialog.visible = true;
				this.articleDialog.title='添加资讯';
			}
		}
	}
</script>
<style>
	.btns{
		margin:.5em 0 1em;
	}
	i.fa.fa-trash{
		color: red;
	}
	i.fa{
		margin:0 .5em;
		cursor: pointer;
	}
	.table{
		margin:.5em 1em;
	}
</style> -->