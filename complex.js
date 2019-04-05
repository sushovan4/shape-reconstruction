class SimplicialComplex {
    constructor(vertices=[]) {
  	this.vertices = vertices;
	this.simplices = [];
	this.simplices[0] = d3.range(vertices.length);
	this.simplices[1] = [];	
	this.simplices[2] = [];	
    }
    
    // Compute beta_1
    beta_1( ){ 
  	return 0;
    }
    
    // Compute beta_2
    beta_2( ) {
	
  	return 0;
    }
    
    // Draw Shadow
    shadow( ) {
	
	
    }   
}

class CechComplex extends SimplicialComplex {
    constructor(vertices=[],scale=1) {
	super(vertices);
	this.scale = scale;
	
    }
}

class RipsComplex extends SimplicialComplex {
    constructor(vertices,scale) {
	super(vertices);
	this.scale = scale;

	var simplices = []
	combinations(this.simplices[0],2).forEach(function(d) {
	    if ( diam2( d3.permute(vertices,d) ) < scale )
		simplices.push(d);
	});
	this.simplices[1] = simplices;
	
	var simplices = []
	combinations(this.simplices[0],3).forEach(function(d) {
	    if ( diam2( d3.permute(vertices,d) ) < scale )
		simplices.push(d);
	});
	this.simplices[2] = simplices;
    }
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
