const express = require('express')
const router = express.Router()
const mssqldb = require('../server/db')
const tableName = 'home_content'

// //查询所有文章信息
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
    sql='select * from '+tableName+' order by contentId offset '+current_row+' rows fetch first '+params.size+' rows only'
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

//查询文章信息通过contentId 精确查询
router.get('/select_contentId',function(req,res,next){
    const params = req.query   //get对应params=req.query; post对应params=req.body
    var sql='select * from '+tableName+' where contentId = @contentId'
    console.log(sql)
    mssqldb.querySql(sql,{contentId:params.contentId},function(err,result){
        console.log(result)
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

//查询文章信息通过title 模糊查询  //可能会有很多数据
router.get('/select_title',function(req,res,next){
     //params有三个参数： title,current,size
     const params = req.query   //get对应params=req.query; post对应params=req.body
     var current_row = (params.current-1) * params.size //起始记录: (current-1)*size   size
     var sql,total
     var title = "%" + params.title + "%"
     //查询所有记录个数 赋值给total
     sql =`select count(*) from `+tableName+` where title like @title`
     mssqldb.querySql(sql,{title:title},function(err,result){
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
    sql =`select * from `+tableName+` where title like @title order by contentId offset `+current_row+` rows fetch first `+params.size+` rows only`
    mssqldb.querySql(sql,{title:title},function(err,result){
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

//增加一行内容,username不一定必需，所有需要分类
router.post('/add',function(req,res,next){
    const params =req.body
    console.log(params)
    var sql,cparams
    if(params.username==''){
        sql='insert into '+tableName+'(title,content) values(@title,@content)'
        cparams={
            title: params.title,
            content:params.content
        }

    }else{
        sql='insert into '+tableName+'(username,title,content) values(@username,@title,@content)'
        cparams={
            username:params.username,
            title: params.title,
            content:params.content
        }
    }
    mssqldb.querySql(sql,cparams,function(err,result){
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
    mssqldb.del('where contentId = @contentId',{contentId:params.contentId},tableName,function(err,result){
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

//更新指定行
router.post('/update',function(req,res,next){
    const params =req.body
    console.log(params)
    mssqldb.update({username : params.username,title: params.title,content:params.content},{contentId:params.contentId},tableName,function(err,result){
        let response ={
            status:200,
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