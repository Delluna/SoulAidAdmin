<template>
  <el-menu
      :default-active="this.$store.state.menus.editableTabsValue"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({name: 'Index', title: '首页'})">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span>app内容管理</span>
      </template>
      <el-menu-item index="Article" @click="selectMenu({name: 'Article', title: '文章管理'})">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span slot="title">文章管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="Video" @click="selectMenu({name: 'Video', title: '视频管理'})">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span slot="title">视频管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="Exercise" @click="selectMenu({name: 'Exercise', title: '心理测试管理'})">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span slot="title">心理测试管理</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span>用户信息管理</span>
      </template>

      <el-menu-item index="User" @click="selectMenu({name: 'User', title: '学生信息'})">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>学生信息</span>
        </template>
      </el-menu-item>
       <el-menu-item index="Teacher" @click="selectMenu({name: 'Teacher', title: '教师信息'})">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>教师信息</span>
        </template>
      </el-menu-item>

       <!-- <el-menu-item index="Admin" @click="selectMenu({name: 'Admin', title: '管理员信息'})">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>管理员信息</span>
        </template>
      </el-menu-item> -->

       <el-menu-item index="Register" @click="selectMenu({name: 'Register', title: '注册申请'})">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>注册申请</span>
        </template>
      </el-menu-item>

    </el-submenu>

    <!--
    <el-submenu :index="menu.name" v-for="menu in menuList">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>

      <router-link :to="item.path" v-for="item in menu.children">
        <el-menu-item :index="item.name" @click="selectMenu(item)">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
        </el-menu-item>
      </router-link>

    </el-submenu>
    -->
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data(){
    return{

    }
  },
  computed:  {
    menuList: {
      get() {
        return this.$store.state.menus.menuList
      }
    }
  },
  methods: {
    selectMenu(item) {
      this.$store.commit("addTab", item)
      this.$router.push({name:item.name})
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    height: 100%;
  }
  a{
    text-decoration:none;
  }
</style>