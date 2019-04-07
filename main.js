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
    shapeVisible =   true;
    ballsVisible =   true;
    complexVisible = true;
    
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
	reSample($('.sample-noise').val( ), $('.sample-size').val( ));
    });
    
    
    // Callback when scale is changed
    $('input.scale')
    	.change(function( ){
	    // Compute and draw the simplicial complex
    	    Complex[$('.complex.dropdown').dropdown('get value')](2*$(this).val( ));
    	})
    ;
    
    // Other DOM events and callbacks
    $('.shape.checkbox').checkbox({
	onChecked:   function( ) {
	    shapeVisible = true;
	    drawShape( );
	},
	onUnchecked: function( ) {
	    shapeVisible = false;
	    eraseShape( );
	} 
    });
    
    $('.balls.checkbox').checkbox({
	onChecked:   function( ){
	    ballsVisible = true;
	    drawBalls($('input.scale').val( ));
	},
	onUnchecked: function( ){
	    ballsVisible = false;
	    eraseBalls( );
	} 
    });
    
    $('.complex.checkbox').checkbox({
	onChecked:   function( ) {
	    complexVisible = true;
	    drawComplex( );
	},
	onUnchecked: function( ) {
	    complexVisible = false;
	    eraseComplex( );
	} 
    });
    
    $('input.sample-noise').change(function(){
    	$('.ui.noise.label').html($(this).val( ));
    });
    $('input.sample-size').change(function(){
    	$('.ui.size.label').html($(this).val( ));
    });
    $('input.scale').change(function(){
    	$('.ui.scale.label').html($(this).val( ));
    });   
});
