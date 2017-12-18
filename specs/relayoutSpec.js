const flexbox = require('../src');

describe('Relayout', () => {
  test('dont_cache_computed_flex_basis_between_layouts', () =>  {
    const config = flexbox.Config.create();
    config.setExperimentalFeatureEnabled(flexbox.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS, true);

    const root = flexbox.Node.create(config);
    root.setHeightPercent(100);
    root.setWidthPercent(100);

    const root_child0 = flexbox.Node.create(config);
    root_child0.setFlexBasisPercent(100);
    root.insertChild(root_child0, 0);

    root.calculateLayout(100, undefined, flexbox.DIRECTION_LTR);
    root.calculateLayout(100, 100, flexbox.DIRECTION_LTR);

    expect(root_child0.getComputedHeight()).toBe(100);
  });

  test('recalculate_resolvedDimonsion_onchange', () =>  {
    const root = flexbox.Node.create();

    const root_child0 = flexbox.Node.create();
    root_child0.setMinHeight(10);
    root_child0.setMaxHeight(10);
    root.insertChild(root_child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(root_child0.getComputedHeight()).toBe(10);

    root_child0.setMinHeight(undefined);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root_child0.getComputedHeight()).toBe(0);
  });
});
