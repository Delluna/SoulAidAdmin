const UserApi = require('../api/user')
const TeacherApi = require('../api/teacher')
const ArticleApi = require('../api/article')
const VideoApi = require('../api/video')
const ExerciseApi = require('../api/exercise')

const bodyParser =  require('body-parser')
const express = require('express')
const app = express();

//解决跨域问题
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if(req.method.toLowerCase()=='options')
        res.sendStatus(200)
    else
        next();
})

//以json格式返回
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//后端api路由
app.use('/api/user',UserApi)
app.use('/api/teacher',TeacherApi)
app.use('/api/article',ArticleApi)
app.use('/api/video',VideoApi)
app.use('/api/exercise',ExerciseApi)

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('应用实例，访问地址为 http:// '+host+':'+port)
  })