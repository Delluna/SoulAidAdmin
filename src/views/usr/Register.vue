<template>
  <div>
    <!--显示数据 -->
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border stripe  default-expand-all >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="password" label="密码" width="180"></el-table-column>
      <el-table-column prop="userType" label="用户类型" width="180"></el-table-column>
      <el-table-column prop="control" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="agreeHandle(scope.row.id,scope.row.username,scope.row.password,scope.row.userType)">同意</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="delHandle(scope.row.id)">拒绝</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      tableData:[],
      dialogFormVisible: false
    };
  },
  methods:{
    getList(){
      this.$axios.get('/api/register/select').then(res=>{
        var data=res.data.data
        this.tableData=data.records
      })    
    },
    agreeHandle(id,username,password,userType){
      let params={
        username:username,
        password:password,
        userType:userType
      }
      console.log(params)
       this.$axios.post('/api/register/add',params).then(res=>{
            if(res.data.status==200){
              this.getList(); 
              this.delHandle(id)
            }
          })
    },
    delHandle(id){
      let params={
        id:id
      }
      this.$axios.get('/api/register/delete',{params:params}).then(res=>{
        if(res.data.status==200){
          this.getList()
        }
      })
    }
  },
  created(){
    this.getList()
  }
  
};
</script>