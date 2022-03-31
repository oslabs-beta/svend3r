export default {
  area: () => {
    const component = import('$lib/charts/templates/Area.svelte');
    const code = import('$lib/charts/templates/Area.svelte?raw');
    const data = import('$lib/charts/data/area-data?raw');
    const json = import('$lib/charts/db/area.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  bar: () => {
    const component = import('$lib/charts/templates/Bar.svelte');
    const code = import('$lib/charts/templates/Bar.svelte?raw');
    const data = import('$lib/charts/data/bar-data?raw');
    const json = import('$lib/charts/db/bar.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  chord: () => {
    const component = import('$lib/charts/templates/Chord.svelte');
    const code = import('$lib/charts/templates/Chord.svelte?raw');
    const data = import('$lib/charts/data/chord-data?raw');
    const json = import('$lib/charts/db/chord.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  radialStacked: () => {
    const component = import('$lib/charts/templates/RadialStacked.svelte');
    const code = import('$lib/charts/templates/RadialStacked.svelte?raw');
    const data = import('$lib/charts/data/radialStacked-data?raw');
    const json = import('$lib/charts/db/radialStacked.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  pie: () => {
    const component = import('$lib/charts/templates/Pie.svelte');
    const code = import('$lib/charts/templates/Pie.svelte?raw');
    const data = import('$lib/charts/data/pie-data?raw');
    const json = import('$lib/charts/db/pie.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  scatter: () => {
    const component = import('$lib/charts/templates/Scatter.svelte');
    const code = import('$lib/charts/templates/Scatter.svelte?raw');
    const data = import('$lib/charts/data/scatter-data?raw');
    const json = import('$lib/charts/db/scatter.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  choropleth: () => {
    const component = import('$lib/charts/templates/Choropleth.svelte');
    const code = import('$lib/charts/templates/Choropleth.svelte?raw');
    const data = import('$lib/charts/data/choropleth-data?raw');
    const json = import('$lib/charts/db/choropleth.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  donut: () => {
    const component = import('$lib/charts/templates/Donut.svelte');
    const code = import('$lib/charts/templates/Donut.svelte?raw');
    const data = import('$lib/charts/data/donut-data?raw');
    const json = import('$lib/charts/db/donut.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  circlePack: () => {
    const component = import('$lib/charts/templates/CirclePack.svelte');
    const code = import('$lib/charts/templates/CirclePack.svelte?raw');
    const data = import('$lib/charts/data/circle-pack-data?raw');
    const json = import('$lib/charts/db/circle-pack.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  line: () => {
    const component = import('$lib/charts/templates/Line.svelte');
    const code = import('$lib/charts/templates/Line.svelte?raw');
    const data = import('$lib/charts/data/line-data?raw');
    const json = import('$lib/charts/db/line.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  bubble: () => {
    const component = import('$lib/charts/templates/Bubble.svelte');
    const code = import('$lib/charts/templates/Bubble.svelte?raw');
    const data = import('$lib/charts/data/bubble-data?raw');
    const json = import('$lib/charts/db/bubble.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  },
  ridgeline: () => {
    const component = import('$lib/charts/templates/Ridgeline.svelte');
    const code = import('$lib/charts/templates/Ridgeline.svelte?raw');
    const data = import('$lib/charts/data/ridgeline-data?raw');
    const json = import('$lib/charts/db/ridgeline.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  }
};
