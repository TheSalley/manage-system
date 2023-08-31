import service from "@/utils/request";

/*
 *
 * 请求验证广告主账户ID 是否存在
 */
export async function request_vertify_advertiser_id(p) {
  const { data } = await service({
    url: "/index.php/cms/planning/group",
    method: "POST",
    data: p,
  });
  return data;
}

/*
 *
 * 请求表格数据
 */
export async function request_table_data(p) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/create_plan",
    method: "GET",
    params: {
      id: p.id,
      page: p.page,
      limit: p.limit,
      advertiser_id: p.advertiser_id,
      uid: p.uid,
      type: p.type,
      landing_type: p.landing_type,
      start_time: p.time ? p.time[0] : "",
      end_time: p.time ? p.time[1] : "",
    },
  });
  return data;
}

/**
 *
 * 请求计划创建者
 */
export async function request_plan_creator() {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/get_user",
  });
  return data;
}

/**
 *
 * 请求建项目
 */
export async function request_create_project(d) {
  const { data } = await service({
    url: "/create_project",
    method: "POST",
    data: d,
  });
  return data;
}

/**
 *
 * 请求标题库数据
 */
export async function request_title_list(d) {
  const { data } = await service({
    url: "/index.php/cms/title/title_list",
    method: "GET",
    params: {
      page: d.page,
      limit: d.limit,
      start_time: d.created_at?.length ? d.created_at[0] : "",
      end_time: d.created_at?.length ? d.created_at[1] : "",
      tag: d.tag,
      book_name: d.book_name,
      title: d.title,
      creator: d.creator,
      launch_type: d.launch_type,
    },
  });
  return data;
}

/**
 *
 * 请求所有创建者
 */
export async function request_creator_data() {
  const { data } = await service({
    url: `/index.php/cms/title/get_creator`,
  });
  return data;
}

/**
 *
 * 请求标签
 */
export async function request_tag_data() {
  const { data } = await service({
    url: `/index.php/cms/materials/materials_type`,
  });
  return data;
}

/**
 *
 * 请求素材列表
 */
export async function request_material_data(d) {
  const { data } = await service({
    url: "/index.php/cms/materials/materials_list",
    method: "GET",
    params: {
      page: d.page,
      limit: d.limit,
      book_name: d.book_name,
      author: d.author,
      tag: d.tag,
      start_time: d.created_at?.length ? d.created_at[0] : "",
      end_time: d.created_at?.length ? d.created_at[1] : "",
      order: d.order,
      number: d.number,
      dislike: 0,
      material_type: d.material_type,
      launch_type: d.launch_type,
      platform: 1
    },
  });
  return data;
}

/**
 *
 * 请求产品库
 */
export async function request_product_db(advertiser_id) {
  const { data } = await service({
    url: `/index.php/cms/new_headlines/get_product?advertiser_id=${advertiser_id}`,
  });
  return data;
}

/**
 *
 * 请求产品
 */
export async function request_product(d) {
  const { data } = await service({
    url: `/index.php/cms/new_headlines/get_product_list?advertiser_id=${d.advertiser_id}&product_platform_id=${d.product_platform_id}`,
  });
  return data;
}

/**
 *
 * 请求快应用
 */
export async function request_quick_app(advertiser_id) {
  const { data } = await service({
    url: `/index.php/cms/new_headlines/get_convert_list?advertiser_id=${advertiser_id}&asset_type=QUICK_APP`,
  });
  return data;
}

/**
 *
 * 请求快应用
 */
export async function request_copy_project(id) {
  const { data } = await service({
    url: `/index.php/cms/planning/get_campaign?project_id=${id}`,
  });
  return data;
}

/**
 *
 * 提交计划数量与成功数量
 */
export async function request_post_count(d) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/get_project",
    method: "POST",
    data: d,
  });
  return data;
}

/**
 *
 * 请求抖音号
 */
export async function request_douyin(d) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/get_douyin_info",
    method: "POST",
    data: {
      advertiser_id: d,
    },
  });
  return data;
}

/**
 *
 * 删除计划
 */
export async function request_delete_plan(d) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/del_plan",
    method: "POST",
    data: d,
  });
  return data;
}

/**
 *
 * 获取项目下的广告信息
 */
export async function request_ad(d) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/get_ad_list",
    method: "POST",
    data: d,
  });
  return data;
}

/**
 *
 * 获取橙子建站
 */
export async function request_chengzi(d) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/get_cz_site_info",
    method: "POST",
    data: d,
  });
  return data;
}

/**
 * 
 * 获取字节小程序
 */
export async function request_toutiao_mini_app(d) {
  const { data } = await service({
    url: "/index.php/cms/new_headlines/get_applet_list",
    method: "POST",
    data: d,
  });
  return data;
}
