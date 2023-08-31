self.onmessage = async (event) => {
  const base_url = self.location.origin;
  const project_relative_url =
    import.meta.env.VITE_APP_BASE_URL +
    "/index.php/cms/new_headlines/create_project";
  const project_absolute_url = new URL(project_relative_url, base_url).href;
  const { data, uid, launch_type } = event.data;
  console.log(project_absolute_url)
  try {
    const res = await fetch(project_absolute_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        uid,
        "Launch-Type": launch_type,
        "Landing-Type": data.landing_type,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.code == 0) {
      self.postMessage({
        code: 200,
        msg: result.data.project_id,
      });
    } else {
      self.postMessage({
        code: 400,
        msg: result.message,
      });
    }
  } catch (error) {
    console.log(error);
    self.postMessage({
      code: 400,
      msg: error,
    });
  }
};
