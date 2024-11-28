# 配置访问凭证

更新时间：2024年10月8日 10:20:00

使用Node.js SDK发起OSS请求，您需要配置访问凭证。阿里云服务通过访问凭证验证身份和访问权限。根据使用场景选择不同的凭证提供方式。

## 前提条件

在配置访问凭证前，需安装OSS Node.js SDK。

::: code-group

```bash [npm]
npm install ali-oss
```

```bash [pnpm]
pnpm install ali-oss
```

```bash [bun]
bun install ali-oss
```

```bash [yarn]
yarn install ali-oss
```

:::

## 初始化凭证提供者

OSS支持多种方式初始化凭证提供者，选择适合的方式：

| 方式 | 适用场景 | 需要AK或STS Token | 凭证类型 | 凭证有效期 | 轮转方式 |
| --- | --- | --- | --- | --- | --- |
| 方式一：使用AK | 安全环境，长期访问 | 是 | AK | 长期 | 手动 |
| 方式二：使用STS Token | 不可信环境，控制有效期 | 是 | STS Token | 临时 | 手动 |
| 方式三：使用RAMRoleARN | 跨账号访问 | 是 | STS Token | 临时 | 自动 |
| 方式四：ECS实例元数据 | ECS环境 | 否 | STS Token | 临时 | 自动 |
| 方式五：OIDCRoleArn | 不可信Kubernetes应用 | 否 | STS Token | 临时 | 自动 |
| 方式六：使用CredentialsURI | 外部系统获取凭证 | 否 | STS Token | 临时 | 自动 |

### 方式一：使用AK

在安全环境中使用阿里云主账号或RAM用户的AK初始化凭证提供者。注意手动维护AK的安全风险。

**设置环境变量：**

- **Mac OS X/Linux/Unix**

```bash
 export ALIBABA_CLOUD_ACCESS_KEY_ID=<ALIBABA_CLOUD_ACCESS_KEY_ID>
 export ALIBABA_CLOUD_ACCESS_KEY_SECRET=<ALIBABA_CLOUD_ACCESS_KEY_SECRET>
```

- **Windows**

```bash
 set ALIBABA_CLOUD_ACCESS_KEY_ID=<ALIBABA_CLOUD_ACCESS_KEY_ID>
 set ALIBABA_CLOUD_ACCESS_KEY_SECRET=<ALIBABA_CLOUD_ACCESS_KEY_SECRET>
```

**客户端初始化：**

```javascript
const OSS = require("ali-oss");

// 初始化OSS
const client = new OSS({
  // 从环境变量中获取AccessKey ID的值
  accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
  // 从环境变量中获取AccessKey Secret的值
  accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET
});

// listBuckets
const buckets = await client.listBuckets();
console.log(buckets);
```

### 方式二：使用STS Token

以一个RAM用户的身份调用STS服务的AssumeRole - 获取扮演角色的临时身份凭证接口，设置Token的最大过期时间，即可换取到临时凭证STS Token。

**设置环境变量：**

- **Mac OS X/Linux/Unix**

```bash
 export ALIBABA_CLOUD_SECURITY_TOKEN=<ALIBABA_CLOUD_SECURITY_TOKEN>
```

- **Windows**

```bash
 set ALIBABA_CLOUD_SECURITY_TOKEN=<ALIBABA_CLOUD_SECURITY_TOKEN>
```

**客户端初始化：**

```javascript
const OSS = require("ali-oss");

const client = new OSS({
  accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
  stsToken: process.env.ALIBABA_CLOUD_SECURITY_TOKEN
});

const buckets = await client.listBuckets();
console.log(buckets);
```

### 方式三：使用RAMRoleARN

通过指定RAM角色的ARN获取STS Token。

**客户端初始化：**

```javascript
const Credential = require("@alicloud/credentials");
const OSS = require("ali-oss");

const credentialsConfig = new Credential.Config({
  type: "ram_role_arn",
  accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
  roleArn: "<RoleArn>",
  roleSessionName: "<RoleSessionName>",
  roleSessionExpiration: 3600
});
const credentialClient = new Credential.default(credentialsConfig);
const credential = await credentialClient.getCredential();

const client = new OSS({
  accessKeyId: credential.accessKeyId,
  accessKeySecret: credential.accessKeySecret,
  stsToken: credential.securityToken,
  refreshSTSToken: async () => {
    const { accessKeyId, accessKeySecret, securityToken } =
      await credentialClient.getCredential();
    return { accessKeyId, accessKeySecret, stsToken: securityToken };
  }
});

const buckets = await client.listBuckets();
console.log(buckets);
```

### 方式四：通过ECS实例元数据获取RAM角色

自动获取ECS实例绑定的RAM角色。

**客户端初始化：**

```javascript
const credentialClient = new Credential.default({
  type: "ecs_ram_role"
});
const { accessKeyId, accessKeySecret, securityToken } =
  await credentialClient.getCredential();

const client = new OSS({
  accessKeyId,
  accessKeySecret,
  stsToken: securityToken,
  refreshSTSToken: async () => {
    const { accessKeyId, accessKeySecret, securityToken } =
      await credentialClient.getCredential();
    return { accessKeyId, accessKeySecret, stsToken: securityToken };
  }
});

const buckets = await client.listBuckets();
console.log(buckets);
```

### 方式五：使用OIDCRoleArn

在Kubernetes中获取STS Token。

**客户端初始化：**

```javascript
const credentialsConfig = new Credential.Config({
  type: "oidc_role_arn",
  roleArn: "<RoleArn>",
  oidcProviderArn: "<OidcProviderArn>",
  oidcTokenFilePath: "<OidcTokenFilePath>",
  roleSessionName: "<RoleSessionName>",
  roleSessionExpiration: 3600
});
const credentialClient = new Credential.default(credentialsConfig);
const { accessKeyId, accessKeySecret, securityToken } =
  await credentialClient.getCredential();

const client = new OSS({
  accessKeyId,
  accessKeySecret,
  stsToken: securityToken,
  refreshSTSToken: async () => {
    const { accessKeyId, accessKeySecret, securityToken } =
      await credentialClient.getCredential();
    return { accessKeyId, accessKeySecret, stsToken: securityToken };
  }
});

const buckets = await client.listBuckets();
console.log(buckets);
```

### 方式六：使用CredentialsURI

通过外部系统获取阿里云凭证。

**客户端初始化：**

```javascript
const credentialsConfig = new Credential.Config({
  type: "credentials_uri",
  credentialsURI: "<CredentialsUri>"
});
const credentialClient = new Credential.default(credentialsConfig);
const credential = await credentialClient.getCredential();

const client = new OSS({
  accessKeyId: credential.accessKeyId,
  accessKeySecret: credential.accessKeySecret,
  stsToken: credential.securityToken,
  refreshSTSToken: async () => {
    const { accessKeyId, accessKeySecret, securityToken } =
      await credentialClient.getCredential();
    return { accessKeyId, accessKeySecret, stsToken: securityToken };
  }
});

const buckets = await client.listBuckets();
console.log(buckets);
```

## 后续步骤

初始化凭证提供者后，使用凭证提供者创建OSSClient实例。
