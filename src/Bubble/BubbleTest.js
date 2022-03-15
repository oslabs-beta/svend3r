import * as d3 from 'd3';

const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');

const data = {
  nodes: [
    {letter: 'A', radius: 10, color : 'red'},
    {letter: 'B', radius: 20, color : 'blue'},
    {letter: 'C', radius: 30, color : 'green'},
    {letter: 'D', radius: 40, color : 'yellow'},
    {letter: 'E', radius: 50, color : 'gold'},
    {letter: 'F', radius: 40, color : 'purple'},
    {letter: 'G', radius: 30, color : 'navy'},
    {letter: 'H', radius: 20, color : 'orange'},
  ],
};

const simulation = d3
//force simulation takes our data as a parameter and forces are applied to it to create movement in our nodes
  .forceSimulation(data.nodes)
  .force('charge', d3.forceManyBody().strength(300))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collide', d3.forceCollide((d)=>d.radius).strength(.9))
  .on('tick', ticked);

const drag = d3
  .drag()
  .on('start', dragStarted)
  .on('drag', dragging)
  .on('end', dragEnded);

const textAndNodes = svg
  .append('g')
  .selectAll('g')
  .data(data.nodes)
  .enter()
  .append('g')
  .call(drag);

const circles = textAndNodes
  .append('circle')
  .attr('r', (d)=> d.radius)
  .attr('fill', (d)=> d.color);

const text = textAndNodes
  .append('text')
  .text((d)=>d.letter);

function ticked() {
  textAndNodes
    .attr('transform', (d)=> 'translate(' + d.x + ',' + d.y + ')');
}

function dragStarted(d){
  if(!d3.event.active) simulation.alphaTarget(0.3).restart();
  //fx,fx fix the position of the node and stop any more force that may have been applied otherwise
  //this function will work using x and y but the node will continue to move after the tick function is finished execution
  d.fx = d.x;
  d.fy = d.y;
}

function dragging(d){
//set the node to the current mouse position
//fx and fy are assigned when using the force simulation function
//at the end of every instance of the tick function, 
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragEnded(d){
  if(!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

