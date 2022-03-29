<script>
	import { ChartDocs } from './ChartStore';

  export let properties;

  // import { getContext } from 'svelte';
  // $: currentChart = getContext('currentChart');
  // $: console.log('storemaker chart', currentChart);
  // $: ({ properties } = currentChart);
  // console.log('storemaker', properties, $ChartDocs);

  // This resets the store
  ChartDocs.update(obj => []);

  properties.forEach((prop) => {
    ChartDocs.update(obj => ([...obj, prop]));
  })
  console.log('storemaker', $ChartDocs);
  // console.log('storemaker', $ChartDocs);
</script>