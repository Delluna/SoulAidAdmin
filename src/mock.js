const Mock=require('mockjs')

let Result={
    code:200,
    msg:'操作成功',
    data:null
}
Mock.mock(RegExp('/login*'),'post',()=>{
    console.log("mock------login")
    return Result
})

Mock.mock('/sys/userInfo', 'get', () => {
    Result.data = {
        id: "1",
        username: "admin",
    }
    return Result
})

Mock.mock('/logout', 'post', () => {

    return Result
})