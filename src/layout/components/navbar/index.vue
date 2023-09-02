<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      id="hamburger-container"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb />
    <div class="right-menu">
      <el-dropdown
        trigger="hover"
        class="avatar-container right-menu-item hover-effect"
      >
        <div class="avatar-wrapper">
          <img
            :src="user_info.img + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="gome">我的</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { use_user_store } from "@/store/user";
import { use_setting_store } from "@/store/setting";
import hamburger from "./components/hamburger.vue";
import breadcrumb from "./components/breadcrumb.vue";

const { user_info } = storeToRefs(use_user_store());
const { sidebar } = storeToRefs(use_setting_store());
console.log(user_info.value);

const toggleSideBar = () => {};
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
