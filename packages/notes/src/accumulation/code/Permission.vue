<template>
  <div>
    <h1>用户管理面板</h1>
    <div>
      <label for="user-role">选择用户角色: </label>
      <select
        id="user-role"
        v-model="currentRole"
        @change="setRole(currentRole)"
      >
        <option value="admin">管理员</option>
        <option value="guest">访客</option>
      </select>
    </div>
    <p>当前用户角色: {{ currentRole }}</p>
    <b>为了方便, 我把权限写入了 localstorage, 需要重新刷新页面获取显示的内容</b>
    <div>
      <button v-permission="'admin'">删除用户</button>
      <button v-permission="'guest'">查看用户</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ObjectDirective } from "vue";

// 定义用户类型
type IUserType = "admin" | "guest";
// 模拟获取用户角色的函数
const getUserRole = (): IUserType => {
  return localStorage["role"] ? localStorage["role"] : "admin"; // 假设默认返回 'admin'
};

// 定义当前角色
const currentRole = ref<IUserType>(getUserRole());

// 切换角色的方法
const setRole = (role: IUserType) => {
  localStorage["role"] = role;
  currentRole.value = role;
};

// directives/permission.ts

const vPermission: ObjectDirective = {
  mounted(el, binding) {
    const { value } = binding;

    if (value && typeof value === "string") {
      const permissionRole = value as IUserType;
      const hasPermission = permissionRole === "admin" || currentRole.value === permissionRole;

      console.log(el, "has permission?? " + hasPermission);

      if (hasPermission) {
        el.parentNode.style.display = "none";
      } else {
        el.parentNode.style.display = "block";
      }
    } else {
      throw new Error(`需要指定单个角色! 例如: v-permission="'admin'" 或 v-permission="'guest'"`);
    }
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
