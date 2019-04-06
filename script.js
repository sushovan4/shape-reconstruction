$('document').ready(function( ) {
    shape = [], samplePoints = [];    
    var width = $('.drawing.segment').width( ), height = 300;
    
    svg = d3.select(".drawing.segment").append("svg")
	.attr("width", width+"px")
	.attr("height", height+"px")
	.attr("class", "drawing");

    $('.ui.dropdown')
	.dropdown()
    ;
    
    $('.ui.shape.dropdown')
	.dropdown({
	    onChange: function(value){
		samplePoints = [];
		drawSample( );
		$('.sample.button').removeClass("disabled");
		switch(value) {
		case "circle":
    		    shape = circle([width/2,height/2], 100);
		    break;
		case "infinity":
		    shape = lemniscate([width/2,height/2],200);
		}
		drawShape( );
	    }
	})
    ;
    
    $('input.scale')
	.change(function( ){
	    drawBalls($(this).val( ));
	})
    ;
    
    $('input.sample-tol').change(function(){
  	$('.ui.tol.label').html($(this).val( ));
    });
    $('input.sample-size').change(function(){
  	$('.ui.size.label').html($(this).val( ));
    });
    $('input.scale').change(function(){
  	$('.ui.scale.label').html($(this).val( ));
    });
    
    $('.sample.button').click(function(){
  	samplePoints = sample(shape,$('.sample-tol').val( ),$('.sample-size').val( ));
	$('.distance.label').html(H2(shape,samplePoints));
	drawSample( );
    })
});

// Draw Balls
function drawBalls(radius) {
    $('svg .ball').remove( );
    svg.selectAll(".ball")
	.data(samplePoints)
	.enter( ).append("circle")
	.attr("class", "ball")
	.attr("cx", function(d) { return d[0] })
	.attr("cy", function(d) { return d[1] })    
	.attr("r", radius);	
}

// Draw Shape
function drawShape( )	{
    $('svg .shape').remove( );
    var line = d3.line( );
    svg.append("path")
	.attr("class", "shape")
	.attr("d", line(shape));
}

function drawSample( ) {
    $('svg .sample').remove( );
    svg.selectAll(".sample")
	.data(samplePoints).
	enter( ).append("circle")
	.attr("class", "sample")
	.attr("cx", function(d) { return d[0] })
	.attr("cy", function(d) { return d[1] })    
	.attr("r", 2);
}

// Lemniscate 
function lemniscate(center,a,n=200) {
    var t = d3.range(n).map(function(d) {
  	return 2*Math.PI*d/(n-1);
    });
    var points = [];
    for(var i=0; i<n; i++) {
  	points[i] = [center[0] + a*Math.cos(t[i])/(1 + Math.pow(Math.sin(t[i]),2)), 
  	             center[1] + a*Math.sin(t[i])*Math.cos(t[i])/(1 + Math.pow(Math.sin(t[i]),2))];
    }
    return points;
}

// Circle
function circle(center, radius, range=[0,1], n=200) {
    var t = d3.range(n).map(function(d) {
  	return range[0] + (range[1]-range[0])*d/(n-1);
    }); 
    var points = [];
    for(var i=0; i<n; i++) {
  	points[i] = [center[0] + radius*Math.cos(2*Math.PI*t[i]), 
  	             center[1] + radius*Math.sin(2*Math.PI*t[i])];
    }
    return points;
}

// Sample a set with noise
function sample(points,tol,size) {
    if(size > points.length)
	return [];
    else
	return d3.range(size).map(function( ) {
	    var i = Math.floor(d3.randomUniform(points.length)( ));
	    var r = d3.randomUniform(tol)( );
	    var s = d3.randomUniform(2*Math.PI)( );
	    return [points[i][0] + r*Math.cos(s), points[i][1] + r*Math.sin(s)];
	});
}

// Compute distance of two points in 2D 
function dist2(a,b){
    if( a.length != b.length || a.length != 2 )
	return null;
    return Math.sqrt( Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2) );
}

// Compute diameter of points in 2D
function diam2(points) {
    var diam = 0;
    points.forEach(function(p) {
	points.forEach(function(q) {
	    diam = Math.max(diam, dist2(p,q));
	});
    });
    return diam;
}

// Compute Hausdorff distance in 2D
function H2(A,B) {
    var d=0;
    
    // Return if the sets are empty
    if(A.length==0 || B.length==0)
    	return null;
    
    // Distance A to B
    A.forEach(function(a) {
   	var k=Infinity;
	B.forEach(function(b) {
      	    k = Math.min(k, dist2(a,b));
	});
    	d = Math.max(d,k); 
    });
    
    // Distance B to A
    B.forEach(function(b) {
   	var k=Infinity;
	A.forEach(function(a) {
      	    k = Math.min(k, dist2(a,b));
	});
    	d = Math.max(d,k); 
    });
    return d; 
}

// Compute all combinations of k elements from a set
function combinations(set, k) {
    var i, j, combs, head, tailcombs;
    if (k > set.length || k <= 0) {
	return [];
    }
    if (k == set.length) {
	return [set];
    }
    if (k == 1) {
	combs = [];
	for (i = 0; i < set.length; i++) {
	    combs.push([set[i]]);
	}
	return combs;
    }
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
	head = set.slice(i, i + 1);
	tailcombs = combinations(set.slice(i + 1), k - 1);
	for (j = 0; j < tailcombs.length; j++) {
	    combs.push(head.concat(tailcombs[j]));
	}
    }
    return combs
}
