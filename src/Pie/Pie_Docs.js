
const dataSchema = `    const data = [
    { xKey: x-value1, yKey: y-value1 }, 
    { xKey: x-value2, yKey: y-value2 }, 
    { xKey: x-value3, yKey: y-value3 },
    //insert additional JSON data ...
]    `;

const pieChartDocs = [
  {
    variable: 'data',
    value: 'sampleData',
    dataType: 'Array',
    description: 'An array of objects with x-axis and y-axis key value pairs.',
    defaultValue: 'sampleData',
  },
  {
    variable: 'width',
    value: 600,
    dataType: 'Number',
    description: 'The outer width of the chart, in pixels.',
    defaultValue: 600,
    min: 570,
    max: 700,
  },
  {
    variable: 'percent',
    value: false,
    dataType: 'Boolean',
    description: 'Format y values as percentages.',
    defaultValue: false,
  },
  {
    variable: 'fontSize',
    value: 10,
    dataType: 'Number',
    description: 'The stroke width of line, in pixels.',
    defaultValue: 10,
    max: 50,
  },
  {
    variable: 'strokeWidth',
    value: 1,
    dataType: 'Number',
    description: 'The stroke width of line, in pixels.',
    defaultValue: 1,
    max: 10,
  },
  {
    variable: 'innerRadius',
    value: 0,
    dataType: 'Number',
    description: 'The inner radius of the chart, in pixels.',
    defaultValue: 0,
    max: 500,
  },
  {
    variable: 'strokeColorWOR',
    value: 'white',
    dataType: 'String | RGB | Hex',
    description: 'The stroke color when inner radius is greater than 0.',
    defaultValue: 'white',
  },
  {
    variable: 'strokeColorWIR',
    value: 'white',
    dataType: 'String | RGB | Hex',
    description: 'The stroke color when inner radius is 0.',
    defaultValue: 'white',
  },
  {
    variable: 'strokeColorWOR',
    value: 0.8,
    dataType: 'Number',
    description: 'The stroke opacity of the line.',
    defaultValue: 0.8,
    max: 0.9,
  }
];