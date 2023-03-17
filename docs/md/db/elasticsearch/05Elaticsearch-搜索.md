# Elaticsearch-搜索
[[TOC]]

## 导入测试数据

为了测试搜索功能，我们首先导入测试数据，3160条商品数据，数据样例如下：



```json
{ "index": {"_index": "pditems", "_id": "536563"}}
{ "id":"536563","brand":"联想","title":"联想(Lenovo)小新Air13 Pro 13.3英寸14.8mm超轻薄笔记本电脑","sell_point":"清仓！仅北京，武汉仓有货！","price":"6688.0","barcode":"","image":"/images/server/images/portal/air13/little4.jpg","cid":"163","status":"1","created":"2015-03-08 21:33:18","updated":"2015-04-11 20:38:38"}
```





### 下载测试数据

https://download.csdn.net/download/weixin_38305440/13129113

将压缩文件中的 `pditems.json` 上传到服务器





### 创建索引和映射

```json
PUT /pditems
{
  "settings": {
    "number_of_shards": 3, 
    "number_of_replicas": 2
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "long"
      },
      "brand": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "title": {
        "type": "text",
        "analyzer": "ik_max_word"
      },
      "sell_point": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "price": {
        "type": "float"
      },
      "image": {
        "type": "keyword"
      },
      "cid": {
        "type": "long"
      },
      "status": {
        "type": "byte"
      },
      "created": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "updated": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      }
    } 
  }
}

```

用 head 查看索引：

![a](https://img-blog.csdnimg.cn/20201120104623771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 导入数据

在服务器上，进入 `pditems.json` 所在的文件夹，执行批量数据导入：

```shell
curl -XPOST 'localhost:9200/pditems/_bulk' \
    -H 'Content-Type:application/json' \
    --data-binary @pditems.json

```





### 查看数据

搜索 `pditems` 索引中全部 3160 条数据：

```json
GET /pditems/_search
{
  "query": {
    "match_all": {}
  },
  "size": 3160
}

```





## 搜索文档





### 搜索所有数据

```json
# 搜索 pditems 索引中全部数据
POST /pditems/_search
{
  "query": {
    "match_all": {}
  }
}
```





### 关键词搜索

```json
# 查询 pditems 索引中title中包含"电脑"的商品
POST /pditems/_search
{
  "query": {
    "match": {
      "title": "电脑"
    }
  }
}
```





### 搜索结果过滤器

```json
# 价格大于2000，并且title中包含"电脑"的商品
POST /pditems/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "电脑"
          }
        }
      ],

      "filter": [
        {
          "range": {
            "price": {
              "gte": "2000"
            }
          }
        }
      ]
    }
  }
}

```





### 搜索结果高亮显示

```json
POST /pditems/_search
{
	"query": {
		"multi_match":{
			"query": "手机",
			"fields": ["title", "sell_point"]
		}
	},
	"highlight" : {
        "pre_tags" : ["<i class=\"highlight\">"],
        "post_tags" : ["</i>"],
        "fields" : {
            "title" : {},
            "sell_point" : {
              "pre_tags": "<em>",
              "post_tags": "</em>"
            }
        }
    }
}
```