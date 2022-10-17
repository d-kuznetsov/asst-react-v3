import config from "./config.js";
export const getId = () => Math.floor(Math.random() * 100) + Date.now() + "";

export const createNode = ({ id, list }) => {
  return {
    id: id || getId(),
    type: list && list.length ? "group" : "field",
    list: list || null,
    value: list && list.length ? null : "",
  };
};

export const createInitialContext = (config) => {
  let ctx = {
    nodes: {},
  };
  const rootList = [];
  config.steps.forEach((step) => {
    const list = [];
    step.fields.forEach((field) => {
      let id = getId();
      list.push(id);
      ctx.nodes = {
        ...ctx.nodes,
        [id]: createNode({ id }),
      };
    });
    let id = getId();
    rootList.push(id);
    ctx.nodes = {
      ...ctx.nodes,
      [id]: createNode({ id, list }),
    };
  });

  const id = getId();
  ctx.nodes = {
    ...ctx.nodes,
    [id]: createNode({ id, list: rootList }),
  };
  ctx.rootNodeId = id;
  ctx.currentStepIdx = 0;

  return ctx;
};
