# 目录结构
在快速入门中，大家对框架应该有了初步的印象，接下来我们简单了解下目录约定规范。
```
.
├── app
│   ├── controller
│   │   ├── home.js
│   │   └── product.js
│   ├── middleware
│   │   └── gzip.js
│   ├── model
│   │   ├── index.js
│   │   └── product.js
│   ├── router
│   │   └── index.js
│   └── service
│       └── product.js
├── app.js
├── changelog.md
├── config
│   └── index.js
├── logs
│   └── app.log
├── package.json
├── readme.md
└── test
    ├── controller
    ├── index.js
    ├── middleware
    │   ├── logger.js
    │   └── proxy.js
    ├── model
    ├── module
    └── router
```

如上，由框架约定的目录：

* app/router/index.js 用于配置 URL 路由规则，具体参见 Router。
* app/controller/*.js 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。
* app/service/*.js 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
* app/middleware/*.js 用于编写中间件，可选，具体参见 Middleware。
* config/index.js 用于编写配置文件，具体参见配置。
* test/** 用于单元测试，具体参见单元测试。
* app.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。
