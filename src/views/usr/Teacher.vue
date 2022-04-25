<template>
  <div>
    <!--搜索框-->
    <el-form :inline="true" :model="searchForm" class="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.username" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchByName()">搜索</el-button>
        <el-button @click="showStatus=true,handleCurrentChange(1)">查看全部</el-button>
        <el-button type="primary" @click="dialogFormVisible = true,addOrUpdate=true">新增</el-button>
      </el-form-item>
    </el-form>

    <!--显示数据 -->
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border stripe  default-expand-all >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="password" label="密码" width="180"></el-table-column>
      <el-table-column prop="tag" label="擅长领域" width="180"></el-table-column>
      <el-table-column prop="control" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.username)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="delHandle(scope.row.id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
    <!--页码-->
    <el-pagination @size-change="handleSizeChange" @current-change= "handleCurrentChange" 
        :page-sizes="[10,20,30]"
        :current-page="current"
        :page-size="size"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"></el-pagination>

    <!--编辑对话框，可完成修改功能-->
    <el-dialog title="教师信息" :visible.sync="dialogFormVisible" width="600px" @closed="resetForm('editForm')">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <!-- <el-form-item label="ID" prop="id" label-width="100px">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="username" label-width="100px">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input v-model="editForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="擅长领域" prop="tag" label-width="100px">
          <el-input v-model="editForm.tag" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      tableData:[],
      searchForm:{
        username:''
      },
      editForm:{
        id:'',
        username:'',
        password: '',
        tag: ''
      },
      editFormRules:{
        name:[
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        tag:[
          { message: '请输入擅长领域（0-4）', trigger: 'blur'}
        ],
      },
      current:1,
      total:0,
      size:10,
      dialogFormVisible: false,
      addOrUpdate:true,
      showStatus:true
    };
  },
  methods:{
    //根据current,size获取所有数据
    getList(){
      let params={
        current: this.current,
        size: this.size
      }
      this.$axios.get('/api/teacher/select',{params:params}).then(res=>{
        var data=res.data.data
        this.tableData=data.records
        this.current=data.current
        this.size=data.size
        this.total=data.total
      })    
    },
  //获取对应数据填充到editForm中
    editHandle(username){     
      this.addOrUpdate=false;
      let params={
        username: username
      }
      console.log(params)
      this.$axios.get('/api/teacher/select:username',{params:params}).then(res=>{
        this.editForm=res.data.data.records[0]
      })
      this.dialogFormVisible=true;
    },
    //查询特定名称的记录
    searchByName(){
      if(this.showStatus==true){ //不管在当前在第几页，若为第一次搜索则重置为第一页,并设置showStatus为false表示处于搜索状态  只有点击按钮"查看全部"才会变为true
        this.current=1
        this.showStatus=false
      } 
      let params={
        username: this.searchForm.username
      }
      console.log(params)
      this.$axios.get('/api/teacher/select:username',{params:params}).then(res=>{
        this.tableData=res.data.data.records
      })
    },
     //增加或修改信息
    submitEditForm(formName){      
      this.$refs[formName].validate((valid)=>{            //验证表单是否符合标准
        if(valid){
          this.$axios.post('/api/teacher/'+(this.addOrUpdate?"add":"update"),this.editForm).then(res=>{
            if(res.data.status==200){
              this.getList(); 
            }else{
              this.$message({
              message:'操作失败',
              onClose:()=>{
                this.resetForm(formName)
              }
              })    
             }
             this.dialogFormVisible=false;
          })
        }else{
          this.$message.error("请按要求填写表格!")
          return false
        }
      }) 
    },
    delHandle(id){
      let params={
        id:id
      }
      this.$axios.get('/api/teacher/delete',{params:params}).then(res=>{
        if(res.data.status==200){
          this.getList() 
          //如果删除第一条数据，则需跳到前一页
          if(this.tableData.length==1){
            this.handleCurrentChange(this.current-1)
          }
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val){
      this.size=val;
      if(this.showStatus){
        this.getList();
      }else{
      this.getList();}
    },
    handleCurrentChange(val){
      this.current=val;
      if(this.showStatus){
        this.getList();
      }else{
      this.getList();}
    }
  },
  created(){
    this.getList()
  }
};
</script>