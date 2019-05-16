<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productCate"
             :rules="rules"
             ref="productCateFrom"
             label-width="150px">
      <el-form-item label="分类名称：" prop="categoryName">
        <el-input v-model="productCate.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="分类编码：" prop="categoryCode">
        <el-input v-model="productCate.categoryCode"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：" prop="parentId">
          <!--<el-input v-model="productCate.parentName" :disabled="disable"></el-input>-->
        <el-select v-model="productCate.parentId" :filterable="true" placeholder="请选择">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类描述：" prop="categoryDesc">
        <el-input type="textarea" :autosize="true" v-model="productCate.categoryDesc"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model="productCate.sort"></el-input>
      </el-form-item>

      <el-form-item label="分类图标：" prop="categoryImage">
        <single-upload v-model="productCate.categoryImage"></single-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
        <el-button  @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createProductCate, updateProductCate, getProductCate,fetchAll} from '@/api/productCate';
  import {fetchListWithAttr} from '@/api/productAttrCate';
  import {getProductAttrInfo} from '@/api/productAttr';
  import SingleUpload from '@/components/Upload/singleUpload';

  const defaultProductCate = {
    categoryName: '',
    categoryCode: '',
    parentName:'',
    parentId:-1,
    sort: 0,
    categoryImage:''
  };
  export default {
    name: "ProductCateDetail",
    components: {SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        categoryList:[],
        productCate: Object.assign({}, defaultProductCate),
        parentCate:{},
        rules: {
          categoryName: [
            {required: true, message: '请输入类别名称', trigger: 'blur'},
            {min: 2, max: 125, message: '长度在 2 到 125 个字符', trigger: 'blur'}
          ]
        },
        disable:true
      }
    },
    created() {
      if (this.isEdit) {
        getProductCate(this.$route.query.id).then(response => {
          this.productCate = response.category;
          getProductCate(this.productCate.parentId).then(response => {
            this.parentCate = response.category;
          });
        });
      } else {
        getProductCate(this.$route.query.parentId).then(response => {
          this.parentCate = response.category;
          this.productCate = Object.assign({}, defaultProductCate);
          this.productCate.parentId = this.$route.query.parentId == -1?1:this.parentCate.id;
        });
      }

      fetchAll().then(response =>{
        this.categoryList = response.categoryList;
      })

    },
    methods: {
      back(){
        this.$router.back();
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateProductCate(this.$route.query.id, this.productCate).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createProductCate(this.productCate).then(response => {
                  this.$refs[formName].resetFields();
                  //this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      }

    },
    filters: {

    }
  }
</script>

<style scoped>

</style>
