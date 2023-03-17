# Elasticsearch-IK中文分词器
[[TOC]]

## 安装 ik 分词器

从 ik 分词器项目仓库中下载 ik 分词器安装包，**下载的版本需要与 Elasticsearch 版本匹配**：

https://github.com/medcl/elasticsearch-analysis-ik

或者可以访问 gitee 镜像仓库：

https://gitee.com/mirrors/elasticsearch-analysis-ik

下载 `elasticsearch-analysis-ik-7.9.3.zip` 复制到 `/root/` 目录下





### 在三个节点上安装 ik 分词器

```shell
cd ~/

# 复制 ik 分词器到三个 es 容器
docker cp elasticsearch-analysis-ik-7.9.3.zip node1:/root/
docker cp elasticsearch-analysis-ik-7.9.3.zip node2:/root/
docker cp elasticsearch-analysis-ik-7.9.3.zip node3:/root/

# 在 node1 中安装 ik 分词器
docker exec -it node1 elasticsearch-plugin install file:///root/elasticsearch-analysis-ik-7.9.3.zip

# 在 node2 中安装 ik 分词器
docker exec -it node2 elasticsearch-plugin install file:///root/elasticsearch-analysis-ik-7.9.3.zip

# 在 node3 中安装 ik 分词器
docker exec -it node3 elasticsearch-plugin install file:///root/elasticsearch-analysis-ik-7.9.3.zip

# 重启三个 es 容器
docker restart node1 node2 node3
```





### 查看安装结果

在浏览器中访问 http://192.168.64.181:9200/_cat/plugins

![a](https://img-blog.csdnimg.cn/20201118112736380.png#pic_center)





> 如果插件不可用，可以卸载后重新安装：
>
> ```shell
> docker exec -it node1 elasticsearch-plugin remove analysis-ik
> 
> docker exec -it node2 elasticsearch-plugin remove analysis-ik
> 
> docker exec -it node3 elasticsearch-plugin remove analysis-ik
>
> ```





## ik分词测试

ik分词器提供两种分词器： `ik_max_word` 和 `ik_smart`

`ik_max_word`: 会将文本做最细粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,中华人民,中华,华人,人民共和国,人民,人,民,共和国,共和,和,国国,国歌”，会穷尽各种可能的组合，适合 Term Query；

`ik_smart`: 会做最粗粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,国歌”，适合 Phrase 查询。





### `ik_max_word` 分词测试

使用 head 执行下面测试：
向 `http://192.168.64.181:9200/_analyze` 路径提交 `POST` 请求，并在协议体中提交 Json 数据：

```json
{
  "analyzer":"ik_max_word",
  "text":"中华人民共和国国歌"
}
```

![a](https://img-blog.csdnimg.cn/20201118110426319.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### `ik_smart` 分词测试

使用 head 执行下面测试：
向 `http://192.168.64.181:9200/_analyze` 路径提交 `POST` 请求，并在协议体中提交 Json 数据：

```json
{
  "analyzer":"ik_smart",
  "text":"中华人民共和国国歌"
}
```

![a](https://img-blog.csdnimg.cn/20201118112308424.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)