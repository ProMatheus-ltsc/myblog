#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cp -r /home/coder/myblog/docs/.vuepress/dist/  /home/coder/matheusblog/
cd /home/coder/matheusblog/dist
# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

bash /home/coder/matheusblog/run.sh

