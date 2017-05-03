# controller
## 什么是 Controller
我们通过 Router 将用户的请求基于 method 和 URL 分发到了对应的 Controller 上，那 Controller 负责做什么？

简单的说 Controller 负责解析用户的输入，处理后返回相应的结果，例如

在 RESTful 接口中，Controller 接受用户的参数，从数据库中查找内容返回给用户或者将用户的请求更新到数据库中。
在 HTML 页面请求中，Controller 根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户。
在代理服务器中，Controller 将用户的请求转发到其他服务器上，并将其他服务器的处理结果返回给用户。
框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

获取用户通过 HTTP 传递过来的请求参数。
校验、组装参数。
调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
通过 HTTP 将结果响应给用户。

## 如何编写 Controller
所有的 Controller 文件都必须放在 app/controller 目录下，访问的时候可以通过目录名级联访问。

* Controller 方法

每一个 Controller 都是一个 async function，它的第一个参数是请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的各种便捷属性和方法。

例如我们写一个对应到 POST /api/posts 接口的 Controller，我们会在 app/controller 目录下创建一个 post.js 文件

```
// app/controller/post.js
exports.create = async (ctx) => {
  ctx.body = 'ok';
};
```
