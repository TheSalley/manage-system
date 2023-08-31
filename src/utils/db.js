/**
 *
 * 建立IndexedDB 数据库
 */
export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("weiqidian", 1);

    request.onerror = (event) => {
      reject({
        code: 400,
        msg: "打开数据库失败",
        data: event,
      });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // 在这里创建对象仓库或执行数据库升级操作
      const objectStore = db.createObjectStore("plan_store", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("project_name", "project_name");
      objectStore.createIndex("advertiser_id", "advertiser_id");
    };
  });
}

/**
 *
 * 删除indexeddb 库
 */
export function deleteDatabase(name) {
  return new Promise((resolve, reject) => {
    const dbName = name;

    const request = window.indexedDB.deleteDatabase(dbName);

    request.onsuccess = function () {
      console.log(`数据库${name}已成功删除`);
      resolve({
        code: 200,
        msg: `数据库${name}已成功删除`,
      });
    };

    request.onerror = function (event) {
      console.log(`删除数据库${name}出错:`, event.target.errorCode);
      reject({
        code: 400,
        msg: "删除数据库失败",
        data: event,
      });
    };
  });
}

/**
 *
 * 添加数据
 */
export function addData(db_name, payload1, payload2, ad_count, launch_type) {
  return new Promise((resolve, reject) => {
    const transaction = db_name.transaction("plan_store", "readwrite");
    const objectStore = transaction.objectStore("plan_store");
    const request = objectStore.add({
      project_name: JSON.parse(payload1).name,
      project_data: payload1,
      advertiser_id: JSON.parse(payload1).advertiser_id,
      ad_data: payload2,
      ad_count,
      attach: JSON.stringify({
        img_arr: [],
        main_img_arr: [],
        video_arr: [],
        title_arr: [],
      }),
      success_count: 0,
      status: 1,
      error_log: "",
      launch_type,
    });

    request.onsuccess = (event) => {
      resolve({
        code: 200,
        msg: "添加项目数据成功",
      });
    };

    request.onerror = (event) => {
      console.log("添加项目数据失败", event.target.error);
      reject({
        code: 400,
        msg: "添加项目数据失败",
      });
    };
  });
}

/**
 *
 * 查找数据
 */
export function getData(db, mode = 1, id, page = 1, limit = 10) {
  return new Promise((resolve, reject) => {
    console.log("在请求db ing...");
    const transaction = db.transaction("plan_store", "readonly");
    const store = transaction.objectStore("plan_store");

    let cursorRequest = null;
    let result = [];

    switch (mode) {
      case 1:
        cursorRequest = store.openCursor(null, "prev");
        break;
      case 2:
        const index = store.index("project_name");
        cursorRequest = index.openCursor(IDBKeyRange.only(id));
        break;
      case 3:
        const index1 = store.index("advertiser_id");
        cursorRequest = index1.openCursor(IDBKeyRange.only(id));
        break;
    }

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const data = cursor.value;
        result.push(data);
        cursor.continue();
      } else {
        const count = result.length;
        if (result.length === 0) {
          resolve({
            code: 200,
            msg: "未找到任何数据",
            data: [],
            count: 0,
          });
        } else {
          const start = (page - 1) * limit;
          const end = start + limit;
          const data = result.slice(start, end);
          resolve({
            code: 200,
            msg: "查找数据成功",
            data: data,
            count: count,
          });
        }
      }
    };

    cursorRequest.onerror = (event) => {
      console.error("查找数据失败", event.target.error);
      reject({
        code: 400,
        msg: "查找数据失败",
      });
    };
  });
}

/**
 *
 * 删除数据
 */
export function deleteData(db_name, id) {
  return new Promise((resolve, reject) => {
    const transaction = db_name.transaction("plan_store", "readwrite");
    const objectStore = transaction.objectStore("plan_store");
    let request = objectStore.delete(id);
    request.onsuccess = (event) => {
      resolve({
        code: 200,
        msg: "删除数据成功",
        data: event.target.result,
      });
    };

    request.onerror = (event) => {
      console.log("删除数据失败", event.target.error);
      reject({
        code: 400,
        msg: "删除数据失败",
      });
    };
  });
}

/**
 *
 * 修改数据
 */
export function updateData(db_name, id, name, payload) {
  return new Promise(async (resolve, reject) => {
    const transaction = db_name.transaction("plan_store", "readwrite");
    const objectStore = transaction.objectStore("plan_store");
    const index = objectStore.index("project_name");
    const request = index.get(id);

    request.onsuccess = (event) => {
      let data = event.target.result;
      let updateReq = null;
      switch (name) {
        case "project_data":
          const { project_data, ...rest } = data;
          updateReq = objectStore.put({
            ...rest,
            project_data: payload,
          });
          break;
        case "ad_data":
          const { ad_data, ...rest1 } = data;
          updateReq = objectStore.put({
            ...rest1,
            ad_data: payload,
          });
          break;
        case "attach":
          const { attach, ...rest2 } = data;
          updateReq = objectStore.put({
            ...rest2,
            attach: payload,
          });
          break;
        case "status":
          const { status, ...rest3 } = data;
          updateReq = objectStore.put({
            ...rest3,
            status: payload,
          });
          break;
        case "success_count":
          const { success_count, ...rest4 } = data;
          updateReq = objectStore.put({
            ...rest4,
            success_count: payload,
          });
          break;
        case "error_log":
          const { error_log, ...rest5 } = data;
          updateReq = objectStore.put({
            ...rest5,
            error_log: payload,
          });
          break;
        case "ad_count":
          const { ad_count, ...rest6 } = data;
          updateReq = objectStore.put({
            ...rest6,
            ad_count: payload,
          });
          break;
      }

      updateReq.onsuccess = () => {
        resolve({
          code: 200,
          msg: "修改数据成功",
        });
      };

      updateReq.onerror = () => {
        reject({
          code: 400,
          msg: "修改数据失败",
        });
      };
    };

    request.onerror = (event) => {
      reject({
        code: 400,
        msg: "更新数据失败",
      });
    };
  });
}
