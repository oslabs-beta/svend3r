// Alphabet 2021 Q3 revenue by segment
const csv = `Segment, Chart Value, Earnings Amount & Percent Change
Google Search,37.93,37.93 billion (up 44%)
YouTube Ads,7.2,7.2 billion (up 43%)
Google Network,8,8 billion (up 39.8%)
Google Cloud,4.99,4.99 billion (up 44.9%)
Google Other,6.75,6.75 billion (up 23.2%)
Other Bets,.182,182 million (up 2.2%)`;


const data = csv.split('\n').slice(1).map(str => {
  const [segment, chartValue, earnings] = str.split(',');//.forEach(ele => { return ele = ele.trim() })
  return { segment, chartValue, earnings };
});
  
console.table(data);