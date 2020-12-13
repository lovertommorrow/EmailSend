const nodeMailer = require('nodemailer');
const {default:Axios}=require('axios')
const schedule = require('node-schedule')
//发送邮件功能
async function sendMail(text){
    let user = "xxx@qq.com";//自己邮箱
    let pass = "qdixrjbuzpzrbieg";//邮箱授权码
    let to = "xx@163.com";//收去对方邮箱
    let subject = "测试"
    let transport = nodeMailer.createTransport({
        host:'smtp.qq.com',
        port:587,
        source:false,
        auth:{
            user:user,
            pass:pass
        }
    });
    let info = await transport.sendMail({
        from:`${user}`,
        to:`${to}`,
        subject:`${subject}`,
        text:text
    })

    console.log('发送成功')
}
//获取网络情话
function getHoneyedWord(){
    let url = "https://chp.shadiao.app/api.php";
    return Axios.get(url)
}
//定时任务
schedule.scheduleJob({hour:22,minute:30},()=>{
    console.log('启动任务：'+new Date());
    getHoneyedWord().then(res=>{
        console.log(res.data)
        sendMail(res.data)
    })

})

// 
getHoneyedWord().then(res=>{
    console.log(res.data)
    sendMail(res.data)
})
