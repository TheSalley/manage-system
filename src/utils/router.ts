export const generateRoutes = (data) => {
  return new Promise((resolve) => {
    const res_router = data.map((item) => {
      item.component = () => import("@/layout/index.vue");
      if (item.children) {
        item.children.map((child) => {
          if (child.component) {
            child.component = () =>
              import(`@/views/${child.component}.vue`);
          } else {
            child.component = () => import("@/layout/index.vue");
          }
          if (child.children) {
            child.children.map((children) => {
              const children_component = children.component;
              children.component = () =>
                import(`@/views/${children_component}/index.vue`);
            });
          }
        });
      }
      return item;
    });
    resolve(res_router);
  });
};
