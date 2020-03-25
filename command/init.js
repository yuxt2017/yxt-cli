const clone = require('git-clone')
const fs= require('fs')
const shell = require('shelljs');
const log = require('tracer').colorConsole()
const inquirer = require('inquirer')
/*
*inquirer功能简介
*		input–输入
*		validate–验证
*		list–列表选项
*		confirm–提示
*		checkbox–复选框等等
*/

module.exports = (program) => {
    program
        .command('init [project]')
        .description('get a template')
        .alias('i')
        .option('-p --pc', 'pc')
        .option('-h --h5', 'h5')
        .action((project, cmd) => {
            log.info('pc or h5; example：yxt-cli init myproject --pc | --h5')

            var promps = [];
            if (project == undefined || project == null) {
                promps.push({
                    type: 'input',
                    name: 'project',
                    message: 'please enter a name of your project',
                    validate: function (input) {
                        if (input) {
                            return true
                        } else {
                            return 'project name cannot be empty'
                        }
                    }
                })
            }

            inquirer.prompt(promps).then((answers) => {
                let projectName = project || answers.project
                let pwd = shell.pwd()
                let url;
                if(cmd.pc){
                    url = `https://github.com/yuxt2017/web-front.git`;
                }else{
                    url = `https://github.com/yuxt2017/h5-front.git`;
                }
                log.info(`start pull ${url}...`)
                fs.exists(`${projectName}`, (fileExists) => {
                    if(!fileExists) {
                        clone(url, pwd + `/${projectName}`, null, function() {
                            shell.rm('-rf', pwd + `/${projectName}/.git`)
                            shell.cd(`${projectName}`);
                            log.info(`npm install...`)
                            if (shell.exec('npm i').code !== 0) {
                                shell.echo('Error: npm i failed'); // 输出内容
                                shell.exit(1); // 退出
                            } else {
                                log.info('done success')
                            }
                        })
                    } else {
                        log.error('The folder already exists')
                    }
                });
            })
        })
}