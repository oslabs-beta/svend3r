<script>
    import Prism from 'prismjs';
    import { radialStackedChartDocs } from './RadialStacked_Store.js';
  
    $: code = `<script>
  import * as d3 from "d3";
  import { sampleData } from "./sampleData.js"; //import your custom dataset
   
  let data = sampleData;
  let width = ${$radialStackedChartDocs[1].value}; //the width of the inner radius inversed, in pixels
  let height = width; //the outer height of the chart, in pixels
  let innerRadius = ${$radialStackedChartDocs[2].value}; //the radius of the inner circle, in pixels
  let colorRange = [${"'" + $radialStackedChartDocs[3].value.join("','") + "'"}]; //the fill colors for each bar stack.  The colorRange array length  MUST match number of datasets
  let chartScale = ${$radialStackedChartDocs[4].value}; //the scale factor from the center
  let sorted = ${$radialStackedChartDocs[5].value}; //the boolean value for if the dataset is sorted
  let varFontSize = ${$radialStackedChartDocs[6].value}; //the font size of all text on the chart, in pixels
  let tickColor = "${$radialStackedChartDocs[7].value}"; //the color of the inner radius ticks
  let ringColor = "${$radialStackedChartDocs[8].value}"; //the color of the scale rings
  let scaleColor = "${$radialStackedChartDocs[9].value}"; //the color of the scale text
  let scaleStroke = "${$radialStackedChartDocs[10].value}"; //the color of the scale text background/stroke
  let rectLength = ${$radialStackedChartDocs[11].value}; //the width of the color legend key, in pixels
    
  let outerRadius = Math.min(width, height) * chartScale;

  if(sorted === true) {
    data = data.sort((a, b) => b.total - a.total)
  }
  
  data.columns = Object.keys(sampleData[0]).slice(0,-1);

  let arc = d3.arc()
      .innerRadius(d => y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.State))
      .endAngle(d => x(d.data.State) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius)

  let x = d3.scaleBand()
      .domain(data.map(d => d.State))
      .range([0, 2 * Math.PI])
      .align(0)

  let y = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])

  let z = d3.scaleOrdinal()
      .domain(data.columns.slice(1))
      .range(colorRange)
<\/script>

  <svg class="radial-chart" viewBox="{-width / 2} {-height * chartScale} {width} {height}" font-size="{varFontSize}px">
    <g class="chart-render">
      {#each d3.stack().keys(data.columns.slice(1))(data) as cData}
        <g fill={z(cData.key)}>
          {#each cData as d}
            <path d={arc(d)}></path>
          {/each}
        </g>
      {/each}
    </g>
    <g class="x-axis" text-anchor="middle">
      {#each data as d}
        <g transform="
        rotate({((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
        translate({innerRadius},0)
      ">
        <line x2="-5" stroke={tickColor}></line>
        <text transform={(x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
        ? "rotate(90) translate(0,16)"
        : "rotate(-90) translate(0,-9)"}>{d.State}</text>
        </g>
      {/each}
    </g>
    <g class="y-axis" text-anchor="end">
      <text x ="-6" y={-y(y.ticks(10).pop())} dy="-1em">Population</text>
      {#each y.ticks(10).slice(1) as ydata}
        <g fill="none" ytick={y.ticks(10).slice(1)}>
          <circle stroke={ringColor} stroke-opacity="0.5" r={y(ydata)}></circle>
          <text x="-6" y={-y(ydata)} dy="0.35em" stroke={scaleStroke} stroke-width="5" fill={scaleColor}>{ydata}</text>
          <text x="-6" y={-y(ydata)} dy="0.35em" stroke="none" stroke-width="5" fill={scaleColor}>{ydata}</text>
        </g>
      {/each}
    </g>
    <g class='legend'>
      {#each data.columns.slice(1).reverse() as lData, i}
        <g transform="translate(-40,{(i - (data.columns.length - 1) / 2) * 20})">
          <rect width={rectLength} height="18" fill={z(lData)}></rect>
          <text x="24" y="9" dy="0.35em">{lData}</text>
        </g>
      {/each}
    </g>
  </svg>

<style>

</style>
`;
  
    // outputs the content of the text file
  
    const data = `const sampleData = [
  {
    State: 'AL',
    'Under 5 Years': 310504,
    '5 to 13 Years': 552339,
    '14 to 17 Years': 259034,
    '18 to 24 Years': 450818,
    '25 to 44 Years': 1231572,
    '45 to 64 Years': 1215966,
    '65 Years and Over': 641667,
    total: 4661900,
  },
  {
    State: 'AK',
    'Under 5 Years': 52083,
    '5 to 13 Years': 85640,
    '14 to 17 Years': 42153,
    '18 to 24 Years': 74257,
    '25 to 44 Years': 198724,
    '45 to 64 Years': 183159,
    '65 Years and Over': 50277,
    total: 686293,
  },
  {
    State: 'AZ',
    'Under 5 Years': 515910,
    '5 to 13 Years': 828669,
    '14 to 17 Years': 362642,
    '18 to 24 Years': 601943,
    '25 to 44 Years': 1804762,
    '45 to 64 Years': 1523681,
    '65 Years and Over': 862573,
    total: 6500180,
  },
  {
    State: 'AR',
    'Under 5 Years': 202070,
    '5 to 13 Years': 343207,
    '14 to 17 Years': 157204,
    '18 to 24 Years': 264160,
    '25 to 44 Years': 754420,
    '45 to 64 Years': 727124,
    '65 Years and Over': 407205,
    total: 2855390,
  },
  {
    State: 'CA',
    'Under 5 Years': 2704659,
    '5 to 13 Years': 4499890,
    '14 to 17 Years': 2159981,
    '18 to 24 Years': 3853788,
    '25 to 44 Years': 10604510,
    '45 to 64 Years': 8819342,
    '65 Years and Over': 4114496,
    total: 36756666,
  },
  {
    State: 'CO',
    'Under 5 Years': 358280,
    '5 to 13 Years': 587154,
    '14 to 17 Years': 261701,
    '18 to 24 Years': 466194,
    '25 to 44 Years': 1464939,
    '45 to 64 Years': 1290094,
    '65 Years and Over': 511094,
    total: 4939456,
  },
  {
    State: 'CT',
    'Under 5 Years': 211637,
    '5 to 13 Years': 403658,
    '14 to 17 Years': 196918,
    '18 to 24 Years': 325110,
    '25 to 44 Years': 916955,
    '45 to 64 Years': 968967,
    '65 Years and Over': 478007,
    total: 3501252,
  },
  {
    State: 'DE',
    'Under 5 Years': 59319,
    '5 to 13 Years': 99496,
    '14 to 17 Years': 47414,
    '18 to 24 Years': 84464,
    '25 to 44 Years': 230183,
    '45 to 64 Years': 230528,
    '65 Years and Over': 121688,
    total: 873092,
  },
  {
    State: 'DC',
    'Under 5 Years': 36352,
    '5 to 13 Years': 50439,
    '14 to 17 Years': 25225,
    '18 to 24 Years': 75569,
    '25 to 44 Years': 193557,
    '45 to 64 Years': 140043,
    '65 Years and Over': 70648,
    total: 591833,
  },
  {
    State: 'FL',
    'Under 5 Years': 1140516,
    '5 to 13 Years': 1938695,
    '14 to 17 Years': 925060,
    '18 to 24 Years': 1607297,
    '25 to 44 Years': 4782119,
    '45 to 64 Years': 4746856,
    '65 Years and Over': 3187797,
    total: 18328340,
  },
  {
    State: 'GA',
    'Under 5 Years': 740521,
    '5 to 13 Years': 1250460,
    '14 to 17 Years': 557860,
    '18 to 24 Years': 919876,
    '25 to 44 Years': 2846985,
    '45 to 64 Years': 2389018,
    '65 Years and Over': 981024,
    total: 9685744,
  },
  {
    State: 'HI',
    'Under 5 Years': 87207,
    '5 to 13 Years': 134025,
    '14 to 17 Years': 64011,
    '18 to 24 Years': 124834,
    '25 to 44 Years': 356237,
    '45 to 64 Years': 331817,
    '65 Years and Over': 190067,
    total: 1288198,
  },
  {
    State: 'ID',
    'Under 5 Years': 121746,
    '5 to 13 Years': 201192,
    '14 to 17 Years': 89702,
    '18 to 24 Years': 147606,
    '25 to 44 Years': 406247,
    '45 to 64 Years': 375173,
    '65 Years and Over': 182150,
    total: 1523816,
  },
  {
    State: 'IL',
    'Under 5 Years': 894368,
    '5 to 13 Years': 1558919,
    '14 to 17 Years': 725973,
    '18 to 24 Years': 1311479,
    '25 to 44 Years': 3596343,
    '45 to 64 Years': 3239173,
    '65 Years and Over': 1575308,
    total: 12901563,
  },
  {
    State: 'IN',
    'Under 5 Years': 443089,
    '5 to 13 Years': 780199,
    '14 to 17 Years': 361393,
    '18 to 24 Years': 605863,
    '25 to 44 Years': 1724528,
    '45 to 64 Years': 1647881,
    '65 Years and Over': 813839,
    total: 6376792,
  },
  {
    State: 'IA',
    'Under 5 Years': 201321,
    '5 to 13 Years': 345409,
    '14 to 17 Years': 165883,
    '18 to 24 Years': 306398,
    '25 to 44 Years': 750505,
    '45 to 64 Years': 788485,
    '65 Years and Over': 444554,
    total: 3002555,
  },
  {
    State: 'KS',
    'Under 5 Years': 202529,
    '5 to 13 Years': 342134,
    '14 to 17 Years': 155822,
    '18 to 24 Years': 293114,
    '25 to 44 Years': 728166,
    '45 to 64 Years': 713663,
    '65 Years and Over': 366706,
    total: 2802134,
  },
  {
    State: 'KY',
    'Under 5 Years': 284601,
    '5 to 13 Years': 493536,
    '14 to 17 Years': 229927,
    '18 to 24 Years': 381394,
    '25 to 44 Years': 1179637,
    '45 to 64 Years': 1134283,
    '65 Years and Over': 565867,
    total: 4269245,
  },
  {
    State: 'LA',
    'Under 5 Years': 310716,
    '5 to 13 Years': 542341,
    '14 to 17 Years': 254916,
    '18 to 24 Years': 471275,
    '25 to 44 Years': 1162463,
    '45 to 64 Years': 1128771,
    '65 Years and Over': 540314,
    total: 4410796,
  },
  {
    State: 'ME',
    'Under 5 Years': 71459,
    '5 to 13 Years': 133656,
    '14 to 17 Years': 69752,
    '18 to 24 Years': 112682,
    '25 to 44 Years': 331809,
    '45 to 64 Years': 397911,
    '65 Years and Over': 199187,
    total: 1316456,
  },
  {
    State: 'MD',
    'Under 5 Years': 371787,
    '5 to 13 Years': 651923,
    '14 to 17 Years': 316873,
    '18 to 24 Years': 543470,
    '25 to 44 Years': 1556225,
    '45 to 64 Years': 1513754,
    '65 Years and Over': 679565,
    total: 5633597,
  },
  {
    State: 'MA',
    'Under 5 Years': 383568,
    '5 to 13 Years': 701752,
    '14 to 17 Years': 341713,
    '18 to 24 Years': 665879,
    '25 to 44 Years': 1782449,
    '45 to 64 Years': 1751508,
    '65 Years and Over': 871098,
    total: 6497967,
  },
  {
    State: 'MI',
    'Under 5 Years': 625526,
    '5 to 13 Years': 1179503,
    '14 to 17 Years': 585169,
    '18 to 24 Years': 974480,
    '25 to 44 Years': 2628322,
    '45 to 64 Years': 2706100,
    '65 Years and Over': 1304322,
    total: 10003422,
  },
  {
    State: 'MN',
    'Under 5 Years': 358471,
    '5 to 13 Years': 606802,
    '14 to 17 Years': 289371,
    '18 to 24 Years': 507289,
    '25 to 44 Years': 1416063,
    '45 to 64 Years': 1391878,
    '65 Years and Over': 650519,
    total: 5220393,
  },
  {
    State: 'MS',
    'Under 5 Years': 220813,
    '5 to 13 Years': 371502,
    '14 to 17 Years': 174405,
    '18 to 24 Years': 305964,
    '25 to 44 Years': 764203,
    '45 to 64 Years': 730133,
    '65 Years and Over': 371598,
    total: 2938618,
  },
  {
    State: 'MO',
    'Under 5 Years': 399450,
    '5 to 13 Years': 690476,
    '14 to 17 Years': 331543,
    '18 to 24 Years': 560463,
    '25 to 44 Years': 1569626,
    '45 to 64 Years': 1554812,
    '65 Years and Over': 805235,
    total: 5911605,
  },
  {
    State: 'MT',
    'Under 5 Years': 61114,
    '5 to 13 Years': 106088,
    '14 to 17 Years': 53156,
    '18 to 24 Years': 95232,
    '25 to 44 Years': 236297,
    '45 to 64 Years': 278241,
    '65 Years and Over': 137312,
    total: 967440,
  },
  {
    State: 'NE',
    'Under 5 Years': 132092,
    '5 to 13 Years': 215265,
    '14 to 17 Years': 99638,
    '18 to 24 Years': 186657,
    '25 to 44 Years': 457177,
    '45 to 64 Years': 451756,
    '65 Years and Over': 240847,
    total: 1783432,
  },
  {
    State: 'NV',
    'Under 5 Years': 199175,
    '5 to 13 Years': 325650,
    '14 to 17 Years': 142976,
    '18 to 24 Years': 212379,
    '25 to 44 Years': 769913,
    '45 to 64 Years': 653357,
    '65 Years and Over': 296717,
    total: 2600167,
  },
  {
    State: 'NH',
    'Under 5 Years': 75297,
    '5 to 13 Years': 144235,
    '14 to 17 Years': 73826,
    '18 to 24 Years': 119114,
    '25 to 44 Years': 345109,
    '45 to 64 Years': 388250,
    '65 Years and Over': 169978,
    total: 1315809,
  },
  {
    State: 'NJ',
    'Under 5 Years': 557421,
    '5 to 13 Years': 1011656,
    '14 to 17 Years': 478505,
    '18 to 24 Years': 769321,
    '25 to 44 Years': 2379649,
    '45 to 64 Years': 2335168,
    '65 Years and Over': 1150941,
    total: 8682661,
  },
  {
    State: 'NM',
    'Under 5 Years': 148323,
    '5 to 13 Years': 241326,
    '14 to 17 Years': 112801,
    '18 to 24 Years': 203097,
    '25 to 44 Years': 517154,
    '45 to 64 Years': 501604,
    '65 Years and Over': 260051,
    total: 1984356,
  },
  {
    State: 'NY',
    'Under 5 Years': 1208495,
    '5 to 13 Years': 2141490,
    '14 to 17 Years': 1058031,
    '18 to 24 Years': 1999120,
    '25 to 44 Years': 5355235,
    '45 to 64 Years': 5120254,
    '65 Years and Over': 2607672,
    total: 19490297,
  },
  {
    State: 'NC',
    'Under 5 Years': 652823,
    '5 to 13 Years': 1097890,
    '14 to 17 Years': 492964,
    '18 to 24 Years': 883397,
    '25 to 44 Years': 2575603,
    '45 to 64 Years': 2380685,
    '65 Years and Over': 1139052,
    total: 9222414,
  },
  {
    State: 'ND',
    'Under 5 Years': 41896,
    '5 to 13 Years': 67358,
    '14 to 17 Years': 33794,
    '18 to 24 Years': 82629,
    '25 to 44 Years': 154913,
    '45 to 64 Years': 166615,
    '65 Years and Over': 94276,
    total: 641481,
  },
  {
    State: 'OH',
    'Under 5 Years': 743750,
    '5 to 13 Years': 1340492,
    '14 to 17 Years': 646135,
    '18 to 24 Years': 1081734,
    '25 to 44 Years': 3019147,
    '45 to 64 Years': 3083815,
    '65 Years and Over': 1570837,
    total: 11485910,
  },
  {
    State: 'OK',
    'Under 5 Years': 266547,
    '5 to 13 Years': 438926,
    '14 to 17 Years': 200562,
    '18 to 24 Years': 369916,
    '25 to 44 Years': 957085,
    '45 to 64 Years': 918688,
    '65 Years and Over': 490637,
    total: 3642361,
  },
  {
    State: 'OR',
    'Under 5 Years': 243483,
    '5 to 13 Years': 424167,
    '14 to 17 Years': 199925,
    '18 to 24 Years': 338162,
    '25 to 44 Years': 1044056,
    '45 to 64 Years': 1036269,
    '65 Years and Over': 503998,
    total: 3790060,
  },
  {
    State: 'PA',
    'Under 5 Years': 737462,
    '5 to 13 Years': 1345341,
    '14 to 17 Years': 679201,
    '18 to 24 Years': 1203944,
    '25 to 44 Years': 3157759,
    '45 to 64 Years': 3414001,
    '65 Years and Over': 1910571,
    total: 12448279,
  },
  {
    State: 'RI',
    'Under 5 Years': 60934,
    '5 to 13 Years': 111408,
    '14 to 17 Years': 56198,
    '18 to 24 Years': 114502,
    '25 to 44 Years': 277779,
    '45 to 64 Years': 282321,
    '65 Years and Over': 147646,
    total: 1050788,
  },
  {
    State: 'SC',
    'Under 5 Years': 303024,
    '5 to 13 Years': 517803,
    '14 to 17 Years': 245400,
    '18 to 24 Years': 438147,
    '25 to 44 Years': 1193112,
    '45 to 64 Years': 1186019,
    '65 Years and Over': 596295,
    total: 4479800,
  },
  {
    State: 'SD',
    'Under 5 Years': 58566,
    '5 to 13 Years': 94438,
    '14 to 17 Years': 45305,
    '18 to 24 Years': 82869,
    '25 to 44 Years': 196738,
    '45 to 64 Years': 210178,
    '65 Years and Over': 116100,
    total: 804194,
  },
  {
    State: 'TN',
    'Under 5 Years': 416334,
    '5 to 13 Years': 725948,
    '14 to 17 Years': 336312,
    '18 to 24 Years': 550612,
    '25 to 44 Years': 1719433,
    '45 to 64 Years': 1646623,
    '65 Years and Over': 819626,
    total: 6214888,
  },
  {
    State: 'TX',
    'Under 5 Years': 2027307,
    '5 to 13 Years': 3277946,
    '14 to 17 Years': 1420518,
    '18 to 24 Years': 2454721,
    '25 to 44 Years': 7017731,
    '45 to 64 Years': 5656528,
    '65 Years and Over': 2472223,
    total: 24326974,
  },
  {
    State: 'UT',
    'Under 5 Years': 268916,
    '5 to 13 Years': 413034,
    '14 to 17 Years': 167685,
    '18 to 24 Years': 329585,
    '25 to 44 Years': 772024,
    '45 to 64 Years': 538978,
    '65 Years and Over': 246202,
    total: 2736424,
  },
  {
    State: 'VT',
    'Under 5 Years': 32635,
    '5 to 13 Years': 62538,
    '14 to 17 Years': 33757,
    '18 to 24 Years': 61679,
    '25 to 44 Years': 155419,
    '45 to 64 Years': 188593,
    '65 Years and Over': 86649,
    total: 621270,
  },
  {
    State: 'VA',
    'Under 5 Years': 522672,
    '5 to 13 Years': 887525,
    '14 to 17 Years': 413004,
    '18 to 24 Years': 768475,
    '25 to 44 Years': 2203286,
    '45 to 64 Years': 2033550,
    '65 Years and Over': 940577,
    total: 7769089,
  },
  {
    State: 'WA',
    'Under 5 Years': 433119,
    '5 to 13 Years': 750274,
    '14 to 17 Years': 357782,
    '18 to 24 Years': 610378,
    '25 to 44 Years': 1850983,
    '45 to 64 Years': 1762811,
    '65 Years and Over': 783877,
    total: 6549224,
  },
  {
    State: 'WV',
    'Under 5 Years': 105435,
    '5 to 13 Years': 189649,
    '14 to 17 Years': 91074,
    '18 to 24 Years': 157989,
    '25 to 44 Years': 470749,
    '45 to 64 Years': 514505,
    '65 Years and Over': 285067,
    total: 1814468,
  },
  {
    State: 'WI',
    'Under 5 Years': 362277,
    '5 to 13 Years': 640286,
    '14 to 17 Years': 311849,
    '18 to 24 Years': 553914,
    '25 to 44 Years': 1487457,
    '45 to 64 Years': 1522038,
    '65 Years and Over': 750146,
    total: 5627967,
  },
  {
    State: 'WY',
    'Under 5 Years': 38253,
    '5 to 13 Years': 60890,
    '14 to 17 Years': 29314,
    '18 to 24 Years': 53980,
    '25 to 44 Years': 137338,
    '45 to 64 Years': 147279,
    '65 Years and Over': 65614,
    total: 532668,
  },
];

export { sampleData };
`;
  
  function showCode(id) {
      if(id === 'page1') {
        document.getElementById('page1_desc').style.display = 'block';
        document.getElementById('page2_desc').style.display = 'none';
      } else {
        document.getElementById('page1_desc').style.display = 'none';
        document.getElementById('page2_desc').style.display = 'block';
      }
  }
  
  </script>
  
  <button class="page_selected" id="page1" on:click={() => showCode('page1')}>Code</button><!--
  --><button class="page_selected" id="page2" on:click={() => showCode('page2')}>Data</button>
  
  <pre id="page1_desc" class="codeMirror" contenteditable><!--
  --><code class="language-javascript"
      ><!--
       -->{@html Prism.highlight(
        code,
        Prism.languages['javascript']
      )}<!--
   --></code
    ><!--
  --></pre>
  
  <pre id="page2_desc" class="codeMirror" contenteditable><!--
  --><code class="language-javascript"
      ><!--
       -->{@html Prism.highlight(
        data,
        Prism.languages['javascript']
      )}<!--
   --></code
    ><!--
  --></pre>
  
  <style>
  .codeMirror {
    white-space: pre-wrap;
  }
  
  #page2_desc {
    display: none;
  }
  
  .page_selected {
    width: 50%;
    border-style: none;
    border-radius: 0;
    background-color: #494949;
    color: rgba(255, 255, 255, 0.87);
  }
  
  #page2{
    border-left: #1E1E1E;
    border-left-width: 2px;
    border-left-style: solid;
  }
  
  .page_selected:hover {
    background-color: #1E1E1E;
    color: rgba(255, 255, 255, 0.87);
  }
  
  </style>
  