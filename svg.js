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
var edgeStrokeWidth = '2';
var edgeOpacity = '0.8';

// Triangle params
var triangleFillColor = '#E74C3C';
var triangleOpacity = '0.6';

// Ball params
var ballFillColor = '#5ddd7b';
var ballOpacity = 0.2;
var ballStrokeColor = '#21ba45';
var ballStrokeWidth = 2;

function drawH2( ){
    var val = H2(shape,sample);
    var points = val[1];
    $('.distance.label').html(val[0]);

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

// Draw shape
function drawShape( ) {
    if ( !shapeVisible )
	return;
    eraseShape( );
    var line = d3.line( );
    svg.append("path")
	.attr("class", "shape")
	.attr("fill", "none")
	.attr("stroke", shapeStrokeColor)
	.attr("stroke-width", shapeStrokeWidth)
	.attr("d", line(shape));
}

// Erase Shape
function eraseShape( ) {
    $('svg .shape').remove( );   
}


// Draw sample
function drawSample( ) {
    // Set the scale back to 0
    $('input.scale').val(0);
    $('input.scale').trigger("change");
    
    svg.selectAll(".sample")
    	.data(sample)
    	.join("circle")
	.attr("class", "sample")
    	.attr("stroke", "none")
    	.attr("fill", sampleFillColor)
	.attr("opacity", sampleOpacity)
    	.attr("cx", function(d) { return d[0] })
    	.attr("cy", function(d) { return d[1] })    
    	.attr("r", sampleRadius);
}

// Clean Sample
function cleanSample( ) {
    sample = [];
    simplices = [];
    $('svg .sample').remove( );
    eraseComplex( );
    eraseBalls( );
    eraseH2( );
}

// Draw Complex
function drawComplex( ) {
    eraseComplex( );
    
    svg.selectAll(".edge")
	.data(simplices[1])
	.enter( ).append("line")
	.attr("class","edge")
	.attr("fill", "none")
	.attr("stroke", edgeStrokeColor)
	.attr("stroke-width", edgeStrokeWidth)
	.attr("opacity", edgeOpacity)
	.attr("x1", function(d) { return sample[d[0]][0] })
	.attr("y1", function(d) { return sample[d[0]][1] })
    	.attr("x2", function(d) { return sample[d[1]][0] })
	.attr("y2", function(d) { return sample[d[1]][1] })

    simplices[2].forEach(function(t) {
    var line = d3.line( );
	svg.append("path")
	    .attr("class", "triangle")
	    .attr("stroke", "none")
	    .attr("opacity", triangleOpacity)
	    .attr("fill", triangleFillColor)
	    .attr("d", line(d3.permute(sample, t)));
    });
}

// Erase Complex
function eraseComplex( ) {
    $('svg .edge').remove( );
    $('svg .triangle').remove( );
}

// Draw Shadow
function drawComplex( ) {
    eraseShadow( );
    
    simplices[2].forEach(function(t) {
    var line = d3.line( );
	svg.append("path")
	    .attr("class", "triangle")
	    .attr("stroke", "none")
	    .attr("opacity", triangleOpacity)
	    .attr("fill", triangleFillColor)
	    .attr("d", line(d3.permute(sample, t)));
    });
}

// Erase Complex
function eraseShadow( ) {
    $('svg .triangle').remove( );
}

// Draw Balls
function drawBalls(radius) {
    if ( !ballsVisible )
	return;
    
    eraseBalls( );
    svg.selectAll(".ball")
	.data(sample)
	.enter( ).append("circle")
	.attr("class", "ball")
	.attr("opacity", ballOpacity)
	.attr("fill", ballFillColor)
	.attr("stroke", ballStrokeColor)
	.attr("stroke-width", ballStrokeWidth)
    	.attr("cx", function(d) { return d[0] })
	.attr("cy", function(d) { return d[1] })    
	.attr("r", radius);	
}

// Erase Balls
function eraseBalls( ) {
    $('svg .ball').remove( );
}
