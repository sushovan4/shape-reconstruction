$('document').ready(function( ) {
    $('.ui.dropdown')
	.dropdown()
    ;
    
    $('.ui.shape.dropdown')
	.dropdown({
    	    onChange: function(value){
    		shape = Shape[value]([0,1]);
    		console.log(shape);
            },
	})
    ;
    
    $('.sample-tol').change(function(){
  	$('.ui.tol.label').html($(this).val( ));
    });
    $('.sample-size').change(function(){
  	$('.ui.size.label').html($(this).val( ));
    });
    $('.scale').change(function(){
  	$('.ui.scale.label').html($(this).val( ));
    });
    
    $('.sample.button').click(function(){
  	sample(tol, size);
    })
});
