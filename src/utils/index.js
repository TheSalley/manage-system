/**
 *
 * 表格中当前项目的状态
 */
export function is_which_state(state, num) {
  let str = "";
  if (num == "1") {
    switch (state) {
      case "1":
        str = "green";
        break;
      case "3":
        str = "orange";
        break;
      case "4":
        str = "red";
        break;
      case "5":
        str = "gray";
        break;
      case "6":
        str = "blue";
        break;
    }
  } else {
    switch (state) {
      case "1":
        str = "已完成";
        break;
      case "3":
        str = "未建广告";
        break;
      case "4":
        str = "失败";
        break;
      case "5":
        str = "未开始";
        break;
      case "6":
        str = "暂停";
        break;
    }
  }
  return str;
}

/**
 *
 * 计划创建者名称
 */
export function is_which_user(uid, arr) {
  let user = arr.find((item) => item.uid == uid) ?? {
    uid,
    nickname: "未知",
  };
  return user.nickname;
}

/**
 *
 * 推广目的
 */
export function is_which_landing_type(v) {
  let str = "";
  switch (v) {
    case "QUICK_APP":
      str = "快应用";
      break;
    case "LINK":
      str = "销售线索";
      break;
    case "MICRO_GAME":
      str = "小程序";
      break;
    default:
      str = "未知";
      break;
  }
  return str;
}

/**
 *
 * 投放类型
 */
export function is_which_launch_type(v) {
  let str = "";
  switch (v) {
    case 1:
      str = "小说";
      break;
    case 2:
      str = "短剧";
      break;
    default:
      str = "未知";
      break;
  }
  return str;
}

/**
 *
 * 判断库中是否有该值
 */
export function is_have(list, v) {
  if (list.length === 0) return true;
  return list.find((item) => item.id == v.id) ? false : true;
}

/**
 *
 * 改变时间显示
 */
export let change_time_format = (t) => {
  return t.replaceAll("-", ".");
};

/**
 *
 * 记录本地进度
 */
export let is_which_progress = (v) => {
  let str = "";
  switch (v) {
    case 1:
      str = "未开始";
      break;
    case 2:
      str = "创建项目中...";
      break;
    case 3:
      str = "创建项目失败";
      break;
    case 4:
      str = "创建项目成功";
      break;
    case 5:
      str = "上传素材中...";
    case 6:
      str = "上传素材失败";
      break;
    case 7:
      str = "上传素材成功";
      break;
    case 8:
      str = "创建广告中...";
      break;
    case 9:
      str = "创建广告失败";
      break;
    case 10:
      str = "创建广告成功";
      break;
  }
  return str;
};

/**
 *
 * 当前时间的前几天
 */
export let which_day = (day) => {
  var today = new Date();
  var targetday = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday);
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandMonth(tMonth + 1);
  tDate = doHandMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
};

/**
 *
 * 月份处理
 */
export function doHandMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

/**
 *
 * 统一落地页
 */
export function uniform_chengzi(v) {
  if (v.length) {
    return (
      "https://www.chengzijianzhan.cc/tetris/page/" + v.match(/\d/g).join("")
    );
  } else {
    return "";
  }
}
