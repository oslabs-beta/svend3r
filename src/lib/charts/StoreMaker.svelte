<script>
	import { ChartDocs } from './ChartStore';

  export let properties;

  // console.log('storemaker pre', properties, $ChartDocs);

  // This resets the store
  ChartDocs.update(obj => []);

  properties.forEach((prop) => {
    ChartDocs.update(obj => ([...obj, prop]));
  })
  console.log('storemaker', $ChartDocs);
  // console.log('storemaker', $ChartDocs);
</script>