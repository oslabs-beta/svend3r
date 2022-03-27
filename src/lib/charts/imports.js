export default {
  area: () => {
    const component = import('$lib/charts/templates/Area.svelte');
    const chartCode = import('$lib/charts/templates/Area.svelte?raw');
    const chartData = import('$lib/charts/data/line-data-multi?raw');
    return { 
      component: component,
      chartCode: chartCode,
      chartData: chartData
    }
  },
  bar: () => {
    const component = import('$lib/charts/templates/Bar.svelte');
    const chartCode = import('$lib/charts/templates/Bar.svelte?raw');
    const chartData = import('$lib/charts/data/bar-data-alphabet?raw');
    return { 
      component: component,
      chartCode: chartCode,
      chartData: chartData
    }
  },
  chord: () => {
    const component = import('$lib/charts/templates/Chord.svelte');
    const chartCode = import('$lib/charts/templates/Chord.svelte?raw');
    const chartData = import('$lib/charts/data/observable-chord-data?raw');
    return { 
      component: component,
      chartCode: chartCode,
      chartData: chartData
    }
  },
  radialStacked: () => {
    const component = import('$lib/charts/templates/RadialStacked.svelte');
    const chartCode = import('$lib/charts/templates/RadialStacked.svelte?raw');
    const chartData = import('$lib/charts/data/radial-stacked-data?raw');
    return { 
      component: component,
      chartCode: chartCode,
      chartData: chartData
    }
  }
};