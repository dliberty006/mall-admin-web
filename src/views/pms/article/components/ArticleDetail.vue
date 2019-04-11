<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="article" :rules="rules" ref="articleFrom" label-width="150px">
      <el-form-item label="标题：" prop="articleTitle">
        <el-input v-model="article.articleTitle"></el-input>
      </el-form-item>
      <el-form-item label="副标题：">
        <el-input v-model="article.articleSubTitle"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="articleAuth">
        <el-input v-model="article.articleAuth"></el-input>
      </el-form-item>
      <el-form-item label="文章链接：">
        <el-input v-model="article.articleLink"></el-input>
      </el-form-item>
      <el-form-item label="封片图片：" prop="articleCoverImg">
        <single-upload v-model="article.articleCoverImg"></single-upload>
      </el-form-item>
      <el-form-item label="文章内容：" prop="articleContent">
            <vue-ueditor-wrap v-model="article.articleContent" :config="myConfig" ></vue-ueditor-wrap>
      </el-form-item>
    
      <el-form-item style="text-align:center">
        <el-button type="primary"  @click="onSubmit('articleFrom',20)">保存</el-button>
        <el-button type="info" v-if="!isEdit" @click="resetForm('articleFrom')">重置</el-button>
        <el-button  @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createArticle, getArticle, updateArticle} from '@/api/article'
  import SingleUpload from '@/components/Upload/singleUpload'
 import VueUeditorWrap from 'vue-ueditor-wrap'
  const defaultArticle={
    articleTitle: '',
    articleSubTitle: '',
    articleAuth: '',
    articleLink:'',
    articleContent:'',
    articleCoverImg: ''
  };
  export default {
    value: Object,
    name: 'ArticleDetail',
    components:{SingleUpload,VueUeditorWrap},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isClear :false,
        article:Object.assign({}, defaultArticle),
        rules: {
          articleTitle: [
            {required: true, message: '请输入标题名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
           articleAuth: [
            {required: true, message: '请输入作者名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          articleCoverImg: [
            {required: true, message: '请上传封面图片', trigger: 'blur'}
          ],
          articleContent:[
            {required: true, message: '请输入内容', trigger: 'blur'}
          ]

        },
        myConfig: {
          // 初始容器高度
          initialFrameHeight: 340,
          // 初始容器宽度
          initialFrameWidth: '100%'
          
        }
      }
    },
    created() {
      if (this.isEdit) {
        getArticle(this.$route.query.id).then(response => {
          this.article = response.article;
        });
      }else{
        this.article = Object.assign({},defaultArticle);
      }
    },
    methods: {
      onSubmit(formName,status) {
        this.article.articleStatus = status
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateArticle(this.$route.query.id, this.article).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createArticle(this.article).then(response => {
                  this.$refs[formName].resetFields();
                  this.article = Object.assign({},defaultArticle);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                   this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.article = Object.assign({},defaultArticle);
      },
      back(){
        this.$router.back();
      }

    }
  }
</script>
<style>
.form-container{z-index: 100}
</style>


