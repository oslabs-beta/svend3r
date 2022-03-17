// import area from '$lib/charts/db/area';
// /** @type {import('@sveltejs/kit').RequestHandler} */
// export function get({ params }) {
//   return {
//     body: area
//   } 
// }

import area from '$lib/charts/db/area.json';
import bar from '$lib/charts/db/bar.json';
import chord from '$lib/charts/db/chord.json';
import radialStacked from '$lib/charts/db/radialStacked.json';
/** @type {import('@sveltejs/kit').RequestHandler} */
// export async function get({ params }) {
// 	const chart = await fetch(``);

// 	return {
// 		body: {
// 			prev,
// 			next,
// 			section: {
// 				file: section.file,
// 				title: section.title,
// 				content: section.content
// 			}
// 		}
// 	};
// }
export function get({ params }) {
  // console.log('slug.json', params.slug);
  const charts = {
    area: area,
    bar: bar,
    chord: chord,
    radialStacked: radialStacked
  }
  return {
    body: charts[params.slug]
  } 
}