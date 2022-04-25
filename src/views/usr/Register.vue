<template>
  <div>
    <!--搜索框-->
    <el-form :inline="true" :model="searchForm" class="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">搜索</el-button>
      </el-form-item>
    </el-form>

    <!--显示数据 -->
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border stripe  default-expand-all >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      
      <el-table-column prop="control" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="切丁要删除这条记录吗？" @confirm="delHandle(scope.row.id)">
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
    <el-dialog title="文章" :visible.sync="dialogFormVisible" width="600px" @closed="resetForm('editForm')">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="ID" prop="id" label-width="100px">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
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
      tableData:[{
        id:1,
      
      }],
      searchForm:{
        name:''
      },
      editForm:{
        id:'',
     
      },
      editFormRules:{
        id:[
          {required: true, message: '请输入ID', trigger: 'blur'}
        ],
      },
      current:1,
      total:0,
      size:10,
      dialogFormVisible: false
    };
  },
  methods:{
    getList(){
     
    },
    editHandle(id){
      this.dialogFormVisible=true;

    },
    delHandle(id){

    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  },
  created(){
    this.getList()
  }
  
};
</script>