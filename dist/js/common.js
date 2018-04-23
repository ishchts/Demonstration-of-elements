$('#responsive-example-table').cardtable();


$('.js-navToggle').click(function(){
	$(this).toggleClass('open');
	$(this).closest('.exampleMenu').find('.exampleMenu__menu').slideToggle();
});
/*TABS*/
$(document).on('click','.js-mobile-tab-link', function(e) {
	e.preventDefault();
	var $this = $(this),
		$block = $this.closest('.js-tabsblock');
		$tabLinkBlock = $block.find('.js-mobiletabs');

	$tabLinkBlock.toggleClass('visible');
	$this.toggleClass('active');
});

$(document).on('click','.js-tab-link', function(e) {
	e.preventDefault();
	var $this		= $(this),
		thisText	= $this.text(), 
		classBlock	= $this.data('href'),
		$block		= $this.closest('.js-tabsblock'),
		$mobileBlock = $block.find('.js-mobile-tab-link'),
		$tabLinkBlock = $block.find('.js-mobiletabs'),
		tabBlock	= $block.find('.js-tab');

	$('.js-tab-link').each(function(){
		$(this).removeClass('-active');
	});

	tabBlock.each(function() {
		$(this).hide();
	});

	$tabLinkBlock.removeClass('visible');
	$this.addClass('-active');
	$('.js-tab__' + classBlock).show();
	$mobileBlock.text(thisText).removeClass('active');
});
/*TABS*/
/*SUMMOSELECT*/
	if ($('.js-select').length > 0) {
		$('.js-select').each( function(i, item) {
			var $this = $(this),
				attr = $this.attr('multiple'),
				settings = {
					placeholder: $this.data('title'),
					csvDispCount: 20,
					floatWidth: 0,
					nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
				};

			if ($this.attr('multiple')) {
				settings.selectAll = true;
				settings.selectAlltext = $this.data('select');
			}

			$this.SumoSelect(settings);
		});
		$('.SumoSelect').each(function(){
			var $select = $(this),
				$wrapper = $select.find('.optWrapper'),
				$caption = $select.find('.CaptionCont');

			$caption.on('click', function(e) {
				if ($wrapper.find('.options li').length > 4) {
					$wrapper.jScrollPane({
						contentWidth: '0px',
						verticalDragMinHeight : 12,
						verticalDragMaxHeight: 12,
						mouseWheelSpeed: 50,
						animateScroll: true,
						animateDuration: 100
					});
				} 
			});
		});
	}
/*SUMMOSELECT*/