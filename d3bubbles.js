/*  global d3 */
function insertBubbles(data) { //eslint-disable-line no-unused-vars
  var el = window.document.querySelector('.chart');

  var height = 400;
  var width = 600;
  var margin = 70;

  var labelX = 'Official Development Assistance (USD in Millions)';
  var labelY = 'Level of Usefulness of Advice (1-5)';

  var svg = d3.select('.chart')
    .append('svg')
    .attr('attr', 'chart')
    .attr('width', width + 2 * margin)
    .attr('height', height + 2 * margin)
    .append('g')
    .style('font-family', 'Helvetica')
    .style('font-size', '12px')
    .attr('transform', 'translate(' + margin + ',' + margin + ')');

  var text = svg.selectAll('text')
    .data(data)
    .enter()
    .append('text');

  var x = d3.scale.linear()
    .domain([
      d3.min(data, function(d) { return d.oda; }),
      d3.max(data, function(d) { return d.oda; })
    ])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([
      d3.min(data, function(d) { return d.q14; }),
      d3.max(data, function(d) { return d.q14; })
    ])
    .range([height, 0]);

  var scale = d3.scale.linear()
    .domain([
      d3.min(data, function(d) { return d.q21; }),
      d3.max(data, function(d) { return d.q21; })
    ])
    .range([0, 20]);

  var xAxis = d3.svg.axis().scale(x);
  var yAxis = d3.svg.axis().scale(y).orient('left');

  // y axis
  svg.append('g')
    .attr('class', 'y axis')
    .style('shape-rendering', 'crispEdges')
    .style('stroke', '#000')
    .style('fill', 'none')
    .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin + 15)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .text(labelY);

  // x axis
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .style('shape-rendering', 'crispEdges')
    .style('stroke', '#000')
    .style('fill', 'none')
    .call(xAxis)
    .append('text')
      .attr('x', width / 2)
      .attr('y', margin - 30)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .text(labelX);

  // circles
  svg.selectAll('circle')
    .data(data)
    .enter()
    .insert('circle')
    .attr('opacity', 0.8)
    .attr('r', function(d) { return scale(d.q21) * 2; })
    .style('fill', function(d) {
      switch (d.donor) {
        case 'dac':
          return '#76b657';
        case 'nonDac':
          return '#92b5d8';
        case 'multi':
          return '#e66233';
        default:
          if (d.type === 'dac') {
            return '#76b657';
          } else if (d.type === 'nonDac') {
            return '#92b5d8';
          } else {
            return '#e66233';
          }
      }
    })
    .attr('cx', function(d) { return x(d.oda); })
    .attr('cy', function(d) { return y(d.q14); });

  // bubble labels
  text
    .text(function(d) { return d.donor; })
    .attr('x', function(d) { return x(d.oda); })
    .attr('y', function(d) { return y(d.q14); })
    .style('text-anchor', 'middle');

  return el.firstChild;
}
