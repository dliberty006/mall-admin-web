<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="topic" :rules="rules" ref="topicFrom" label-width="150px">
      <el-form-item label="专题名称：" prop="topicName">
        <el-input v-model="topic.topicName"></el-input>
      </el-form-item>
      <el-form-item label="专题描述：">
        <el-input v-model="topic.topicDesc"></el-input>
      </el-form-item>
      <el-form-item label="专题链接：">
        <el-input v-model="topic.topicUrl"></el-input>
      </el-form-item>
      <el-form-item label="专题图片：" prop="topicImage">
        <single-upload v-model="topic.topicImage"></single-upload>
      </el-form-item>
      
      
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit('topicFrom')">保存</el-button>
        <el-button v-if="!isEdit" @click="resetForm('topicFrom')">重置</el-button>
        <el-button  @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTopic, getTopic, updateTopic} from '@/api/topic'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTopic={
    topicImage: '',
    topicName: '',
    topicDesc: '',
    topicUrl:'',
    showStatus: 0
  };
  export default {
    name: 'TopicDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        topic:Object.assign({}, defaultTopic),
        rules: {
          topicName: [
            {required: true, message: '请输入专题名称', trigger: 'blur'},
            {min: 1, max: 140, message: '长度在 1 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTopic(this.$route.query.id).then(response => {
          this.topic = response.topic;
        });
      }else{
        this.topic = Object.assign({},defaultTopic);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateTopic(this.$route.query.id, this.topic).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTopic(this.topic).then(response => {
                  this.$refs[formName].resetFields();
                  this.topic = Object.assign({},defaultTopic);
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
        this.topic = Object.assign({},defaultTopic);
      },
      back(){
        this.$router.back();
      }

    }
  }
</script>
<style>
</style>


