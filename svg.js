/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/

// Shape params
var shapeStrokeColor = '#3498DB';
var shapeStrokeWidth = '1.3';

// Sample params
var sampleFillColor = '#566573';
var sampleOpacity = '0.8';
var sampleRadius = '3';

// Edge params
var edgeStrokeColor = '#E74C3C';
var edgeStrokeWidth = 1.3;
var edgeOpacity = '0.8';

// Triangle params
var triangleFillColor = '#E74C3C';
var triangleOpacity = '0.6';

// Ball params
var ballFillColor = '#5ddd7b';
var ballOpacity = 0.2;
var ballStrokeColor = '#21ba45';
var ballStrokeWidth = 2;

var shadowOpacity= 0.8;
var shadowFillColor = 'blue';
var shadowStrokeColor = 'blue';
var shadowStrokeWidth = 3;

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
	.attr("stroke", shapeStrokeColor)
	.attr("stroke-width", shapeStrokeWidth)
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
    	.attr("fill", sampleFillColor)
	.attr("opacity", sampleOpacity)
    	.attr("cx", function(d) { return d[0] })
    	.attr("cy", function(d) { return d[1] })    
    	.attr("r", sampleRadius);
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
	.attr("stroke", edgeStrokeColor)
	.attr("stroke-width", edgeStrokeWidth)
	.attr("opacity", edgeOpacity)
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
    	.attr("opacity", triangleOpacity)
    	.attr("fill", triangleFillColor)
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
    	.attr("stroke", shadowStrokeColor)
    	.attr("opacity", shadowOpacity)
	.attr("stroke-width", shadowStrokeWidth)
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
    	.attr("opacity", shadowOpacity)
    	.attr("fill", shadowFillColor)
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
	.attr("opacity", ballOpacity)
	.attr("fill", ballFillColor)
	.attr("stroke", ballStrokeColor)
	.attr("stroke-width", ballStrokeWidth)
    	.attr("cx", function(d) { return d[0] })
	.attr("cy", function(d) { return d[1] })    
	.attr("r", radius);	
}
