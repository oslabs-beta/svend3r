const csvNortheast = 
  `Year,Population
  1920,29.662053
  1930,34.427091
  1940,35.976777
  1950,39.477986
  1960,44.677819
  1970,49.040703
  1980,49.135283
  1990,50.809229
  2000,53.594378
  2010,55.317240
  2020,57.609148`;

const csvMidwest = 
  `Year,Population
  1920,34.019792
  1930,38.594100
  1940,40.143332
  1950,44.460762
  1960,51.619139
  1970,56.571663
  1980,58.865670
  1990,59.668632
  2000,64.392776
  2010,66.927001
  2020,68.985454`;

const csvSouth = 
  `Year,Population
  1920,33.125803
  1930,37.857633
  1940,41.665901
  1950,47.197088
  1960,54.973113
  1970,62.795367
  1980,75.372362
  1990,85.445930
  2000,100.236820
  2010,114.555744
  2020,126.266107`;

const csvWest = 
  `Year,Population
  1920,9.213920
  1930,12.323836
  1940,14.379119
  1950,20.189962
  1960,28.053104
  1970,34.804193
  1980,43.172490
  1990,52.786082
  2000,63.197932
  2010,71.945553
  2020,78.588572`;

function csvConvert(csv) {
  return csv.split('\n').slice(1).map(str => {
    const [date, population] = str.split(',')
    .map((el) => (el > 1900 ? new Date(el, 0) : parseFloat(el)));
    return { date, population };
  });
}
const northeast = csvConvert(csvNortheast);
const midwest = csvConvert(csvMidwest);
const south = csvConvert(csvSouth);
const west = csvConvert(csvWest);

export default [
  {
    id: 'Northeast',
    data: northeast
  },
  {
    id: 'Midwest',
    data: midwest
  },
  {
    id: 'South',
    data: south
  },
  {
    id: 'West',
    data: west
  }
]