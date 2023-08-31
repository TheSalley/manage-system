self.onmessage = async (event) => {
  let base_url = self.location.origin;
  const { data: payload, uid } = event.data;

  let img_relative_url =
    import.meta.env.VITE_APP_BASE_URL + "/index.php/cms/planning/upload_image";
  let img_absolute_url = new URL(img_relative_url, base_url).href;
  let video_relative_url =
    import.meta.env.VITE_APP_BASE_URL + "/index.php/cms/planning/upload_video";
  let video_absolute_url = new URL(video_relative_url, base_url).href;
  let get_video_relative_url =
    import.meta.env.VITE_APP_BASE_URL + "/index.php/cms/planning/get_video";
  let get_video_absolute_url = new URL(get_video_relative_url, base_url).href;
  function sleep(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  switch (payload.type) {
    case "img":
    case "main_img":
      try {
        const res = await fetch(img_absolute_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            uid,
          },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.every((item) => item.code == 0)) {
          self.postMessage({
            code: 200,
            msg: result.map((item) => item.data.id),
            type: payload.type,
          });
        } else {
          self.postMessage({
            code: 400,
            msg: result.map((item) => ({
              msg: item.message,
            })),
            type: payload.type,
          });
        }
      } catch (error) {
        self.postMessage({
          code: 400,
          msg: error,
          type: payload.type,
        });
      }
      break;
    case "video":
      try {
        /* 上传视频 */
        const res = await fetch(video_absolute_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            uid,
          },
          body: JSON.stringify(payload),
        });
        const result = await res.json();

        if (result.every((item) => item.code == 0)) {
          let args = {
            advertiser_id: payload.advertiser_id,
            video_ids: [...new Set(result.map((item) => item.data.video_id))],
          };
          let get_video_result = null;
          /* 获取视频 */
          do {
            await sleep(1000);
            const res = await fetch(get_video_absolute_url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                uid,
              },
              body: JSON.stringify(args),
            });
            get_video_result = await res.json();
          } while (
            !(
              get_video_result.code === 0 &&
              args.video_ids.length == get_video_result.data.list.length
            )
          );
          console.log(get_video_result, result);
          let video_cover_list = [];
          result.forEach((item) => {
            item.data.video_cover_id = get_video_result.data.list.find(
              (i) => i.id == item.data.video_id
            ).poster_url;
            video_cover_list.push({
              id: "",
              url: get_video_result.data.list.find(
                (i) => i.id == item.data.video_id
              ).poster_url,
            });
          });
          /* 上传封面 */
          let temp_args = {
            advertiser_id: payload.advertiser_id,
            upload_type: "UPLOAD_BY_URL",
            images: video_cover_list,
          };
          const res_cover = await fetch(img_absolute_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              uid,
            },
            body: JSON.stringify(temp_args),
          });
          const result_cover = await res_cover.json();
          result.forEach((item, index) => {
            item.data.video_cover_id = result_cover[index].data.id;
          });
          self.postMessage({
            code: 200,
            msg: result.map((item) => ({
              video_id: item.data.video_id,
              video_cover_id: item.data.video_cover_id,
            })),
            type: payload.type,
          });
        } else {
          console.log(result.every((item) => item.code == 0));
        }
      } catch (error) {
        self.postMessage({
          code: 400,
          msg: error,
          type: payload.type,
        });
      }
      break;
  }
};
