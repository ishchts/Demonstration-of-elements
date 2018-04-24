/*DISABLED HOVER TOUCH*/
if ('createTouch' in document) {
	try {
		var ignore = /:hover/;
		for (var i = 0; i < document.styleSheets.length; i++) {
			var sheet = document.styleSheets[i];
			if (!sheet.cssRules) {
				continue;
			}
			for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
				var rule = sheet.cssRules[j];
				if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
					sheet.deleteRule(j);
				}
			}
		}
	}
	catch (e) {
	}
}
/*DISABLED HOVER TOUCH*/


$('.js-responsive-example-table').cardtable();

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
						animateDuration: 100,
					});
				} 
			});
		});
	}
	if ($('.js-select-no-scroll').length > 0) {
		$('.js-select-no-scroll').each( function(i, item) {
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
		});
	}

/*SUMMOSELECT*/
$('.js-breadcrumbs__list').jScrollPane({
	contentWidth: '0px',
	verticalDragMinHeight : 12,
	verticalDragMaxHeight: 12,
	mouseWheelSpeed: 50,
	animateScroll: true,
	animateDuration: 100,
	showArrows: false
});
$('.js-search__list').jScrollPane({
	contentWidth: '0px',
	verticalDragMinHeight : 12,
	verticalDragMaxHeight: 12,
	mouseWheelSpeed: 50,
	animateScroll: true,
	animateDuration: 100,
	showArrows: false
});

"use strict";
var blockUiOpen = false;

$.fn.center = function () {
	var top = ($(window).height() - this.height()) / 2;
	if (top < 0){
		top = 0; 
	}
	this.css("position","absolute");
	this.css("top", top  + "px");
	return this;
}

$(document).on('click', '.js-show-popup', function(e){
	e.preventDefault();
	var $form = $($(this).attr('href'));

	$.blockUI({ 
		message: $form,
		onOverlayClick: $.unblockUI,
		onBlock: function(){
			$('body').addClass('hidden-overflow');
			blockUiOpen = true;
			$form.addClass('visible');
		},
		onUnblock: function(){
			$('body').removeClass('hidden-overflow');
			blockUiOpen = false;
			$form.removeClass('visible');
		},
		css: { 
			border:0,
			centerY: false,
			position:'fixed',
			padding: 0,
			cursor: 'default',
			left: '0%',
			top: 0,
			right: '0%',
			width:'100%',
			height: '100%',
			marginBottom: '0',
			marginTop: '0',
			background: 'none',
			textAlign: 'left',
		},
			overlayCSS: {
				backgroundColor: 'rgba(36,27,73,0.9)',
				'cursor': 'default'
		},
		focusInput: false
	});
	if (!$form.hasClass('not-center')) {
		$form.center();
	}
});

/*CLOSE FORM*/
$(document).on('click touchstart','.js-close-form', function(e) {
	$.unblockUI();
	$('body').removeClass('hidden-overflow');
	$('.popUpForm.visible').removeClass('visible');
	blockUiOpen = false;
	e.preventDefault();
});

$(document).on('click touchstart', function(e) {
	var $target = $(e.target);
	if (!$target.is('input')) {
		if (blockUiOpen && ($target.closest('.popUpForm').length === 0)) {
			$.unblockUI();
			$('body').removeClass('hidden-overflow');
			$('.popUpForm.visible').removeClass('visible');
			blockUiOpen = false;
			e.preventDefault();
		}
	}
});

$(document).keyup(function(e) {
	if (e.keyCode == 27) { 
	$.unblockUI();
		$('body').removeClass('hidden-overflow');	
		$('.popUpForm.visible').removeClass('visible');
		blockUiOpen = false;
	}
});
/*CLOSE FORM*/


$(document).ready(function(){
  
  $(".js-search").click(function(){
  	$(this).closest('.formSearch__group').find('.containerS, .inputS').toggleClass("active");
  	var $this = $(this);
  	var $thisInput = $(this).closest('.formSearch__group').find('.inputS');
  	var list = $(this).closest('.search').find('.js-search__list');

  	if ($('.containerS').hasClass('active')) {
  		list.slideDown();
  	} else{
  		list.slideUp();
  	}

  });
  
});
/*slider start*/
if ($('.slider').length > 0 ) {
	$('.slider').each( function (i, item) {
		$(this).slick({
			centerMode: false,
			centerPadding: '0',
			slidesToShow: 3,
			variableWidth: true,
			dots: true,
			arrows: true,
			infinite: false,
			responsive: [
				{
					breakpoint: 1280,
					settings: {
						centerMode: false,
						centerPadding: '0',
						slidesToShow: 2,
						variableWidth: true,
					}
				},
				{
					breakpoint: 768,
					settings: {
						centerMode: false,
						centerPadding: '0',
						slidesToShow: 1,
						variableWidth: true,
						arrows: false,
						dots: false,
					}
				}
			]
		});
		$(this).addClass('visible');
	});
}
/*slider end*/
// gallery
$('.js-gallery-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.js-gallery-nav'
});
$('.js-gallery-nav').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.js-gallery-for',
	dots: true,
	centerMode: false,
	focusOnSelect: true,
	infinite: false,
	variableWidth: true,
});