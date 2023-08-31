import { defineStore } from "pinia";
import { ref } from "vue";
import {
  request_creator_data,
  request_tag_data,
  request_douyin,
  request_plan_creator,
} from "../api/index";

export const use_common_store = defineStore(
  "common_store",
  () => {
    const plan_creator_list = ref([]);
    const tag_list = ref([]);
    const author_list = ref([]);
    const area = ref(null);
    const str_01 = ref(null);
    const quick_app_options = ref([]);
    const toutiao_mini_app = ref("");
    const toutiao_mini_app_options = ref([]);
    const toutiao_start_path = ref("");
    const douyin_options = ref([]);
    const time = ref([]);
    const time_range = ref(0);
    const ad_tabs_value = ref(1);
    const ad_tab_arr = ref([
      {
        title: "广告1",
        name: 1,
        content: "广告1",
      },
    ]);
    const selected_title = ref([]);
    const material_type = ref(null);
    const selected_video_list = ref([
      {
        name: 1,
        data: [],
      },
    ]);
    const selected_img_list = ref([
      {
        name: 1,
        data: [],
      },
    ]);
    const selected_main_img = ref([]);
    const selling_points_arr = ref([
      {
        id: 1,
        value: "",
      },
    ]);
    const is_douyin = ref(1);
    /* 请求计划创建者 */
    let get_plan_creator_list = async () => {
      const { data } = await request_plan_creator();
      plan_creator_list.value = data;
    };

    /* 获取标签和创建者列表, 抖音号 */
    let get_all_list = async (v) => {
      const { data: res } = await request_creator_data();
      author_list.value = res;
      const { data: list } = await request_tag_data();
      tag_list.value = list;
      const { data: opts } = await request_douyin(v);
      douyin_options.value = opts;
    };

    /* 处理地区 */
    let handle_area = (v) => {
      area.value = v;
    };

    /* 处理01 时间字符串 */
    let handle_str = (v) => {
      str_01.value = v;
    };

    let handle_quick_app_options = (v) => {
      quick_app_options.value = v;
    };

    let handle_toutiao_mini_app_options = (v) => {
      toutiao_mini_app_options.value = v;
    };

    let handle_time = (v) => {
      time.value = v;
    };

    let handle_time_range = (v) => {
      time_range.value = v;
    };

    let handle_tab_edit = (name, action) => {
      switch (action) {
        case "add":
          if (ad_tab_arr.value.length < 10) {
            let { name: index } = ad_tab_arr.value[ad_tab_arr.value.length - 1];
            let i = index + 1;
            ad_tab_arr.value.push({
              title: "广告" + i,
              name: i,
              content: "广告" + i,
            });
            selected_video_list.value.push({
              name: i,
              data: [],
            });
            selected_img_list.value.push({
              name: i,
              data: [],
            });
            ad_tabs_value.value = i;
          }
          break;
        case "remove":
          if (ad_tab_arr.value.length > 1) {
            const tabs_arr = ad_tab_arr.value.filter(
              (item) => item.name !== name
            );
            ad_tabs_value.value = name - 1;
            const res = tabs_arr.map((item) => {
              if (item.name > ad_tabs_value.value) {
                let { name: index } = item;
                let i = index - 1;
                return {
                  title: "广告" + i,
                  name: i,
                  content: "广告" + index,
                };
              } else {
                let { name: index } = item;
                return {
                  title: "广告" + index,
                  name: index,
                  content: "广告" + index,
                };
              }
            });
            const video_arr = selected_video_list.value.filter(
              (item) => item.name !== name
            );
            const res1 = video_arr.map((item) => {
              if (item.name > ad_tabs_value.value) {
                let { name: index, data } = item;
                let i = index - 1;
                return {
                  name: i,
                  data,
                };
              } else {
                let { name: index, data } = item;
                return {
                  name: index,
                  data,
                };
              }
            });
            const img_arr = selected_img_list.value.filter(
              (item) => item.name !== name
            );
            const res2 = img_arr.map((item) => {
              if (item.name > ad_tabs_value.value) {
                let { name: index, data } = item;
                let i = index - 1;
                return {
                  name: i,
                  data,
                };
              } else {
                let { name: index, data } = item;
                return {
                  name: index,
                  data,
                };
              }
            });
            ad_tab_arr.value = res;
            selected_video_list.value = res1;
            selected_img_list.value = res2;
          }
          break;
      }
    };

    /* 处理选择的标题 */
    let handle_selected_title = (v) => {
      let index = selected_title.value.findIndex((item) => item.id == v.id);
      if (index != -1) {
        selected_title.value.splice(index, 1);
      } else {
        selected_title.value.push(v);
      }
    };

    /* 更改素材类型 */
    let change_material_type = (v) => {
      material_type.value = v;
    };

    /* 处理选择的视频 */
    let handle_selected_video = (v) => {
      if (
        selected_video_list.value[ad_tabs_value.value - 1]["data"].find(
          (item) => item.id == v.id
        )
      ) {
        selected_video_list.value[ad_tabs_value.value - 1]["data"].splice(
          selected_video_list.value[ad_tabs_value.value - 1]["data"].indexOf(v),
          1
        );
      } else {
        selected_video_list.value[ad_tabs_value.value - 1]["data"].push(v);
      }
    };

    /* 处理选择的大屏横图 */
    let handle_selected_img = (v) => {
      if (
        selected_img_list.value[ad_tabs_value.value - 1]["data"].find(
          (item) => item.id == v.id
        )
      ) {
        selected_img_list.value[ad_tabs_value.value - 1]["data"].splice(
          selected_img_list.value[ad_tabs_value.value - 1]["data"].indexOf(v),
          1
        );
      } else {
        selected_img_list.value[ad_tabs_value.value - 1]["data"].push(v);
      }
    };

    /* 处理选择的产品主图 */
    let handle_selected_main_img = (v) => {
      if (selected_main_img.value.find((item) => item.id == v.id)) {
        selected_main_img.value.splice(selected_main_img.value.indexOf(v), 1);
      } else {
        selected_main_img.value.push(v);
      }
    };

    let set_selected_main_img = (v) => {
      selected_main_img.value = v;
    };

    let set_selected_title = (v) => {
      selected_title.value = v;
    };

    let reset_all_selected = () => {
      selected_video_list.value = [
        {
          name: 1,
          data: [],
        },
      ];
      selected_img_list.value = [
        {
          name: 1,
          data: [],
        },
      ];
      selected_title.value = [];
      selected_main_img.value = [];
    };

    let reset_copy = (ad_count) => {
      ad_tabs_value.value = 1;
      ad_tab_arr.value = [];
      selected_video_list.value = [];
      selected_img_list.value = [];
      quick_app_options.value = [];
      douyin_options.value = [];
      for (let i = 1; i <= ad_count; i++) {
        ad_tab_arr.value.push({
          title: "广告" + i,
          name: i,
          content: "广告" + i,
        });
        selected_video_list.value.push({
          name: i,
          data: [],
        });
        selected_img_list.value.push({
          name: i,
          data: [],
        });
      }
    };

    let handle_sell_point = (act, v) => {
      switch (act) {
        case 0:
          selling_points_arr.value.splice(
            selling_points_arr.value.findIndex((item) => item.id == v.id),
            1
          );
          break;
        case 1:
          if (selling_points_arr.value.length === 3)
            return ElMessage({
              message: "最多添加三个卖点",
              type: "warning",
            });
          selling_points_arr.value.push({
            id: Math.random().toFixed(2),
            value: "",
          });
          break;
      }
    };

    return {
      plan_creator_list,
      get_plan_creator_list,
      tag_list,
      author_list,
      get_all_list,
      area,
      handle_area,
      str_01,
      handle_str,
      quick_app_options,
      handle_quick_app_options,
      toutiao_mini_app,
      toutiao_mini_app_options,
      toutiao_start_path,
      handle_toutiao_mini_app_options,
      time,
      handle_time,
      time_range,
      handle_time_range,
      ad_tabs_value,
      ad_tab_arr,
      handle_tab_edit,
      selected_title,
      handle_selected_title,
      material_type,
      change_material_type,
      selected_video_list,
      handle_selected_video,
      selected_img_list,
      handle_selected_img,
      reset_all_selected,
      selected_main_img,
      handle_selected_main_img,
      set_selected_main_img,
      set_selected_title,
      reset_copy,
      douyin_options,
      selling_points_arr,
      handle_sell_point,
      is_douyin,
    };
  },
  {
    persist: false,
  }
);
