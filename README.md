# 邮件订阅系统

这是一个简单的邮件订阅系统，允许用户通过网页表单订阅电子邮件通讯。

## 功能特点

- 响应式设计，适配各种设备
- 邮箱格式验证
- 防止重复订阅
- 使用Cloudflare D1数据库存储订阅信息

## 技术栈

- 前端：HTML, CSS, JavaScript
- 后端：Cloudflare Workers
- 数据库：Cloudflare D1

## 部署说明

本项目使用Cloudflare Pages进行部署，并使用Cloudflare D1作为数据库。

### 本地开发

1. 克隆仓库
```bash
git clone [仓库URL]
cd email-sub
```

2. 安装依赖
```bash
npm install
```

3. 本地运行
```bash
npx wrangler pages dev
```

### 部署到Cloudflare

1. 登录Cloudflare Dashboard
2. 创建一个新的Pages项目
3. 连接到GitHub仓库
4. 配置构建设置
5. 部署

## 数据库初始化

项目使用Cloudflare D1数据库，需要先创建数据库和表结构：

```sql
CREATE TABLE subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TEXT NOT NULL
);
```

## 许可证

MIT