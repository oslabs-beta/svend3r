<script>
	import { ChartDocs } from './ChartStore';

  export let properties;

  console.log(properties);

  properties.forEach((prop) => {
    ChartDocs.update(obj => ([...obj, prop]));
  })
</script>