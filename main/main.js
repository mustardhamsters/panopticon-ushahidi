function drawWindow(){
	console.log('drawing big-maps to '+(window.innerHeight-$('#header_nav').outerHeight()))
	$('#middle, .big-map, #panel-wrapper, .panel, .panel iframe').css('height', window.innerHeight-$('#header_nav').outerHeight()-3);
	$('.big-map.panel-open').css('width', window.innerWidth-400);
	updateMapsSize();
}

function updateMapsSize(){
	map.resize();
	if(frames[0].map) frames[0].map.updateSize();
}

jQuery(document).ready(function($) {
	
	if(!$('#panel-wrapper').hasClass('closed')) $('.big-map').addClass('panel-open');
	
  // Draw map on page load
  drawWindow();
    
  // Redraw map on resize
  $(window).resize(function(){ drawWindow(); });
	
	
	// Panels
	// ==========

	$('#mapStatus, #mapControls').addClass('panel-open');

	// Hide all panels
	$('#panel-wrapper .panel').hide();

	// Show active/first panel
	var activePanel = $('#panel-tabs li.active:first'),
		hashPanel   = $('#panel-tabs li.panel-' + document.location.hash.substr(1));

	if (!activePanel.length) activePanel = $('#panel-tabs li.panel-pins');
	if (hashPanel.length)    activePanel = hashPanel;

	if (activePanel.length) {
		activePanel.addClass('active');
		var panelName = activePanel.attr('class').match(/panel-(\w+)/);
		$('#' + panelName[1] + '-panel').show(); // Show active
		if(panelName[1] != 'submit') $('#reportMap').hide();
	}

	// Hide panel if #panel-closed
	if (document.location.hash == '#panel-closed')
		$('#panel-wrapper').removeClass('open').addClass('closed');
		
		
	// Show panel on tab click
	$('#panel-tabs li a').click(function() {
		var li      = $(this).parent('li'),
			wrapper = $('#panel-wrapper'),
			panelName,
			lastPanel;

		$(this).blur(); // shh
		
		if (wrapper.hasClass('closed')) { // Open panel
			wrapper.removeClass('closed').addClass('open');
			$('#mapStatus, #mapControls, .big-map').addClass('panel-open');
			setTimeout('drawWindow();', 200);
		} else if (li.hasClass('active')) { // Close panel
			wrapper.removeClass('open').addClass('closed');
			document.location.hash = 'panel-closed';
			$('.big-map').css('width', '100%');
			updateMapsSize();
			$('#mapStatus, #mapControls, .big-map').removeClass('panel-open');
			return;
		}

		// Hide all
		$('#panel-wrapper .panel').hide();

		lastPanel = $('#panel-tabs li.active').removeClass('active').attr('class').match(/panel-(\w+)/);
		panelName = li.attr('class').match(/panel-(\w+)/);
		$('#' + panelName[1] + '-panel').show(); // Show clicked
		if(panelName[1] == 'submit'){ 
			$('#reportMap').show();
		} else {
			$('#reportMap').hide();
		}
		$('#panel-tabs li.panel-' + panelName[1]).addClass('active');

		console.log('Hiding '+lastPanel[1]+' and showing '+panelName[1]);
		if (panelName[1] == 'submit') {
			if (map && window.reports.map) {
				window.reports.map.setCenter([map._olMap.center.lon, map._olMap.center.lat], map._olMap.zoom);
				// Is this needed?
				// window.reports.map.moveTo(map._olMap.center, map._olMap.zoom);
				console.log('Trying to re-center Reports map');
			} else {
				console.log('lol nope');
			}
		} else if (lastPanel[1] == 'submit') {
			map.setCenter([window.reports.map.center.lon, window.reports.map.center.lat], window.reports.map.zoom);
			console.log('Trying to re-center Main map');
		}

	});


// end document.ready()
});