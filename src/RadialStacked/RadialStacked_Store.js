import { writable } from 'svelte/store';

export const radialStackedChartDocs = writable([
  {
    variable: 'data',
    value: 'sampleData',
    dataType: 'Array',
    description: 'An array of objects with x-axis and y-axis key value pairs.',
    defaultValue: 'sampleData'  
  },
  {
    variable: 'width',
    value: 975,
    dataType: 'Number',
    description: 'The width of the inner radius inversed, in pixels.',
    defaultValue: 975,
    min: 400,
    max: 1500
  },
  {
    variable: 'innerRadius',
    value: 180,
    dataType: 'Number',
    description: 'The radius of the inner circle, in pixels.',
    defaultValue: 180,
    min: 120,
    max: 500
  },
  {
    variable: 'colorRange',
    value: ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'],
    dataType: 'Array',
    description: 'The fill colors for each bar stack.  The colorRange array length  MUST match number of datasets.',
    defaultValue: ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'],
  },
  {
    variable: 'chartScale',
    value: 0.5,
    dataType: 'Number',
    description: 'The scale factor from the center.',
    defaultValue: 0.5,
    min: 0.1,
    max: 1
  },
  {
    variable: 'sorted',
    value: true,
    dataType: 'Boolean',
    description: 'The boolean value for if the dataset is sorted.',
    defaultValue: true,
  },
  {
    variable: 'varFontSize',
    value: 10,
    dataType: 'Number',
    description: 'The font size of all text on the chart, in pixels.',
    defaultValue: 10,
    min: 5,
    max: 30
  },
  {
    variable: 'tickColor',
    value: '#000',
    dataType: 'String | RGB | Hex',
    description: 'The color of the inner radius ticks.',
    defaultValue: '#000',
  },
  {
    variable: 'ringColor',
    value: '#000',
    dataType: 'String | RGB | Hex',
    description: 'The color of the scale rings.',
    defaultValue: '#000',
  },
  {
    variable: 'scaleColor',
    value: '#000',
    dataType: 'String | RGB | Hex',
    description: 'The color of the scale text.',
    defaultValue: '#000',
  },
  {
    variable: 'scaleStroke',
    value: '#fff',
    dataType: 'String | RGB | Hex',
    description: 'The color of the scale text background/stroke.',
    defaultValue: '#fff',
  },
  {
    variable: 'rectLength',
    value: 18,
    dataType: 'Number',
    description: 'The width of the color legend key, in pixels.',
    defaultValue: 18,
    min: 5,
    max: 150
  }
]);