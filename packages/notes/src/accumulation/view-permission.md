# Vue 组件按钮级权限控制教程

在前端开发中，按钮级权限控制是一个常见的需求。通过实现按钮级权限控制，我们可以确保只有特定角色的用户才能看到和操作特定的按钮。这种控制机制在以下几个方面具有重要的作用和好处：

## 好处和作用

1. **安全性增强**：通过限制用户对某些功能的访问，可以防止未经授权的用户执行敏感操作，从而提高应用程序的安全性。

2. **用户体验优化**：用户只会看到与其角色相关的功能，减少了界面的复杂性，提高了用户体验。用户不必面对与其无关的选项，从而简化了操作流程。

3. **灵活性和可扩展性**：通过使用自定义指令和 Vuex，开发者可以轻松地在项目中添加或修改权限规则，适应不断变化的业务需求。

4. **维护性提高**：将权限控制逻辑集中在一个地方（如自定义指令和 Vuex 模块），使得代码更易于维护和管理。开发者可以在不影响其他功能的情况下，独立地更新权限逻辑。

5. **合规性**：在某些行业中，合规性要求对用户访问进行严格控制。按钮级权限控制可以帮助企业满足这些合规性要求。

## 1. 自定义指令方式

### 1.1 创建权限指令

首先，我们需要创建一个自定义指令来控制按钮的显示/隐藏。在 Vue 项目中创建 `directives/permission.ts` 文件:

```typescript
// directives/permission.ts
import { ObjectDirective } from "vue";

type IUserType = "admin" | "guest";

// 在指令内部维护角色状态
let currentRole: IUserType = "guest";

const permission: ObjectDirective = {
  mounted(el, binding) {
    const { value } = binding;

    if (value && typeof value === "string") {
      const permissionRole: IUserType = value;
      const hasPermission = currentRole === permissionRole;

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        `需要指定单个角色! 例如: v-permission="'admin'" 或 v-permission="'guest'"`
      );
    }
  }
};

// 提供修改角色的方法
export const setRole = (role: IUserType) => {
  currentRole = role;
};

export default permission;
```

### 1.2 注册权限指令

在 Vue 项目的入口文件中注册该指令:

```typescript
// main.ts
import Vue from "vue";
import permission from "./directives/permission";

Vue.directive("permission", permission);
```

### 1.3 使用权限指令

在组件中使用该指令来控制按钮的显示:

```html
<template>
  <div>
    <button v-permission="'admin'">管理</button>
    <button v-permission="'guest'">查看</button>
  </div>
</template>
```

## 2. 使用响应式对象进行权限管理

### 2.1 创建权限状态管理

```typescript
// stores/permission.ts
import { reactive } from "vue";

type IUserType = "admin" | "guest";

export const userStore = reactive({
  roles: [] as IUserType[],

  setRoles(roles: IUserType[]) {
    this.roles = roles;
  }
});
```

### 2.2 获取用户角色

```typescript
// 在组件中使用
import { userStore } from "./stores/permission";

// 设置角色
userStore.setRoles(["admin"]);

// 获取角色
const roles = userStore.roles;
```

### 2.3 修改权限指令

```typescript
const permission: ObjectDirective = {
  mounted(el, binding) {
    const { value } = binding;
    const userRole = userStore.roles[0]; // 假设只取第一个角色

    if (value && typeof value === "string") {
      const permissionRole: IUserType = value;
      const hasPermission = userRole === permissionRole;

      if (!hasPermission) {
        el.parentNode?.removeChild(el);
      }
    } else {
      throw new Error(
        `需要指定单个角色! 例如: v-permission="'admin'" 或 v-permission="'guest'"`
      );
    }
  }
};
```

## 3. 模拟实例

为了更好地理解按钮级权限控制的实现，我们可以创建一个简单的模拟实例。假设我们有一个管理面板，其中只有管理员可以看到“删除用户”按钮，而访客只能看到“查看用户”按钮。

<script setup>
import Permission from "./code/Permission.vue"
</script>
<ClientOnly>
<Permission></Permission>
</ClientOnly>

通过自定义指令和 Vuex 的结合，我们可以在 Vue 项目中实现灵活的按钮级权限控制。这样可以确保只有特定角色的用户才能看到和操作特定的按钮。
