$('document').ready(function( ) {
    var shape;
    
    $('.ui.dropdown')
	.dropdown()
    ;
    
    $('.ui.shape.dropdown')
	.dropdown({
    	    onChange: function(value){
		switch(value) {
		case "circle":
    		    shape = new Circle([10,10],50);
		}
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
