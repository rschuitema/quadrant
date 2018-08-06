d3.csv('data.csv', function (data) {
  // Variables
  var body = d3.select('body')
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 500 - margin.top - margin.bottom
	var w = 500 - margin.left - margin.right
	var formatPercent = d3.format('.2%')
	// Scales
  var colorScale = d3.scale.linear()
      .domain([0, 50, 75, 100])
      .range(["#79B94F", "#FFCC05", "#FB8738", "#CC0505"])
      
  var xScale = d3.scale.linear()
    .domain([-100, 100])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([-100, 100])
    .range([h,0])
	// SVG
	var svg = body.append('svg')
	    .attr('height',h + margin.top + margin.bottom)
	    .attr('width',w + margin.left + margin.right)
	  .append('g')
	    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
	// X-axis
	var xAxis = d3.svg.axis()
	  .scale(xScale)
	  .orient('bottom')
      
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + h / 2 + ")")
      .call(xAxis);

  // Y-axis
	var yAxis = d3.svg.axis()
	  .scale(yScale)
	  .orient('left')
      

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + w / 2 + "," + 0 + ")")
      .call(yAxis)
      .append("text");

  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx', function (d) { return xScale(d.x)})
      .attr('cy', function (d) { return yScale(d.y)})
      .attr('r',  function (d) { return d.size})
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d) { return colorScale(d.complexity) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          //.attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',function (d) { return d.size})
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.item +
                           '\nSize: ' + (d.size) +
                           '\nComplexity: ' + (d.complexity) })
})