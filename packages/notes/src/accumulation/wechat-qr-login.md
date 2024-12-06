# 微信扫码登录流程

## 一、实现流程概述

微信扫码登录的完整流程如下：

1. 前端页面引入微信登录脚本
2. 向后端请求获取登录参数
3. 使用参数初始化微信登录二维码
4. 用户扫描二维码并在手机上确认
5. 微信回调登录页面并携带授权码
6. 后端使用授权码获取access_token
7. 获取用户信息并完成登录

## 二、详细实现步骤

### 2.1 引入微信登录脚本

首先在你的HTML页面中引入微信提供的登录脚本：

```javascript
let wxElement = null;
if (!wxElement) {
  wxElement = document.createElement("script");
  wxElement.src =
    "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";
  document.body.appendChild(wxElement);
}
```

### 2.2 准备登录参数

1. 在页面中创建一个容器用于显示二维码：

```html
<div id="wx-qr-container"></div>
```

2. 向后端请求获取必要的登录参数：

```javascript
async function getWxLoginParams() {
  const response = await fetch("/api/wx/login/params");
  return await response.json();
  // 返回格式示例：
  // {
  //     appid: "你的应用ID",
  //     scope: "snsapi_login",
  //     redirect_uri: "https://你的域名/wx/callback",
  //     state: "随机字符串"
  // }
}
```

### 2.3 初始化微信登录

使用获取到的参数，初始化微信登录二维码：

```javascript
async function initWxLogin() {
  const params = await getWxLoginParams();
  new WxLogin({
    id: "wx-qr-container", // 二维码容器ID
    appid: params.appid,
    scope: params.scope,
    redirect_uri: encodeURIComponent(params.redirect_uri),
    state: params.state,
    style: "black", // 二维码样式
    href: "" // 自定义样式链接
  });
}
```

### 2.4 处理登录回调

1. 用户扫码后，微信会重定向到你配置的回调地址，并携带code和state参数：

```javascript
// 示例回调地址
// https://你的域名/wx/callback?code=021Lw6000ag4UL1Kpx300Kz1Dw3Lw60x&state=STATE
```

2. 在回调页面中获取code和state参数：

```javascript
function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  return { code, state };
}
```

3. 将code发送给后端：

```javascript
async function handleWxCallback() {
  const { code, state } = getUrlParams();

  // 验证state防止CSRF攻击
  if (state !== localStorage.getItem("wx_state")) {
    throw new Error("Invalid state");
  }

  // 发送code给后端
  const response = await fetch("/api/wx/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  const result = await response.json();
  if (result.success) {
    // 登录成功，进行页面跳转
    window.location.href = "/dashboard";
  }
}
```

### 2.5 获取用户信息

使用access_token获取用户信息：

```javascript
async function getUserInfo() {
  try {
    const response = await fetch("/api/wx/user/info", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    if (data.success) {
      // 用户信息示例：
      // {
      //     nickname: "用户昵称",
      //     headimgurl: "头像URL",
      //     openid: "用户openid",
      //     unionid: "用户unionid",
      //     lastLoginTime: "最后登录时间",
      //     ...其他信息
      // }
      return data.userInfo;
    }
    throw new Error(data.message);
  } catch (error) {
    console.error("获取用户信息失败:", error);
    throw error;
  }
}
```

## 三、注意事项

### 3.1 安全相关

1. redirect_uri必须进行URL编码
2. 必须验证state参数防止CSRF攻击
3. secret和access_token等敏感信息只能在服务端使用
4. 建议使用HTTPS协议

### 3.2 token管理

1. access_token有效期为2小时
2. refresh_token有效期为30天
3. 可以通过refresh_token刷新access_token：

```
GET https://api.weixin.qq.com/sns/oauth2/refresh_token?
    appid=APPID&
    grant_type=refresh_token&
    refresh_token=REFRESH_TOKEN
```

### 3.3 样式相关

1. 可以通过style参数设置二维码样式（black/white）
2. 可以通过href参数自定义样式
3. 确保二维码容器有足够的显示空间（建议至少300x300像素）

### 3.4 错误处理

1. 需要处理用户取消授权的情况
2. 需要处理access_token过期的情况
3. 需要处理网络超时等异常情况
4. 建议添加适当的加载提示和错误提示

## 四、最佳实践

1. 在服务端存储access_token和refresh_token
2. 实现token自动刷新机制
3. 添加登录状态检查和超时处理
4. 实现用户信息的缓存机制
5. 添加必要的日志记录
6. 做好异常处理和用户提示
7. 考虑多端登录的情况
