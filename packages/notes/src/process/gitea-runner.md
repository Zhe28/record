# gitea act_runner 下载安装

> reference: https://www.seepine.com/git/gitea/actions

## 安装

> [!IMPORTANT] 安装前需要装好 docker docker compose 具体安装的官网  
> [docker installer](https://docs.docker.com/desktop/install/linux/)

### 1. gitea 开启 actions

一般来说高版本的 gitea 无需弄这个，默认是开启的。

低版本的按照以下操作

修改gitea/conf/app.ini配置，若使用docker部署，可通过docker exec -it ${容器id} /bin/bash进入内部修改，修改完后重启 gitea 容器

```ini
#添加此配置
[actions]
ENABLED = true
```

### 2. 查看Gitea Runner token

登录管理员账号，在右上角头像选择后台管理、runner 页签中查看，若只是作为自己仓库的 runner，则只需在相应仓库的 设置-runner 中查看 token

### 3. 运行 act_runner

只把当前 docker 镜像用作主机，不用这个镜像通过docker再部署相对应镜像

使用 docker compose up -d 启动

<<< ./code/act-runner-host.yaml

镜像通过docker再部署相对应镜像，继续往下看

通过

```shell
docker run --entrypoint="" --rm -it gitea/act_runner:latest act_runner generate-config > config.yaml
```

拿到生成的 config.yaml 文件，映射到刚才那个 docker 容器中

修改生成的配置文件

```yaml
# config.yaml
# 只修改需要的部分就行，其他不用管
cache:
  enable: true
  dir: ""
  host: "172.17.0.1" //因为我docker主机是这个，为了固定，我就选了这个
  port: 10000
  external_server: ""
```

需要修改配置

<<< ./code/act-runner.yaml

使用 docker compose up -d 启动
