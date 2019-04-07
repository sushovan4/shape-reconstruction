/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/

$('document').ready(function( ) {
    // Globals
    shape = [];
    sample = [];
    simplices = [];
    width  = $('.drawing.segment').width( );
    height = $('.drawing.segment').height( );
    shapeVisible = true;
    ballsVisible = true;
    
    // Create main svg element
    svg = d3.select(".drawing.segment").append("svg")
    	.attr("width", width+"px")
    	.attr("height", height+"px");
    
    // Initialize dropdown as needed by Semantic-UI
    $('.ui.dropdown')
    	.dropdown()
    ;

    $('.ui.complex.dropdown')
    	.dropdown('set selected', 'rips');
    ;
    
    // Callback when a new shape is chosen
    $('.ui.shape.dropdown')
    	.dropdown({
    	    onChange: function(value){
    		if(value != "")
		    selectShape(value);
    	    }
    	})
    ;
    
    // Resample the shape
    $('.sample.button').click(function(){
	reSample($('.sample-tol').val( ), $('.sample-size').val( ));
    });
    
    
    // Callback when scale is changed
    $('input.scale')
    	.change(function( ){
    	    Complex[$('.complex.dropdown').dropdown('get value')](2*$(this).val( ));
	    drawBalls($(this).val( ));
    	})
    ;
    
    // Other DOM events and callbacks
    $('.shape.checkbox').checkbox({
	onChecked:   function( ) { shapeVisible = true; },
	onUnchecked: function( ) { shapeVisible = false; } 
    });
    
    $('.balls.checkbox').checkbox({
	onChecked:   function( ){ ballsVisible = true; },
	onUnchecked: function( ){ ballsVisible = false; } 
    });
    
    $('input.sample-tol').change(function(){
    	$('.ui.tol.label').html($(this).val( ));
    });
    $('input.sample-size').change(function(){
    	$('.ui.size.label').html($(this).val( ));
    });
    $('input.scale').change(function(){
    	$('.ui.scale.label').html($(this).val( ));
    });   
});


// Compute new shape
function selectShape(name)	{
    sample = [];
    simplices = [];
    
    switch(name) {
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

// Sample the shape
function reSample(tol,size) {
    simplices = [];
    
    if( shape.length==0 ) {
	sample =  d3.range(size).map(function( ) {
	    var x = d3.randomUniform(0,width)( );
	    var y = d3.randomUniform(0,height)( );
	    return [x,y];	
	});
    }
    
    else {
	if(size > shape.length)
	    return [];
	else
	    sample =  d3.range(size).map(function( ) {
		var i = Math.floor(d3.randomUniform(shape.length)( ));
		var r = d3.randomUniform(tol)( );
		var s = d3.randomUniform(2*Math.PI)( );
		return [shape[i][0] + r*Math.cos(s), shape[i][1] + r*Math.sin(s)];
	    });
	
    }
    // Update Hausdorff distance
    $('.distance.label').html(H2(shape,sample));
}


// Computes Complexes
var Complex = {
    rips: function(scale) {
	simplices[0]  = d3.range(sample.length);
	simplices[1]  = [];
	simplices[2]  = [];
	
	combinations(simplices[0],2).forEach(function(d) {
    	    if ( diam2( d3.permute(sample,d) ) < scale )
    		simplices[1].push(d);
	});
	
	combinations(simplices[0],3).forEach(function(d) {
    	    if ( diam2( d3.permute(sample,d) ) < scale )
    		simplices[2].push(d);
	});
	drawComplex( );
    },
    cech: function(scale) {
	console.log("I am not yet defined");
    }   
}


