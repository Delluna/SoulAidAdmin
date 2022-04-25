const express = require('express')
const router = express.Router()
const mssqldb = require('../server/db')
const tableName = 'teacher_message'

//按姓名查询
router.get('/select:username',function(req,res,next){
    //params只有username的信息
    const params = req.query   //get对应params=req.query; post对应params=req.body
    var sql='select * from '+tableName+' where username = @username'
    mssqldb.querySql(sql,{username:params.username},function(err,result){
        let response ={
            status:200,
            data:{
                records:result.recordsets[0],
            }
        }
        if(err){
            console.log(err)
            response.status=500
        }
        console.log(response)
        return res.send(response)
    })
})

//分页查询用户信息  
router.get('/select',function(req,res,next){
    //params有两个参数： current,size
    const params = req.query   //get对应params=req.query; post对应params=req.body
    var current_row = (params.current-1) * params.size //起始记录: (current-1)*size   size
    var sql,total
    //查询所有记录个数 赋值给total
    sql ='select count(*) from '+tableName
    mssqldb.querySql(sql,{},function(err,result){
        if(err){
            console.log(err)
            return
        }else{
            console.log(result)
            total=JSON.stringify(result.recordset[0]).split(":")[1].split("}")[0]   //解决无法获取数字的问题
            total=JSON.parse(total)  //先转化为string再变为int
        }
    })
    //分页查询
    sql='select * from '+tableName+' order by id offset '+current_row+' rows fetch first '+params.size+' rows only'
    mssqldb.querySql(sql,{},function(err,result){
        if(err){
            console.log(err)
            return
        }
        let response ={
            status:200,
            data:{
                records:result.recordsets[0],
                current: JSON.parse(params.current),
                size: JSON.parse(params.size),  
                total:total 
            }
        }
        console.log(response)
        return res.send(response)
    })
})

//增加一行内容
router.post('/add',function(req,res,next){
    const params =req.body
    console.log(params)
    mssqldb.querySql('insert into '+tableName+'(username,password,tag) values(@username,@password,@tag)',{username:params.username,password:params.password,tag:params.tag},function(err,result){
        let response ={
            status:200
        }
        if(err){
            console.log(err)
            response.status=500
        }
        console.log(response)
        return res.send(response)
    })
})

//删除指定行
router.get('/delete',function(req,res,next){
    const params =req.query
    mssqldb.del('where id = @id',{id:params.id},tableName,function(err,result){
        if(err){
            console.log(err)
            return
        }
        let response ={
            status:200
        }
        console.log(response)
        return res.send(response)
    })
})

//更新指定行
router.post('/update',function(req,res,next){
    const params =req.body
    console.log(params)
    mssqldb.update({username : params.username,password: params.password,tag:params.tag},{id:params.id},tableName,function(err,result){
        let response ={
            status:200
        }
        if(err){
            console.log(err)
            response.status=500
        }
        console.log(response)
        return res.send(response)
    })
})
module.exports = router  //一定要写这行，否则报错