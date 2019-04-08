/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/

// On DOM ready
$('document').ready(function( ) {
    width  = $('.drawing.segment').width( );
    height = $('.drawing.segment').height( );
    
    // Create main svg element
    svg = d3.select(".drawing.segment").append("svg")
    	.attr("width", width+"px")
    	.attr("height", height+"px");
    
    // Initialize dropdowns and their callbacks as needed by Semantic-UI
    $('.ui.dropdown')
    	.dropdown()
    ;
    $('.ui.complex.dropdown')
    	.dropdown('set selected', 'rips');
    ;
    $('.ui.shape.dropdown')
    	.dropdown({
    	    onChange: function(value){
		selectShape(value);
    	    }
    	})
    ;
    
    // Other DOM events and callbacks
    $('.sample.button')
	.click(function(){
	    // Resample the shape
	    reSample($('.sample-noise').val( ), $('.sample-size').val( ));
	})
    ;
    $('input.scale')
    	.change(function( ){
    	    Complex[$('.complex.dropdown').dropdown('get value')]($(this).val( ));
    	})
    ;
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
	    drawBalls($('input.scale').val( )/2);
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
    $('.H2.checkbox').checkbox({
	onChecked:   function( ) {
	    H2Visible = true;
	    drawH2( );
	},
	onUnchecked: function( ) {
	    H2Visible = false;
	    eraseH2( );
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
