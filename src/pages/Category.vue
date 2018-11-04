<template>
	<div class="category">
		<!-- 按钮区 -->
		<div class="btns">
		<el-button size='small' @click=toAddCategory>添加</el-button>
		<el-button size='small'  @click='batchDeleteCategories' >批量删除</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 表格开始 -->
		<div class="table" v-loading='loading'>
			 <el-table :border='true' size='small'
		      :data="categories"
		      style="width:100%"
		      @selection-change="handleSelectionChange">
		      <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
      <el-table-column
        prop="name"
        label="书籍分类">
      </el-table-column>
      <el-table-column
        prop="parent.name"
        label="所属类别">
      </el-table-column>
      <el-table-column
        label="描述" 
        prop='comment'>
      </el-table-column>
       <el-table-column
        label="操作" width='100px'>
        <template slot-scope='{row}'>
        	<i class="fa fa-trash" @click='deleteCategory(row.id)'></i>
        	<i class="fa fa-pencil" @click='toUpdateCategory(row)'></i>
        </template>
      </el-table-column>
    </el-table>
		</div>
		<!-- 表格结束 -->
		<!-- 模态框 -->
		<el-dialog :title="categoryDialog.title" :visible.sync="categoryDialog.visible">
			{{categoryDialog.form}}
  <el-form :model="categoryDialog.form">

    <el-form-item label="书籍分类" label-width="120px">
      <el-input v-model="categoryDialog.form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属类别" label-width="120px">
      <el-select v-model="categoryDialog.form.parentId" placeholder="一级栏目">
        <el-option v-for='c in categories' :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
  <el-form-item label="描述信息" label-width="120px">
      <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="categoryDialog.form.comment">
</el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button size='small' @click=closeCategoryDialog>取 消</el-button>
    <el-button type="primary" size='small' @click=saveOrUpdateCategory>确 定</el-button>
  </div>
</el-dialog>
	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default{
		data(){
			return{
				msg:'hello',
				categories:[],
				loading:false,
				categoryDialog:{
					title:'',
					form:{},
					visible:false
				}
			}
		},
		created(){
			//加载所有栏目信息
			this.findAllCategories();
		},
		methods:{
			toUpdateCategory(row){
				this.categoryDialog.title='修改栏目';
				this.categoryDialog.visible=true;
				let category = _.cloneDeep(row);
				this.categoryDialog.fileList = category.categoryFileVMs.map((item)=>{
					return{
						name:item.cmsFile.id,url:'http://39.108.81.60:8888/group1/'+item.cmsFile.id
					}
				})
				categoryId = category.parentId;
				/*delete category;*/
				category.fileIds = category.categoryFileVMs.map(item=>item.cmsFile.id);
				delete category.categoryFileVMs;
				for(let key in article){
					let val = category[key]
					if(!val){
						delete category[key];
					}
				}
				this.categoryDialog.form = category;
			},
			batchDeleteCategories(){
				let ids = this.multipleSelection.map((item)=>{
					return item.id;	
				})
				alert(ids);
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			/*todeleteCategory(){
				this.deleteCategory.visible=true;
			},*/
			deleteCategory(id){
				 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(()=>{
		        	let url='/manager/category/deleteCategoryById?id='+id;
		        	axios.get(url)
		        	.then(({data:result})=>{
		        	this.$notify({
				          title: '成功',
				          message: result.message,
				          type: 'success'});
				          
		        	}).catch(()=>{
		        		this.$notify.error({
			          title: '错误',
			          message: '删除异常'
			        });
		        		this.findAllCategories();	
		        	})
		        }).catch(()=>{
		        	
		        });
			},
			saveOrUpdateCategory(){
				let url='/manager/category/saveOrUpdateCategory';
				axios.post(url,this.categoryDialog.form).then(({data:result})=>{
					if(result.status == 200){
						//1.提升成功
						 this.$notify({
				          title: '成功',
				          message: result.message,
				          type: 'success'});
						 //2.关闭模态框
						this.findAllCategories();
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
			closeCategoryDialog(){
			this.categoryDialog.form={};
			this.categoryDialog.visible = false;
			},
			toAddCategory(){
				this.categoryDialog.visible = true;
				this.categoryDialog.title='添加分类';
			},
			//查询所有栏目
			findAllCategories(){
				this.loading=true;
				let url='/manager/category/findAllCategory';
				axios.get(url).then(({data:result})=>{
					//将查询到的数据绑定到模型中
					this.categories = result.data;
				}).catch((error)=>{
					console.log('error',error);
				}).finally(()=>{
					this.loading=false;
				});
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
		color: #F56C6C;
	}
	.btns , .table{
		margin-left: 1em;
	}
	.table{
		margin-right: 1em;
	}
</style>