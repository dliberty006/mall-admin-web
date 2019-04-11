<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="label" :rules="rules" ref="labelFrom" label-width="150px">
      <el-form-item label="标签名称：" prop="labelName">
        <el-input v-model="label.labelName"></el-input>
      </el-form-item>
      <el-form-item label="标签描述：">
        <el-input v-model="label.labelDesc"></el-input>
      </el-form-item>
      <el-form-item label="标签图标：" prop="labelImage">
        <single-upload v-model="label.labelImage"></single-upload>
      </el-form-item>
      
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit('labelFrom')">保存</el-button>
        <el-button v-if="!isEdit" @click="resetForm('labelFrom')">重置</el-button>
        <el-button  @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createLabel, getLabel, updateLabel} from '@/api/label'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultLabel={
    labelImage: '',
    labelName: '',
    labelDesc: '',
    showStatus: 0
  };
  export default {
    name: 'LabelDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        label:Object.assign({}, defaultLabel),
        rules: {
          labelName: [
            {required: true, message: '请输入标签名称', trigger: 'blur'},
            {min: 1, max: 140, message: '长度在 1 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getLabel(this.$route.query.id).then(response => {
          this.label = response.label;
        });
      }else{
        this.label = Object.assign({},defaultLabel);
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
                updateLabel(this.$route.query.id, this.label).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createLabel(this.label).then(response => {
                  this.$refs[formName].resetFields();
                  this.label = Object.assign({},defaultLabel);
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
        this.label = Object.assign({},defaultLabel);
      },
      back(){
        this.$router.back();
      }

    }
  }
</script>
<style>
</style>


