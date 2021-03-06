/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/


// Globals
shapeSegments = [];
shape = [];
adjRips = [];
sample = [];
simplices = [[],[],[]];
dEps = [];
shadow=[];
shapeVisible   = true;
ballsVisible   = true;
complexVisible = true;
shadowVisible  = true;
H2Visible      = false;


// Compute new shape
function selectShape(name) {
    if(name !="")
	shape=Shape[name](center);
    else
	shape=[];
    // Draw the new shape
    shapeSegments=[shape];
    drawShape( );
    
}

// Sample the shape
function reSample(tol,size) {
    if( shape.length==0 ) {
	sample =  d3.range(size).map(function( ) {
	    var x = d3.randomUniform(0,width)( );
	    var y = d3.randomUniform(0,height)( );
	    return [x,y];	
	});
    }
    
    else {
	sample =  d3.range(size).map(function(i) {
	    var index = Math.floor(i*(shape.length-1)/size);
	    var r = d3.randomUniform(tol)( );
	    var s = d3.randomUniform(2*Math.PI)( );
	    return [shape[index][0] + r*Math.cos(s), shape[index][1] +
		    r*Math.sin(s)];
	});
    }
    
    // Update the Hausdorff distance
    drawH2( );
    // Draw the new sample
    drawSample( );
    $('input.rips.scale').trigger("change");
}

// Computes Complexes
var Complex = {
    rips: function(scale) {
	simplices=[d3.range(sample.length),[],[]];
	adjRips = new Array(sample.length);
	dEps = new Array(sample.length);
	
	for(var i = 0; i < adjRips.length; i++) {
	    adjRips[i]= new Array(sample.length);
	    
	    for(var j = 0; j < adjRips.length; j++) {
		var d = dist2(sample[i],sample[j]); 
		if( d < scale) {
		    adjRips[i][j]=d;
		    if(i<j)
    	 		simplices[1].push([i,j]);
		}
		else
		    adjRips[i][j]=0;
	    }
	}
	for(var i = 0; i < adjRips.length; i++ ){
	    dEps[i] = dijsktra(adjRips, i);
	}
	combinations(simplices[0],3).forEach(function(d) {
    	    if ( diam2( d3.permute(sample,d) ) < scale )
    		simplices[2].push(d);
	});
	drawComplex( );
	drawBalls(scale/2.0);
	$('input.shadow.scale').val(0);
	$('input.shadow.scale').trigger("change");
    },
    cech: function(scale) {
	simplices[0]  = d3.range(sample.length);
	simplices[1]  = [];
	simplices[2]  = [];
	
	combinations(simplices[0],2).forEach(function(d) {
    	    if ( diam2( d3.permute(sample,d) ) < 2*scale )
    		simplices[1].push(d);
	});
	
	combinations(simplices[0],3).forEach(function(d) {
	    if ( circRad2( d3.permute(sample,d) ) < scale )
    		simplices[2].push(d);
	});
	
	drawBalls(scale);
	drawComplex( );
    },
    shadow: function(scale) {
	shadow=[d3.range(sample.length),[],[]];
	combinations(shadow[0],2).forEach(function(d) {
	    if ( dEps[d[0]][d[1]] < scale)
    		shadow[1].push(d);
	});
	combinations(shadow[0],3).forEach(function(d) {
	    if ( dEps[d[0]][d[1]] < scale && dEps[d[1]][d[2]] < scale &&
	       dEps[d[0]][d[2]] < scale)
    		shadow[2].push(d);
	});
	drawShadow( );
    },
    
}

// Dijsktra
function dijsktra(adj, src) {
    var dist= new Array(adj.length);
    var sptSet = new Array(adj.length);

    for(var i = 0; i < adj.length; i++ ) 
	dist[i] = Infinity; sptSet[i] = false;

    dist[src] = 0;
    
    for(var count = 0; count < adj.length - 1; count++ ) {
	var min = Infinity, min_index; 
	for(v = 0; v < adj.length; v++) 
            if (!sptSet[v] && dist[v] <= min) 
		min = dist[v], min_index = v; 
	sptSet[min_index] = true;
	
	for(var v = 0; v < adj.length; v++)
	    if(!sptSet[v] && adj[min_index][v] && dist[min_index] != Infinity 
               && dist[min_index] + adj[min_index][v] < dist[v])
		dist[v] = dist[min_index] + adj[min_index][v]; 
	
    }
    return dist;
}

var Shape = {
    // Lissajous
    lissajous: function(center,a=center[0]-100,b=center[1]-100,
			kx=3,ky=2,n=500) {
	var t = d3.range(n).map(function(d) {
  	    return 2*Math.PI*d/(n-1);
	});
	var points = [];
	for(var i=0; i<n; i++) {
  	    points[i] = [center[0] + a*Math.cos(kx*t[i]), 
  			 center[1] + b*Math.sin(ky*t[i])];
	}
	return points;
    },
    
    // Lemniscate 
    lemniscate: function(center,a=center[0]-100,n=500) {
	var t = d3.range(n).map(function(d) {
  	    return 2*Math.PI*d/(n-1);
	});
	var points = [];
	for(var i=0; i<n; i++) {
  	    points[i] = [center[0] +
			 a*Math.cos(t[i])/(1 + Math.pow(Math.sin(t[i]),2)), 
  			 center[1] + a*Math.sin(t[i])*Math.cos(t[i])/
			 (1 + Math.pow(Math.sin(t[i]),2))];
	}
	return points;
    },
    
    // Circle
    circle: function(center,radius=Math.min(...center)-100, range=[0,1], n=500) {
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
}

// Compute Euclidean distance of two points in 2D 
function dist2(a,b){
    if( a.length != b.length || a.length != 2 )
	return null;
    return Math.sqrt( Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2) );
}

// Compute dist2 diameter of points in 2D
function diam2(points) {
    var diam = 0;
    points.forEach(function(p) {
	points.forEach(function(q) {
	    diam = Math.max(diam, dist2(p,q));
	});
    });
    return diam;
}

// Compute Circumradius
function circRad2(A) {
    var cg = [0,0]; var n = A.length + 0.0;
    A.forEach(function(a) {
	cg[0] = cg[0] + a[0]/n;
	cg[1] = cg[1] + a[1]/n;
    });
    return Math.max(dist2(cg, A[0]),dist2(cg, A[1]),dist2(cg, A[2]));
}

// Compute Hausdorff distance in 2D
function H2(A,B) {
    var d1=0, d2=0;
    points = [];
    
    // Return if the sets are empty
    if(A.length==0 || B.length==0)
    	return [undefined,points];
    
    // Distance A to B
    A.forEach(function(a) {
   	var k=Infinity;
	var nn;
	B.forEach(function(b) {
	    if( dist2(a,b) < k ) {
		k = dist2(a,b);
		nn = b;
	    }
	});
	if( k >= d1 ) {
	    d1 = k;
	    points[0] = [a,nn];
	}
    });
    
    // Distance B to A
    B.forEach(function(b) {
   	var k=Infinity;
	var nn;	
	A.forEach(function(a) {
    	    if( dist2(a,b) < k ) {
		k = dist2(a,b);
		nn = a;
	    }
	});
	if( k >= d2 ) {
	    d2 = k;
	    points[1] = [b,nn];
	}
    });
    return [Math.max(d1,d2),points];
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

// Save SVG
function saveSVG(e) {
    var blob = new Blob([$('.drawing.segment svg').prop('outerHTML')],
			{type: 'image/svg'})
    e.href = URL.createObjectURL(blob);
    e.download = 'drawing.svg';
}
