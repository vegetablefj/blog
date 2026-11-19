// Cubism 5 queues the model and loads its assets before drawing it.
export function waitForCubism5Frame(app) {
  const manager = app?.subdelegates?.at(0)?.getLive2DManager();
  const model = manager?._models.at(0);
  if (typeof model?.doDraw !== "function") return Promise.resolve(false);

  return new Promise(resolve => {
    const draw = model.doDraw;
    const finish = drawn => {
      clearTimeout(timeout);
      if (model.doDraw === confirmFrame) model.doDraw = draw;
      resolve(drawn && manager._models.at(0) === model);
    };
    const timeout = setTimeout(() => finish(false), 12_000);

    function confirmFrame(...args) {
      try {
        const result = draw.apply(this, args);
        finish(true);
        return result;
      } catch (error) {
        finish(false);
        throw error;
      }
    }

    model.doDraw = confirmFrame;
  });
}

// Cubism 2 resolves its loader before the next animation frame draws the outfit.
export function waitForCubism2Frame(renderer) {
  const manager = renderer?.live2DMgr;
  const model = manager?.getModel?.() ?? manager?.model;
  if (typeof model?.draw !== "function") return Promise.resolve(false);

  return new Promise(resolve => {
    const draw = model.draw;
    const finish = drawn => {
      clearTimeout(timeout);
      if (model.draw === confirmFrame) model.draw = draw;
      resolve(drawn && (manager.getModel?.() ?? manager.model) === model);
    };
    const timeout = setTimeout(() => finish(false), 12_000);

    function confirmFrame(...args) {
      try {
        const result = draw.apply(this, args);
        finish(true);
        return result;
      } catch (error) {
        finish(false);
        throw error;
      }
    }

    model.draw = confirmFrame;
  });
}
