<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <div class="login-form">
        <h2>Soul Aid 管理员登录</h2>
        <el-image style="width: 180px;height: 150px" :src="require('../assets/app_logo.png')"></el-image>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form label-position="right" label-width="80px" :rules="rules" :model="loginForm" ref="loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<script>
  import qs from 'qs'
  export default {
    name:"Login",
    data(){
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules:{
          username:[{required:true,message:'请输入用户名',trigger:'blur'}],
          password:[{required:true,message:'请输入密码',trigger:'blur'}],
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$router.push('/index')
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res => {
        //       console.log(res)
        //       // const jwt=res.data
        //       // this.$store.commit('SET_TOKEN',jwt)
        //       this.$router.push('/index')
        //     }).catch(error => {
        //       console.log(error)
        //       console.log('error submint!!');
        //     })
        //   } else {
        //     console.log('error submint!!!');
        //     return false;
        //   }
        // })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-col{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
  }
  .el-row{
    height: 100%;
    background-color: #fafafa;
  }
  .el-divider{
    height: 200px;
  }

</style>