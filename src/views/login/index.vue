<template>
  <div class="login-container">
    <el-form :model="loginForm" class="login-form" label-position="left">
      <div class="title-container">
        <h3 class="title">管理后台登录</h3>
      </div>

      <el-form-item>
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          v-model="loginForm.username"
          placeholder="用户名称"
          name="username"
          type="text"
        />
      </el-form-item>
      <el-form-item>
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="用户密码"
          name="password"
          @keyup.enter.native="handleLogin"
        />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span> -->
      </el-form-item>

      <el-form-item>
        <!-- <span class="svg-container">
          <svg-icon icon-class="message" />
        </span> -->
        <el-input
          ref="code"
          v-model="loginForm.code"
          type="text"
          placeholder="验证码"
          name="code"
        />
        <span class="code-img">
          <img @click="updatecode" :src="img" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin()"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { validUsername, validPassword } from "@/utils/validate";
import { captcha, login } from "@/api/user";
import { use_user_store } from "@/store/user";

const router = useRouter();
const { store_user_token, get_user_info } = use_user_store();
// const validateUsername = (rule: any, value: any, callback: any) => {
//   if (!validUsername(value)) {
//     callback(new Error("用户名称必须是字母、数字、下划线组合，且长度6-12位"));
//   } else {
//     callback();
//   }
// };
// const validatePassword = (rule: any, value: any, callback: any) => {
//   if (!validPassword(value)) {
//     callback(new Error("用户密码必须是字母、数字、下划线组合，且长度6-18位"));
//   } else {
//     callback();
//   }
// };

const loginForm = reactive({
  username: "admin1",
  password: "123456",
  code: "",
  key: "",
});

// const loginRules = reactive({
//   username: [{ required: true, trigger: "blur", validator: validateUsername }],
//   password: [{ required: true, trigger: "blur", validator: validatePassword }],
//   code: [{ required: true, trigger: "blur" }],
// });

const passwordType = ref("password");
const loading = ref(false);
// const redirect = ref(undefined);
// const otherQuery = ref({});
const img = ref("");

const updatecode = async () => {
  const res: any = await captcha();
  img.value = res.data.img;
  loginForm.key = res.data.key;
};

// const showPwd = () => {};

const handleLogin = async () => {
  const { data } = await login(loginForm);

  store_user_token(data.user_token);

  await get_user_info();

  router.replace({
    path: "/",
  });
};

onMounted(async () => {
  await updatecode();
});
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .code-img {
    position: absolute;
    right: 0px;
    bottom: 0px;
    cursor: pointer;
    user-select: none;
    height: 32px;
  }
  .code-img img {
    height: 32px;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
