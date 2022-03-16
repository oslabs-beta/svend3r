import { writable } from 'svelte/store';

export const ChordChartDocs = writable([
  {
    variable: 'data',
    value: 'sampleData',
    dataType: 'Array',
    description: 'An array of objects with x-axis and y-axis key value pairs.',
    defaultValue: 'sampleData'  
  },
  {
    variable: 'marginOffset',
    value: 100,
    dataType: 'Number',
    description: 'The margin top, bottom, left, right margin offset relative to the radius.',
    defaultValue: 100,
    min: 0,
    max: 180
  },
  {
    variable: 'width',
    value: 800,
    dataType: 'Number',
    description: 'The outer width of the chart, in pixels.',
    defaultValue: 800,
    min: 370,
    max: 700
  },
  {
    variable: 'bandThickness',
    value: 10,
    dataType: 'Number',
    description: 'The thickness of the color band representing each dataset.',
    defaultValue: 10,
    min: 0,
    max: 100
  },
  {
    variable: 'fontSize',
    value: 1,
    dataType: 'Number',
    description: 'The label font size relative to 1% of the width of the viewport.',
    defaultValue: 1,
    min: 0.1,
    max: 1
  },
  {
    variable: 'tickStep',
    value: 1,
    dataType: 'Number',
    description: 'The chart label tick spread factor.',
    defaultValue: 1,
    min: 1,
    max: 5
  },
  {
    variable: 'scaleFormat',
    value: '%',
    dataType: 'String',
    description: 'The format specifier string for the scale ticks.',
    defaultValue: '%',
  },
  {
    variable: 'names',
    value: ['Apple', 'HTC', 'Huawei', 'LG', 'Nokia', 'Samsung', 'Sony', 'Other'],
    dataType: 'Array',
    description: 'The section labels for each dataset.',
    defaultValue: ['Apple', 'HTC', 'Huawei', 'LG', 'Nokia', 'Samsung', 'Sony', 'Other'],
  },
  {
    variable: 'colors',
    value: ['#c4c4c4', '#69b40f', '#ec1d25', '#c8125c', '#008fc8', '#10218b', '#134b24', '#737373'],
    dataType: 'Array',
    description: 'The fill colors for each section.  The length of colors MUST match names variable array.',
    defaultValue: ['#c4c4c4', '#69b40f', '#ec1d25', '#c8125c', '#008fc8', '#10218b', '#134b24', '#737373'],
  },
  {
    variable: 'chordOpacity',
    value: 0.7,
    dataType: 'Number',
    description: 'The opacity for the charts overall chords.',
    defaultValue: 0.7,
    min: 0.1,
    max: 1
  },
  {
    variable: 'unselectOpacity',
    value: 0.1,
    dataType: 'Number',
    description: 'The opacity of non-select chart elements.',
    defaultValue: 0.1,
    min: 0.1,
    max: 1
  },
  {
    variable: 'selectOpacity',
    value: 0.7,
    dataType: 'Number',
    description: 'The opacity of select chart elements.',
    defaultValue: 0.7,
    min: 0.1,
    max: 1
  },
  {
    variable: 'tooltipBackground',
    value: 'lightgrey',
    dataType: 'String | RGB | Hex',
    description: 'The background color of the tooltip.',
    defaultValue: 'lightgrey',
  },
  {
    variable: 'tooltipTextColor',
    value: 'black',
    dataType: 'String | RGB | Hex',
    description: 'The text color of the tooltip.',
    defaultValue: 'black',
  }
]);