const express = require('express')
const router = express.Router()
const mssqldb = require('../server/db')

router.get('/select',function(req,res,next){
    var sql='select * from register'
    mssqldb.querySql(sql,{},function(err,result){
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

//增加一行内容
router.post('/add',function(req,res,next){
    const params =req.body
    console.log(params)
    let sql=''
    if(params.userType==="user"){
        sql='insert into user_message(username,password) values(@username,@password)'
    }else{
        sql='insert into teacher_message(username,password) values(@username,@password)'
    }
    mssqldb.querySql(sql,{username:params.username,password:params.password},function(err,result){
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
    mssqldb.del('where id = @id',{id:params.id},"register",function(err,result){
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