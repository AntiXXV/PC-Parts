$('#formuno').on('click',function(e){
	var data = $('<p>pannekoek<p>')
	$('#targetuno').html(data);
});

// Display text on change select option
$('#testform').on('change',function(e){
	var data = $('<p>pannekoek2<p>')
	$('#targetuno').html(data);
});

// Show graphics cards
$('#testform').on('change',function(e){
	//get selected option
	var yourSelect = document.getElementById( "testform" );
	var GpuManu = yourSelect.options[ yourSelect.selectedIndex ].value;
	
	var prefix = 'PREFIX PC: <http://www.semanticweb.org/PCpart_app#>';
	var query =  prefix + 'SELECT ?vc WHERE {?x a PC:GraphicsCard. ?x PC:madeBy PC:' + GpuManu + '. ?x PC:hasVideochip ?vc} LIMIT 10';
	var endpoint = 'http://localhost:5820/pc-parts/query';
	var format = 'JSON';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<select></select>');
			ul.addClass('form-control');
			ul.attr('id','testform2');
		
			var empty = $('<option value="" disabled selected>Select your videochip</option>');
			ul.append(empty);

			$.each(json.results.bindings, function(index,value){
				var li = $('<option></option>');
				li.addClass('list-group-item');
				
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						var object_split = v_value.split('#');
						var object_name = object_split[1];
						
						var name = object_name.split('_').join(' ');
						
						a.text(name);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			$('#linktargetuno').html(ul);
		} catch(err) {
			$('#linktargetuno').html('Something went wrong!');
		}
		

		
	});
	
	
});


$('#linktargetuno').on('change',function(e){
	//get selected option
	var yourSelect1 = document.getElementById( "testform" );
	var GpuManu = yourSelect1.options[ yourSelect1.selectedIndex ].value
	
	var yourSelect2 = document.getElementById( "testform2" );
	var VideoChipRaw = yourSelect2.options[ yourSelect2.selectedIndex ].value
	var VideoChip = VideoChipRaw.split(' ').join('_');
	
	var prefix = 'PREFIX PC: <http://www.semanticweb.org/PCpart_app#>';
	var query =  prefix + 'SELECT ?x WHERE {?x a PC:GraphicsCard. ?x PC:madeBy PC:' + GpuManu + '. ?x PC:hasVideochip PC:' + VideoChip + '} LIMIT 10';
	var endpoint = 'http://localhost:5820/pc-parts/query';
	var format = 'JSON';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<select></select>');
			ul.addClass('form-control');
			ul.attr('id','testform3');
			
			var empty = $('<option value="" disabled selected>Select your graphics card</option>');
			ul.append(empty);
			
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<option></option>');
				li.addClass('list-group-item');
				
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						var object_split = v_value.split('#');
						var object_name = object_split[1];
						
						var name = object_name.replace(/[#_]/g,' ');
						
						a.text(name);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktargetdos').html(ul);
		} catch(err) {
			$('#linktargetdos').html('Something went wrong!');
		}
		

		
	});
	
	
	$('#linktargetdos').on('change',function(e){
	var yourSelect = document.getElementById( "testform3" );
	var GPU = yourSelect.options[ yourSelect.selectedIndex ].value;
	$('#linktargettres').html('</br><h4>Your graphics card is the <b>' + GPU + '</b>, correct?</h4>');
	});
	
	
	
	
});

$('#link14').on('click', function(e){
	
	var query = $('#query14').val();
	var endpoint = 'http://localhost:5820/pc-parts/query';
	var format = 'JSON';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktarget14').html(ul);
		} catch(err) {
			$('#linktarget14').html('Something went wrong!');
		}
		

		
	});
	
});


//////////////////////////PC////////////////////////////
////////////////////////////////////////////////////////


$('#testformpc').on('change',function(e){
	//get selected option
	var yourSelect = document.getElementById( "testformpc" );
	var GpuManu = yourSelect.options[ yourSelect.selectedIndex ].value;
	
	var prefix = 'PREFIX PC: <http://www.semanticweb.org/PCpart_app#>';
	var query =  prefix + 'SELECT ?x WHERE {?x a PC:Computer.}';
	var endpoint = 'http://localhost:5820/pc-parts/query';
	var format = 'JSON';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<select></select>');
			ul.addClass('form-control');
			
		
			var empty = $('<option value="" disabled selected>Select your custom pc</option>');
			ul.append(empty);

			$.each(json.results.bindings, function(index,value){
				var li = $('<option></option>');
				li.addClass('list-group-item');
				ul.attr('id','testformpc2');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						var object_split = v_value.split('#');
						var object_name = object_split[1];
						
						var name = object_name.split('_').join(' ');
						
						a.text(name);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			$('#linktargetpc2').html(ul);
		} catch(err) {
			$('#linktargetpc2').html('Something went wrong!');
		}
		

		
	});
	
	
});

$('#linktargetpc2').on('change',function(e){
	//get selected option
	var yourSelect2 = document.getElementById( "testformpc2" );
	var PCRaw = yourSelect2.options[ yourSelect2.selectedIndex ].value
	var PC_R = PCRaw.split(' ').join('_');
	
	var prefix = 'PREFIX PC: <http://www.semanticweb.org/PCpart_app#>';
	var query =  prefix + 'SELECT ?x WHERE {PC:'+ PC_R+' PC:hasPart ?x.}';
	var endpoint = 'http://localhost:5820/pc-parts/query';
	var format = 'JSON';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<select></select>');
			ul.addClass('form-control');
			ul.attr('id','testformpc3');
			
			var empty = $('<option value="" disabled selected>Computer parts</option>');
			ul.append(empty);
			
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<option></option>');
				li.addClass('list-group-item');
				
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						var object_split = v_value.split('#');
						var object_name = object_split[1];
						
						var name = object_name.replace(/[#_]/g,' ');
						
						a.text(name);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktargetpc3').html(ul);
		} catch(err) {
			$('#linktargetpc3').html('Something went wrong!');
		}


		});
	
	
});	