class Shape {
    constructor(name="default", points=[]) {
  	this.name   = name;
	this.points = points;
	this.size   = points.length;
	this.samplePoints = [];
	this.sampleSize = 0;
    }
    
    // Sample the shape
    sample(tol=1,size=0) {
  	this.sampleSize   = Math.min(this.size, size);
  	this.samplePoints = d3.range(this.sampleSize).map(function(d){ 
    	    return this.points[d3.uniformRandom(this.size)]
	});
 	return this;
    }
    
}  

class Circle extends Shape {
    constructor(center=[0,0],radius=1,range={start:0,end:1},size=100) {
  	super("circle");
	this.points = this.generate(center,radius,range,size);
	this.center = center;
  	this.radius = radius;
  	this.range  = range;
  	this.size   = size;
    }
    
    generate(center, radius, range, n) {
	var t = d3.range(n).map(function(d) {
  	    return range.start + (range.end-range.start)*d/(n-1);
  	}); 
  	var points = [];
  	for(var i=0; i<n; i++) {
  	    points[i] = [center[0] + radius*Math.cos(2*Math.PI*t[i]), 
  	            	 center[1] + radius*Math.sin(2*Math.PI*t[i])];
  	}
	return points;
    } 
}

