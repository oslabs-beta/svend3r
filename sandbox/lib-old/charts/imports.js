export default {
  area: () => {
    const component = import('$lib/charts/templates/Area.svelte');
    const code = import('$lib/charts/templates/Area.svelte?raw');
    const data = import('$lib/charts/data/line-data-multi?raw');
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
    const data = import('$lib/charts/data/bar-data-alphabet?raw');
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
    const data = import('$lib/charts/data/observable-chord-data?raw');
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
    const data = import('$lib/charts/data/radial-stacked-data?raw');
    const json = import('$lib/charts/db/radialStacked.json');
    return { 
      component: component,
      code: code,
      data: data,
      json: json
    }
  }
};