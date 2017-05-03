# Service

简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

* 保持 Controller 中的逻辑更加简洁。
* 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
* 将逻辑和展现分离，更容易编写测试用例

## 使用场景
* 复杂数据的处理，比如要展现的信息需要从数据库获取，还要经过一定的规则计算，才能返回用户显示。或者计算完成后，更新到数据库。
* 第三方服务的调用，比如 GitHub 信息获取等。

## 定义 Service
* app/service/user.js

```
exports.getInfo = async (ctx, uid) => {
  const user = await ctx.db.query(`select * from user where uid = ${uid}`);
  return user;
};
exports.updateInfo = async (ctx) => {};
```

## 使用 Service
```
// app/controller/product.js
exports.productList = async (ctx) => {
  const user = await ctx.service.user.getInfo(ctx);
  ctx.body = user;
};
```
