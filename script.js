$('document').ready(function( ) {
    shape = [], samplePoints = []; simplices = [];
    width = $('.drawing.segment').width( ), height = $('.drawing.segment').height( );
    
    svg = d3.select(".drawing.segment").append("svg")
	.attr("width", width+"px")
	.attr("height", height+"px")
	.attr("class", "drawing");

    $('.ui.dropdown')
	.dropdown()
    ;
    
    $('.ui.shape.dropdown')
	.dropdown({
	    onChange: function(value,text){
		shape = [];
		samplePoints = [];
		simplices = [];

		$('.sample.button').removeClass("disabled");
		switch(value) {
		case "circle":
    		    shape = circle([width/2,height/2], Math.min(width,height)/2-70);
		    break;
		case "lemniscate":
		    shape = lemniscate([width/2,height/2],width/2-50);
		    break;
		case "lissajous":
		    shape = lissajous([width/2,height/2], width/2-30, height/2-30);
		}
		drawShape( );
	    }
	})
    ;
    
    $('input.scale')
	.change(function( ){
	    drawBalls($(this).val( ));
	    simplices = rips(samplePoints, 2*$(this).val( ));
	    drawComplex( );
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
  	sample($('.sample-tol').val( ),$('.sample-size').val( ));
    })
});

// Computes Cech Complex
function cech(points, scale) {
    
}

// Compute Rips Complex
function rips(points, scale) {
    var simplices = [];
    simplices[0]  = d3.range(points.length);
    simplices[1]  = [];
    simplices[2]  = [];
    
    combinations(simplices[0],2).forEach(function(d) {
    	if ( diam2( d3.permute(points,d) ) < scale )
    	    simplices[1].push(d);
    });
    
    combinations(simplices[0],3).forEach(function(d) {
    	if ( diam2( d3.permute(points,d) ) < scale )
    	    simplices[2].push(d);
    });
    return simplices;
}

// Draw Complex
function drawComplex( ) {
    $('svg .edge').remove( );
    $('svg .triangle').remove( );
    svg.selectAll(".edge")
	.data(simplices[1])
	.enter( ).append("line")
	.attr("class", "edge")
	.attr("x1", function(d) { return samplePoints[d[0]][0] })
	.attr("y1", function(d) { return samplePoints[d[0]][1] })
    	.attr("x2", function(d) { return samplePoints[d[1]][0] })
	.attr("y2", function(d) { return samplePoints[d[1]][1] })

    simplices[2].forEach(function(t) {
    var line = d3.line( );
	svg.append("path")
	    .attr("class", "triangle")
	    .attr("d", line(d3.permute(samplePoints, t)));
    });
}

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

// Lissajous
function lissajous(center,a=100,b=100,kx=3,ky=2,n=200) {
    var t = d3.range(n).map(function(d) {
  	return 2*Math.PI*d/(n-1);
    });
    var points = [];
    for(var i=0; i<n; i++) {
  	points[i] = [center[0] + a*Math.cos(kx*t[i]), 
  	             center[1] + b*Math.sin(ky*t[i])];
    }
    return points;
}

// Lemniscate 
function lemniscate(center,a,n=100) {
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
function sample(tol,size) {
    if( shape.length==0 ) {
	samplePoints =  d3.range(size).map(function( ) {
	    var x = d3.randomUniform(0,width)( );
	    var y = d3.randomUniform(0,height)( );
	    return [x,y];	
	});
    }
    
    else {
	if(size > shape.length)
	    return [];
	else
	    samplePoints =  d3.range(size).map(function( ) {
		var i = Math.floor(d3.randomUniform(shape.length)( ));
		var r = d3.randomUniform(tol)( );
		var s = d3.randomUniform(2*Math.PI)( );
		return [shape[i][0] + r*Math.cos(s), shape[i][1] + r*Math.sin(s)];
	    });
	
    }
    $('.distance.label').html(H2(shape,samplePoints));
    drawSample( );
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
