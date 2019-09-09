/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/

var settings = {
    shape: {
	'strokeColor' : '#3498DB',
	'strokeWidth' : '1.3'
    },
    sample: {
	'fillColor' : '#566573',
	'opacity'   : '0.6',
	'radius'    : '3'
    },
    rips: {
	'strokeColor' : '#E74C3C',
	'strokeWidth' : '1.3',
	'fillColor'   : '#E74C3C',
	'opacity'    : '0.6'
    },
    ball: {
	'fillColor'   : '#5ddd7b',
	'opacity'     : '0.2',
	'strokeColor' : '#21ba45',
	'strokeWidth' : '2'
    },
    shadow: {
	'fillColor'   : 'blue',
	'strokeColor' : 'blue',
	'strokeWidth' : '3',
	'opacity'    : '1'
    }
}

function drawH2( ){
    var val = H2(shape,sample);
    var points = val[1];
    $('.distance.label').html(Math.floor(val[0]));

    if( !H2Visible )
	return;
    console.log(points);
    eraseH2( );
    if( points.length == 0 )
	return;
    
    svg.append("line")
	.attr("class", "Hausdorff0")
	.attr("x1", points[0][0][0])
	.attr("y1", points[0][0][1])
    	.attr("x2", points[0][1][0])
	.attr("y2", points[0][1][1])
    ;
    svg.append("line")
	.attr("class", "Hausdorff1")
	.attr("x1", points[1][0][0])
	.attr("y1", points[1][0][1])
    	.attr("x2", points[1][1][0])
	.attr("y2", points[1][1][1])
    ;
}

function eraseH2( ){
    $('svg .Hausdorff0').remove( );
    $('svg .Hausdorff1').remove( );
}

function drawSegment(segment) {
  
    var line = d3.line( );
    svg.append("path")
	.attr("class", "shape")
	.attr("fill", "none")
	.attr("stroke", settings.shape.strokeColor)
	.attr("stroke-width", settings.shape.strokeWidth)
	.attr("d", line(segment));
}

// Draw shape
function drawShape( ) {
    if ( !shapeVisible )
	return;
    $('.drawing .shape').remove( );
    shapeSegments.forEach(function(segment){drawSegment(segment)});
}

// Draw sample
function drawSample( ) {
    svg.selectAll(".sample")
    	.data(sample)
    	.join(enter=> enter.append("circle")).transition( ).duration(500)
	.attr("class", "sample")
    	.attr("stroke", "none")
    	.attr("fill", settings.sample.fillColor)
	.attr("opacity", settings.sample.opacity)
    	.attr("cx", function(d) { return d[0] })
    	.attr("cy", function(d) { return d[1] })    
    	.attr("r", settings.sample.radius);
}

// Draw Complex
function drawComplex( ) {
    if ( !complexVisible )
	return;
    
    svg.selectAll(".edge")
	.data(simplices[1])
	.join(enter=> enter.append("line")).transition( )
	.attr("class","edge")
	.attr("fill", "none")
	.attr("stroke", settings.rips.strokeColor)
	.attr("stroke-width", settings.rips.strokeWidth)
	.attr("opacity", settings.rips.opacity)
	.attr("x1", function(d) { return sample[d[0]][0] })
	.attr("y1", function(d) { return sample[d[0]][1] })
    	.attr("x2", function(d) { return sample[d[1]][0] })
	.attr("y2", function(d) { return sample[d[1]][1] });
    
    var line = d3.line( );
    svg.selectAll(".triangle")
	.data(simplices[2])
	.join(enter=>enter.append("path")).transition( )
    	.attr("class", "triangle")
    	.attr("stroke", "none")
    	.attr("opacity", settings.rips.opacity)
    	.attr("fill", settings.rips.fillColor)
    	.attr("d", function(d) {return line(d3.permute(sample,d))});
}

// Draw Shadow
function drawShadow( ) {
    if ( !shadowVisible )
	return;
    
    svg.selectAll(".shadow-edge")
	.data(shadow[1])
	.join(enter=>enter.append("line")).transition( )
    	.attr("class", "shadow-edge")
    	.attr("stroke", settings.shadow.strokeColor)
    	.attr("opacity", settings.shadow.opacity)
	.attr("stroke-width", settings.shadow.strokeWidth)
    	.attr("fill", "none")
	.attr("x1", function(d) { return sample[d[0]][0] })
	.attr("y1", function(d) { return sample[d[0]][1] })
    	.attr("x2", function(d) { return sample[d[1]][0] })
	.attr("y2", function(d) { return sample[d[1]][1] });
    
    var line = d3.line( );
    svg.selectAll(".shadow-triangle")
	.data(shadow[2])
	.join(enter=>enter.append("path")).transition( )
    	.attr("class", "shadow-triangle")
    	.attr("stroke", "none")
    	.attr("opacity", settings.shadow.opacity)
    	.attr("fill", settings.shadow.fillColor)
    	.attr("d", function(d) {return line(d3.permute(sample,d))});
}

// Draw Balls
function drawBalls(radius) {
    if ( !ballsVisible )
	return;

    svg.selectAll(".ball")
	.data(sample)
	.join(enter=>enter.append("circle")).transition( ) 
	.attr("class", "ball")
	.attr("opacity", settings.ball.opacity)
	.attr("fill", settings.ball.fillColor)
	.attr("stroke", settings.ball.strokeColor)
	.attr("stroke-width", settings.ball.strokeWidth)
    	.attr("cx", function(d) { return d[0] })
	.attr("cy", function(d) { return d[1] })    
	.attr("r", radius);	
}
