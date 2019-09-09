/* Author: Sushovan Majhi (www.smajhi.com)
   Date: April 4, 2019
   ...
*/

// On DOM ready
$('document').ready(function( ) {
    // SVG //
    width  = $('.drawing.segment').width( );
    height = $('.drawing.segment').height( );
    
    center = [width/2,height/2];
    svg = d3.select(".drawing.segment").append("svg")
    	.attr("width", width+"px")
    	.attr("height", height+"px");

    
    // Initialize dropdowns and their callbacks as needed by Semantic-UI
    $('.ui.sidebar').sidebar('attach events',  $('.toggle.item'));
    $('.ui.dropdown')
    	.dropdown()
    ;
    $('.ui.complex.dropdown')
    	.dropdown('set selected', 'rips');
    ;
    $('.ui.shape.dropdown')
    	.dropdown({
    	    onChange: function(value){
		$('input.sample-size').animate({'value': 0},500,function( ){
		    $('.sample.button').trigger('click');
		    $('.ui.size.label').html($(this).val( ));
		    selectShape(value);
		});
		$('input.rips.scale').animate({'value': 0},500,function( ){
		    //$('.sample.button').trigger('click');
		});

    	    }
    	})
    ;
    
    // Other DOM events and callbacks
    $('.sample.button')
	.click(function(){
	    reSample($('.sample-noise').val( ), $('.sample-size').val( ));
	})
    ;
    $('input.rips.scale')
    	.change(function( ){
    	    Complex['rips']($(this).val( ));
    	    $('.ui.rips.scale.label').html($(this).val( ));
    	})
    ;
     $('input.shadow.scale')
    	.change(function( ){
	    Complex['shadow']($(this).val( ));
	    //Complex[$('.complex.dropdown').dropdown('get value')]($(this).val( ));
    	    $('.ui.shadow.scale.label').html($(this).val( ));
    	})
    ;
    $('.shape.checkbox').checkbox({
	onChecked:   function( ) {
	    shapeVisible = true;
	    drawShape( );
	},
	onUnchecked: function( ) {
	    shapeVisible = false;
	    $('.drawing .shape').remove( );
	} 
    });    
    $('.balls.checkbox').checkbox({
	onChecked:   function( ){
	    ballsVisible = true;
	    drawBalls($('input.rips.scale').val( )/2);
	},
	onUnchecked: function( ){
	    ballsVisible = false;
	    $('.drawing .ball').remove( );
	} 
    });
    $('.complex.checkbox').checkbox({
	onChecked:   function( ) {
	    complexVisible = true;
	    drawComplex( );
	},
	onUnchecked: function( ) {
	    complexVisible = false;
	    $('.drawing .edge').remove( );
	    $('.drawing .triangle').remove( );	   
	} 
    });
    $('.shadow.checkbox').checkbox({
	onChecked:   function( ) {
	    shadowVisible = true;
	    drawShadow( );
	},
	onUnchecked: function( ) {
	    shadowVisible = false;
	    $('.drawing .shadow-edge').remove( );
	    $('.drawing .shadow-triangle').remove( );
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

    // Settings 
    $('.setting.item input').each(function( ){
	$(this).val(settings[$(this).data('scope')][$(this).data('setting')]);
    });
    $('input.color').each(function( ){
	$(this).css('background-color', $(this).val( ));
    });    
    $('input.width').each(function( ){
	$(this).css('border', $(this).val( )+'px solid gray');
    });
    $('input.opacity').each(function( ){
	$(this).css('opacity', $(this).val( ));
    });

    $('.setting.item input').change(function( ){
	settings[$(this).data('scope')][$(this).data('setting')]= $(this).val( );
    });
    $('input.color').keyup(function( ){
	$(this).css('background-color', $(this).val( ));
    });
    $('input.width').keyup(function( ){
	$(this).css('border', $(this).val( )+'px solid gray');
    });
    $('input.opacity').keyup(function( ){
	$(this).css('opacity', $(this).val( ));
    });
    
});


// $('#import')
// 	.click(function() {
// 	    var files = $('#selectFiles')[0].files;
// 	    if (files.length <= 0) {
// 		return false;
// 	    }

// 	    var reader = new FileReader();

// 	    reader.onload = function(e) { 
// 		var result = JSON.parse(e.target.result);
// 		var formatted = JSON.stringify(result, null, 2);
// 	    }

// 	    reader.readAsText(files.item(0));
// 	})
// ;
