import { defineStore } from "pinia";
import { ref } from "vue";
import { request_table_data } from "../api/index";
import { getData } from "../utils/db";

export const use_search_params_store = defineStore(
  "search_params_store",
  () => {
    const Uid = ref(uid);
    const search_params = ref({
      id: "",
      advertiser_id: "",
      uid: "",
      time: [],
      type: "",
      landing_type: "",
      page: 1,
      limit: 10,
      total: 0,
    });
    const table_data = ref([]);

    const search_local_params = ref({
      advertiser_id: "",
      page: 1,
      limit: 10,
      total: 0,
    });
    const table_local_list = ref([]);

    let change_search_params = async (v, name) => {
      search_params.value[name] = v;
    };

    let change_search_local_params = (v, name) => {
      search_local_params.value[name] = v;
    };

    let get_table_data = async () => {
      const { list, total: count } = await request_table_data(
        search_params.value
      );
      table_data.value = list;
      search_params.value.total = count;
    };

    let get_table_local_data = async (db) => {
      const res = await getData(
        db,
        1,
        "",
        search_local_params.value.page,
        search_local_params.value.limit
      );
      table_local_list.value = res.data;
      search_local_params.value.total = res.count;
    };

    let get_index_table_local_data = async (db, index) => {
      const res = await getData(
        db,
        3,
        index,
        search_local_params.value.page,
        search_local_params.value.limit
      );
      table_local_list.value = res.data;
      search_local_params.value.total = res.count;
    };

    let get_index_table_local_data1 = async (db, index) => {
      const res = await getData(
        db,
        2,
        index,
        search_local_params.value.page,
        search_local_params.value.limit
      );
      return res.data;
    };

    return {
      Uid,
      search_params,
      change_search_params,
      table_data,
      get_table_data,
      search_local_params,
      change_search_local_params,
      table_local_list,
      get_table_local_data,
      get_index_table_local_data,
      get_index_table_local_data1,
    };
  },
  {
    persist: false,
  }
);
