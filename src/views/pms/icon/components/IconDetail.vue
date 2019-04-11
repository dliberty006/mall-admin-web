<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="icon" :rules="rules" ref="iconFrom" label-width="150px">
      <el-form-item label="标题：" prop="iconTitle">
        <el-input v-model="icon.iconTitle"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="icon.iconDesc"></el-input>
      </el-form-item>
      <el-form-item label="文章链接：">
        <el-input v-model="icon.iconUrl"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <single-upload v-model="icon.iconImg"></single-upload>
      </el-form-item>
      <el-form-item label="标签：">
        <el-select
          v-model="icon.labels"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择标签">
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.labelName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    
      <el-form-item style="text-align:center">
        <el-button type="primary"  @click="onSubmit('iconFrom',20)">保存</el-button>
        <el-button type="info" v-if="!isEdit" @click="resetForm('iconFrom')">重置</el-button>
        <el-button  @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createIcon, getIcon, updateIcon} from '@/api/icon'
  import {getLabelList} from '@/api/label'
  import SingleUpload from '@/components/Upload/singleUpload'
  
  const defaultIcon={
    iconTitle: '',
    iconDesc: '',
    iconUrl: '',
    iconImg:'',
    labels:[]
  };
  export default {
    value: Object,
    name: 'IconDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        icon:Object.assign({}, defaultIcon),
        rules: {
          iconTitle: [
            {required: true, message: '请输入标题名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ]
        },
        labelList: [],
      }
    },
    created() {
      if (this.isEdit) {
        getIcon(this.$route.query.id).then(response => {
          this.icon = response.icon;
        });
      }else{
        this.icon = Object.assign({},defaultIcon);
      }
      getLabelList().then(response => {
        this.labelList = response.labelList;
      });
    },
    methods: {
      onSubmit(formName,status) {
        this.icon.iconStatus = status
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateIcon(this.$route.query.id, this.icon).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createIcon(this.icon).then(response => {
                  this.$refs[formName].resetFields();
                  this.icon = Object.assign({},defaultIcon);
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
        this.icon = Object.assign({},defaultIcon);
      },
      back(){
        this.$router.back();
      }

    }
  }
</script>
<style>
</style>


