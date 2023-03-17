# Elasticsearch-增删改查API

[[TOC]]

## Spring Data Elasticsearch

https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#reference

Spring Data Elasticsearch 是 Elasticsearch 搜索引擎开发的解决方案。它提供：

模板对象，用于存储、搜索、排序文档和构建聚合的高级API。

例如，`Repository` 使开发者能够通过定义具有自定义方法名称的接口来表达查询。





## 案例说明

在 Elasticsearch 中存储学生数据，并对学生数据进行搜索测试。



**数据结构：**

| 学号 | 姓名 | 性别 | 出生日期  |
| ---- | ---- | ---- | --------- |
| 27   | 张三 | 男   | 2020-12-4 |



**案例测试以下数据操作：**

1. 创建 students 索引和映射
2. C - 创建学生数据
3. R - 访问学生数据
4. U - 修改学生数据
5. D - 删除学生数据
6. 使用 Repository 和 Criteria 搜索学生数据





## 创建项目



1. **新建工程**
   
   ![a](https://img-blog.csdnimg.cn/20201217100115448.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

   ![a](https://img-blog.csdnimg.cn/20201217100158364.png#pic_center)

   

2. **新建 springboot module，添加 spring data elasticsearch 依赖**
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201217100236856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

   ![a](https://img-blog.csdnimg.cn/20201217100336668.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

   ![a](https://img-blog.csdnimg.cn/20201217100406325.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

   ![a](https://img-blog.csdnimg.cn/20201217100421976.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

   

**项目的 pom.xml 文件如下：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.3.6.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>cn.tedu</groupId>
	<artifactId>es-springboot</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>es-springboot</name>
	<description>Demo project for Spring Boot</description>

	<properties>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-elasticsearch</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

```





## application.yml 配置

`logging.level.tracer=TRACE` 作用是在控制台中显示底层的查询日志

```yml
spring:
  elasticsearch:
    rest:
      uris: http://192.168.64.181:9200

logging:
  level:
    tracer: TRACE
```





## Student 实体类

```java
package cn.tedu.esspringboot.es;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "students",shards = 3,replicas = 2)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    private Long id;

    @Field(analyzer = "ngram",type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Keyword)
    private Character gender;

    @Field(type= FieldType.Date,format = DateFormat.custom,pattern = "yyyy-M-d")
    private String birthDate;
}

```

### @Document 注解

@Documnet注解对索引的参数进行设置。

上面代码中，把 students 索引的分片数设置为3，副本数设置为2。

### @Id 注解

在 Elasticsearch 中创建文档时，使用 @Id 注解的字段作为文档的 `_id` 值

### @Field 注解

通过 @Field 注解设置字段的数据类型和其他属性。

### 文本类型 text 和 keyword

text 类型会进行分词。

keyword 不会分词。

### analyzer 指定分词器

通过 analyzer 设置可以指定分词器，例如 ik_smart、ik_max_word 等。

我们这个例子中，对学生姓名字段使用的分词器是 ngram 分词器，其分词效果如下面例子所示：

| 字符串 | 分词结果                  |
| ------ | ------------------------- |
| 刘德华 | 刘 刘德 刘德华 德 德华 华 |





## 通过 ElasticsearchRepository 实现 CRUD 操作

Spring Data 的 Repository 接口提供了一种声明式的数据操作规范，无序编写任何代码，只需遵循 Spring Data 的方法定义规范即可完成数据的 CRUD 操作。

ElasticsearchRepository 继承自 Repository，其中已经预定义了基本的 CURD 方法，我们可以通过继承 ElasticsearchRepository，添加自定义的数据操作方法。





### Repository 方法命名规范

自定义数据操作方法需要遵循 Repository 规范，示例如下：

| 关键词                                      | 方法名                             | es查询                                                       |
| ------------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| And                                         | findByNameAndPrice                 | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “?”, “fields” : [ “name” ] } }, { “query_string” : { “query” : “?”, “fields” : [ “price” ] } } ] } }} |
| Or                                          | findByNameOrPrice                  | { “query” : { “bool” : { “should” : [ { “query_string” : { “query” : “?”, “fields” : [ “name” ] } }, { “query_string” : { “query” : “?”, “fields” : [ “price” ] } } ] } }} |
| Is                                          | findByName                         | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “?”, “fields” : [ “name” ] } } ] } }} |
| Not                                         | findByNameNot                      | { “query” : { “bool” : { “must_not” : [ { “query_string” : { “query” : “?”, “fields” : [ “name” ] } } ] } }} |
| Between                                     | findByPriceBetween                 | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : ?, “to” : ?, “include_lower” : true, “include_upper” : true } } } ] } }} |
| LessThan                                    | findByPriceLessThan                | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : null, “to” : ?, “include_lower” : true, “include_upper” : false } } } ] } }} |
| LessThanEqual                               | findByPriceLessThanEqual           | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : null, “to” : ?, “include_lower” : true, “include_upper” : true } } } ] } }} |
| GreaterThan                                 | findByPriceGreaterThan             | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : ?, “to” : null, “include_lower” : false, “include_upper” : true } } } ] } }} |
| GreaterThanEqual                            | findByPriceGreaterThan             | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : ?, “to” : null, “include_lower” : true, “include_upper” : true } } } ] } }} |
| Before                                      | findByPriceBefore                  | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : null, “to” : ?, “include_lower” : true, “include_upper” : true } } } ] } }} |
| After                                       | findByPriceAfter                   | { “query” : { “bool” : { “must” : [ {“range” : {“price” : {“from” : ?, “to” : null, “include_lower” : true, “include_upper” : true } } } ] } }} |
| Like                                        | findByNameLike                     | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “?*”, “fields” : [ “name” ] }, “analyze_wildcard”: true } ] } }} |
| StartingWith                                | findByNameStartingWith             | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “?*”, “fields” : [ “name” ] }, “analyze_wildcard”: true } ] } }} |
| EndingWith                                  | findByNameEndingWith               | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “*?”, “fields” : [ “name” ] }, “analyze_wildcard”: true } ] } }} |
| Contains/Containing                         | findByNameContaining               | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “*?*”, “fields” : [ “name” ] }, “analyze_wildcard”: true } ] } }} |
| In (when annotated as FieldType.Keyword)    | findByNameIn(Collectionnames)      | { “query” : { “bool” : { “must” : [ {“bool” : {“must” : [ {“terms” : {“name” : ["?","?"]}} ] } } ] } }} |
| In                                          | findByNameIn(Collectionnames)      | { “query”: {“bool”: {“must”: [{“query_string”:{“query”: “”?" “?”", “fields”: [“name”]}}]}}} |
| NotIn (when annotated as FieldType.Keyword) | findByNameNotIn(Collectionnames)   | { “query” : { “bool” : { “must” : [ {“bool” : {“must_not” : [ {“terms” : {“name” : ["?","?"]}} ] } } ] } }} |
| NotIn                                       | findByNameNotIn(Collectionnames)   | {“query”: {“bool”: {“must”: [{“query_string”: {“query”: “NOT(”?" “?”)", “fields”: [“name”]}}]}}} |
| Near                                        | findByStoreNear                    | Not Supported Yet !                                          |
| True                                        | findByAvailableTrue                | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “true”, “fields” : [ “available” ] } } ] } }} |
| False                                       | findByAvailableFalse               | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “false”, “fields” : [ “available” ] } } ] } }} |
| OrderBy                                     | findByAvailableTrueOrderByNameDesc | { “query” : { “bool” : { “must” : [ { “query_string” : { “query” : “true”, “fields” : [ “available” ] } } ] } }, “sort”:[{“name”:{“order”:“desc”}}] } |





### StudentRepository

```java
package cn.tedu.esspringboot.es;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface StudentRepository extends ElasticsearchRepository<Student, Long> {
    List<Student> findByName(String name);

    List<Student> findByNameOrBirthDate(String name, String birthDate);
}

```





### 业务类 StudentService

```java
package cn.tedu.esspringboot.es;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepo;

    public void save(Student student) {
        studentRepo.save(student);
    }

    public void delete(Long id) {
        studentRepo.deleteById(id);
    }

    public void update(Student student) {
        save(student);
    }

    public List<Student> findByName(String name) {
        return studentRepo.findByName(name);
    }

    public List<Student> findByNameOrBirthDate(String name, String birthDate) {
        return studentRepo.findByNameOrBirthDate(name, birthDate);
    }
}

```





### 在 Elasticsearch 中创建 students 索引

在开始运行测试之前，在 Elasticsearch 中先创建 students 索引：

```json
PUT /students
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2,
    "index.max_ngram_diff":30,
    "analysis": {
      "analyzer": {
        "ngram_analyzer": {
          "tokenizer": "ngram_tokenizer"
        }
      },
      "tokenizer": {
        "ngram_tokenizer": {
          "type": "ngram",
          "min_gram": 1,
          "max_gram": 30,
          "token_chars": [
            "letter",
            "digit"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "long"
      },
      "name": {
        "type": "text",
        "analyzer": "ngram_analyzer"
      },
      "gender": {
        "type": "keyword"
      },
      "birthDate": {
        "type": "date",
        "format": "yyyy-MM-dd"
      }
    }
  }
}

```





### 测试学生数据的 CRUD 操作

添加测试类，对学生数据进行 CRUD 测试

```java
package cn.tedu.esspringboot;

import cn.tedu.esspringboot.es.Student;
import cn.tedu.esspringboot.es.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class Test1 {
    @Autowired
    private StudentService studentService;

    @Test
    public void test1() {
        studentService.save(new Student(998L,"张三",'男',"2020-12-04"));
    }
    @Test
    public void test2() {
        studentService.update(new Student(1L,"李四",'女',"2020-12-04"));
    }
    @Test
    public void test3() {
        List<Student> stu = studentService.findByName("四");
        System.out.println(stu);
    }
    @Test
    public void test4() throws Exception {
        List<Student> stu;

        stu = studentService.findByNameOrBirthDate("四", "1999-09-09");
        System.out.println(stu);

        stu = studentService.findByNameOrBirthDate("SFSDFS", "2020-12-04");
        System.out.println(stu);
    }
}

```

依次运行每个测试方法，并使用 head 观察测试结果

![a](https://img-blog.csdnimg.cn/20201217143715432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



## 使用 Criteria 构建查询

Spring Data Elasticsearch 中，可以使用 SearchOperations 工具执行一些更复杂的查询，这些查询操作接收一个 Query 对象封装的查询操作。

Spring Data Elasticsearch 中的 Query 有三种：

- CriteriaQuery
- StringQuery
- NativeSearchQuery

多数情况下，CriteriaQuery 都可以满足我们的查询求。下面来看两个 Criteria 查询示例：





### StudentSearcher

```java
package cn.tedu.esspringboot.es;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class StudentSearcher {
    @Autowired
    private ElasticsearchOperations searchOperations;

    public List<Student> searchByBirthDate(String birthDate) {
        Criteria c = new Criteria("birthDate").is(birthDate);
        return criteriaSearch(c);
    }

    public List<Student> searchByBirthDate(String ge, String le) {
        Criteria c = new Criteria("birthDate").between(ge, le);
        return criteriaSearch(c);
    }

    private List<Student> criteriaSearch(Criteria c) {
        CriteriaQuery q = new CriteriaQuery(c);
        SearchHits<Student> hits = searchOperations.search(q, Student.class);
        List<Student> list = hits.stream().map(SearchHit::getContent).collect(Collectors.toList());
        return list;
    }
}

```





### 修改 StudentService

在 StudentService 中，调用 StudentSearcher，执行查询：

```java
package cn.tedu.esspringboot.es;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private StudentSearcher studentSearcher;

    public void save(Student student) {
        studentRepo.save(student);
    }

    public void delete(Long id) {
        studentRepo.deleteById(id);
    }

    public void update(Student student) {
        save(student);
    }

    public List<Student> findByName(String name) {
        return studentRepo.findByName(name);
    }

    public List<Student> findByNameOrBirthDate(String name, String birthDate) {
        return studentRepo.findByNameOrBirthDate(name, birthDate);
    }

    public List<Student> findByBirthDate(String birthDate) {
        return studentSearcher.searchByBirthDate(birthDate);
    }

    public List<Student> findByBirthDate(String ge, String le) {
        return studentSearcher.searchByBirthDate(ge, le);
    }
}

```





### 在测试类中添加测试方法

```java
package cn.tedu.esspringboot;

import cn.tedu.esspringboot.es.Student;
import cn.tedu.esspringboot.es.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class Test1 {
    @Autowired
    private StudentService studentService;

    @Test
    public void test1() {
        studentService.save(new Student(998L,"张三",'男',"2020-12-04"));
    }
    @Test
    public void test2() {
        studentService.update(new Student(1L,"李四",'女',"2020-12-04"));
    }
    @Test
    public void test3() {
        List<Student> stu = studentService.findByName("四");
        System.out.println(stu);
    }
    @Test
    public void test4() throws Exception {
        List<Student> stu;

        stu = studentService.findByNameOrBirthDate("四", "1999-09-09");
        System.out.println(stu);

        stu = studentService.findByNameOrBirthDate("SFSDFS", "2020-12-04");
        System.out.println(stu);
    }

    @Test
    public void test5() throws Exception {
        List<Student> stu;

        stu = studentService.findByBirthDate("2020-12-04");
        System.out.println(stu);
    }

    @Test
    public void test6() throws Exception {
        List<Student> stu;

        stu = studentService.findByBirthDate("2020-12-05", "2020-12-09");
        System.out.println(stu);
    }
}
```