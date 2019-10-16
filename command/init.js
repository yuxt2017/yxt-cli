'use strict'
const exec = require('child_process').exec
const projectUrl = 'https://github.com/yuxt2017/y-template.git'

module.exports = () => {
    console.log('start command')

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone `+projectUrl

    // console.log(process)

    // 在nodejs中执行shell命令，第一个参数是命令，第二个是具体的回调函数
    exec(cmdStr, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            process.exit()
        }
        console.log('pull success')
        process.exit()
    })

}
