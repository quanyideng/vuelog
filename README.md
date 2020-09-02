<p align="center">
  <img width="160" src="https://s1.ax1x.com/2020/09/02/wSqc26.png">
</p>

<h1 align="center">vuelog</h1>

一个使用 `bmob` + `vue-cli` + `npm` 的简单博客，带有文章发布，查看，删除和修改等功能

技术栈 `Vue`+`Vue-Cli`+`Bmob`+`Vue-router`

### 在线预览
[在线预览](http://crazy.lovemysoul.vip/gitdemo/bmob-vue)

### 已实现功能

[✔] 首页文章显示

[✔] 文章编剧

[✔] 文章分页展示

[✔] 文章删除

[✔] 文章发布

[✔] 操作提示信息


## 使用规范

### 引入Bmob
``` javascript
import Bmob from "hydrogen-js-sdk";
```

### 修改key

``` javascript
Bmob.initialize(
    "Secret ID",
    "API 安全码"
);
```

### 开始
``` javascrip
npm install
```

### 启动
``` javascript
npm start
```

### 打包
``` javascrip
npm run build
```


### 应用截图
**首页**

![homepage](https://s1.ax1x.com/2020/09/02/wSv0hj.png)

**添加博客**

![publish](https://s1.ax1x.com/2020/09/02/wSvwNQ.png

**博客详情**

![detail](https://s1.ax1x.com/2020/09/02/wSvr3n.png)

**修改博客**

![modified](https://s1.ax1x.com/2020/09/02/wSvscq.png)

**删除博客**

![delete](https://s1.ax1x.com/2020/09/02/wSvD9s.png)
