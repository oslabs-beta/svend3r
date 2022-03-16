import { writable } from 'svelte/store';

export const BarChartDocs = writable([
  {
    variable: 'data',
    value: 'sampleData',
    dataType: 'Array',
    description: 'An array of objects with x-axis and y-axis key value pairs.',
    defaultValue: 'sampleData'  
  },
  {
    variable: 'marginTop',
    value: 20,
    dataType: 'Number',
    description: 'The top margin, in pixels.',
    defaultValue: 20,
    min: 15,
    max: 80
  },
  {
    variable: 'marginRight',
    value: 0,
    dataType: 'Number',
    description: 'The right margin, in pixels.',
    defaultValue: 0,
    min: -5,
    max: 150
  },
  {
    variable: 'marginBottom',
    value: 30,
    dataType: 'Number',
    description: 'The bottom margin, in pixels.',
    defaultValue: 30,
    min: 20,
    max: 50
  },
  {
    variable: 'marginLeft',
    value: 40,
    dataType: 'Number',
    description: 'The left margin, in pixels.',
    defaultValue: 40,
    min: 30,
    max: 100
  },
  {
    variable: 'width',
    value: 600,
    dataType: 'Number',
    description: 'The outer width of the chart, in pixels.',
    defaultValue: 600,
    min: 570,
    max: 700
  },
  {
    variable: 'height',
    value: 300,
    dataType: 'Number',
    description: 'The outer height of the chart, in pixels.',
    defaultValue: 300,
    min: 160,
    max: 380
  },
  {
    variable: 'xPadding',
    value: 0.2,
    dataType: 'Number',
    description: 'The amount of seperation in the x-range between each bar.',
    defaultValue: 0.2,
    max: 0.9
  },
  {
    variable: 'yFormat',
    value: '%',
    dataType: 'String',
    description: 'The format specifier string attached to the end of each y-axis value.',
    defaultValue: '%',
  },
  {
    variable: 'yLabel',
    value: '↑ Frequency',
    dataType: 'String',
    description: 'The label for the y-axis.',
    defaultValue: '↑ Frequency',
  },
  {
    variable: 'color',
    value: 'steelblue',
    dataType: 'String | RGB | Hex',
    description: 'The left margin, in pixels.',
    defaultValue: 'steelblue',
  },
  {
    variable: 'yScalefactor',
    value: 2,
    dataType: 'Number',
    description: 'The number of y-axis values.',
    defaultValue: 2,
    max: 12
  }
]);