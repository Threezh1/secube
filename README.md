# secube

secube安全导航地址：https://threezh1.com/secube/index.html
secube是一个安全信息导航，其中包含了各大信息安全论坛以及信息安全相关的最新文章。

## process

开始是为了练习golang的grpc，就把之前写的爬虫后端基本完全重构了(数据交互可以用grpc完成，爬虫还是用的老的，太懒了哈哈哈)。

整个信息流的框架如下图，secube也就是属于数据展示端。

![image](https://user-images.githubusercontent.com/45116144/114752712-2f9f9500-9d89-11eb-9bc7-5094dc74b7a6.png)

主题使用了：[WebStackPage.github.io](https://github.com/WebStackPage/WebStackPage.github.io) 由于比较懒就把框架改成了从js中生成文章结构。

## problem

1. 信息流暂时还没法用，如果你想用可以安装一下这个仓库里面的pem证书再打开网址就可以收到信息流了。
   1. windows下参考Burpsuite的证书安装
   2. mac下双击证书安装，打开钥匙串，双击secube证书，选择全部信任即可
2. 后续会增加微信文章、twitter的信息流

## other

目前前端只是一个demo，后续会花时间慢慢完善...
