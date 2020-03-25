#!/usr/bin/env node
'use strict'
const program = require('commander');
program
    .version(require('../package').version )
program
    .usage('<command>')

require('../command/init')(program)

require('../command/test')(program)

// 作用是解析命令行参数argv
program.parse(process.argv)

// 处理参数和提供帮助信息
if(!program.args.length){
    program.help()
}

