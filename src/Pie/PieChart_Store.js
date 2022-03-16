import { writable } from 'svelte/store';

export const PieChartDocs = writable([
  //create the list of variables that can be modified by the sliders or inputs in the documentation side of the chart page
  {
    variable: 'data',
    value: 'sampleData',
    dataType: 'CSV/Array',
    description:
      'A CSV will need to be parsed to fit the data schema above. The array will hold objects with the first key value pair being the data being tracked and its associated label, the second being the count or frequency and its associated label.',
    defaultValue: 'pie-data-census',
  },
  {
    variable: 'height & width',
    value: 600,
    dataType: 'Number',
    description: 'Height and width of SVG container',
    defaultValue: 600,
    max: 700,
    min: 200,
  },
  {
    variable: 'percent',
    value: true,
    dataType: 'Boolean',
    description: 'Will display data as a percentage or value',
    defaultValue: true,
  },
  {
    variable: 'stroke',
    value: 2,
    dataType: 'Number',
    description: 'The width of the stroke, in pixels.',
    defaultValue: 2,
    max: 10,
    min: 1,
  },
  {
    variable: 'outerRadius',
    value: 0.5,
    dataType: 'Number',
    description: 'Outer Radius of the pie.',
    defaultValue: 0.5,
    max: 1,
    min: 0.1,
  },
  {
    variable: 'innerRadius',
    value: 4,
    dataType: 'Number',
    description: 'The inner width of the negative space, in pixels.',
    defaultValue: 4,
    //may need to fix the min and max properties to be reversed
    max: 1,
    min: 5,
  },
  {
    variable: 'height',
    value: 300,
    dataType: 'Number',
    description: 'The outer height of the chart, in pixels.',
    defaultValue: 300,
    max: 400,
  },
  {
    variable: 'xPadding',
    value: 0.2,
    dataType: 'Number',
    description: 'The amount of seperation in the x-range between each bar.',
    defaultValue: 0.2,
    max: 1,
  },
  {
    variable: 'yFormat',
    value: '%',
    dataType: 'String',
    description:
      'The format specifier string attached to the end of each y-axis value.',
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
    dataType: 'String | Number',
    description: 'The left margin, in pixels.',
    defaultValue: 'steelblue',
  },
  {
    variable: 'yScalefactor',
    value: 6,
    dataType: 'Number',
    description: 'The number of y-axis values.',
    defaultValue: 6,
    max: 12,
  },
]);
