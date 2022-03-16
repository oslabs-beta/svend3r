const csv = `Ages,Count
<5,19736
5-9,20212
10-14,20827
15-19,20849
20-24,21254
25-29,23277
30-34,21932
35-39,21443
40-44,19584
45-49,20345
50-54,20355
55-59,21163
60-64,20592
65-69,17356
70-74,14131
75-79,9357
80-84,6050
≥85,5893`;

const data = csv
  .split('\n')
  .slice(1)
  .map((str) => {
    const [ages, count] = str.split(',');
    return { ages, count };
  });

export default data;
