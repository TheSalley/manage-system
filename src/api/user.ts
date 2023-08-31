import service from "@/utils/request";

// 获取验证码
export async function captcha() {
  const { data } = await service({
    url: "/captcha",
    method: "GET",
  });
  return data;
}

// 登录
export async function login(payload) {
  const { data } = await service({
    url: "/admin/login/index",
    method: "POST",
    data: payload,
  });
  return data;
}

// 获取用户信息
export async function get_user() {
  const { data } = await service({
    url: "/admin/admin/getuser",
    method: "POST",
  });
  return data;
}
