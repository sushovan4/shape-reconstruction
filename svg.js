/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/

// Draw Complex
function drawComplex( ) {
    $('svg .edge').remove( );
    $('svg .triangle').remove( );
    svg.selectAll(".edge")
	.data(simplices[1])
	.enter( ).append("line")
	.attr("class", "edge")
	.attr("x1", function(d) { return sample[d[0]][0] })
	.attr("y1", function(d) { return sample[d[0]][1] })
    	.attr("x2", function(d) { return sample[d[1]][0] })
	.attr("y2", function(d) { return sample[d[1]][1] })

    simplices[2].forEach(function(t) {
    var line = d3.line( );
	svg.append("path")
	    .attr("class", "triangle")
	    .attr("d", line(d3.permute(sample, t)));
    });
}

// Draw Balls
function drawBalls(radius) {
    if ( !ballsVisible )
	return;
    
    $('svg .ball').remove( );
    svg.selectAll(".ball")
	.data(sample)
	.enter( ).append("circle")
	.attr("class", "ball")
	.attr("cx", function(d) { return d[0] })
	.attr("cy", function(d) { return d[1] })    
	.attr("r", radius);	
}

// Draw shape
function drawShape( ) {
    $('svg .shape').remove( );
    if ( !shapeVisible )
	return;
    
    var line = d3.line( );
    svg.append("path")
	.attr("class", "shape")
	.attr("d", line(shape));
}

// Draw sample
function drawSampe( ) {
    svg.selectAll(".sample")
    	.data(sample)
    	.join("circle")
    	.attr("class", "sample")
    	.attr("cx", function(d) { return d[0] })
    	.attr("cy", function(d) { return d[1] })    
    	.attr("r", 3)
}
