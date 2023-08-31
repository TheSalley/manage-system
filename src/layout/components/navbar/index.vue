<template>
  <div class="navbar">
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
            <el-dropdown-item divided command="logout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { use_user_store } from "@/store/user";
import { storeToRefs } from "pinia";

const { user_info } = storeToRefs(use_user_store());
console.log(user_info.value);
</script>
<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
