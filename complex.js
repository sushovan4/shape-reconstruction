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

