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
	$(this).closest('.exampleMenu').find('.exampleMenu__menu').fadeToggle();
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
$(window).on('resize',function(){
	var $pane = $('.js-breadcrumbs__list');
	var api = $pane.data('jsp');
	api.reinitialise();
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
	var $this = $(this),
		$form = $('#' + $this.attr('data-id')),
		$data = $(this).attr('data-id');

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
				backgroundColor: 'rgba(0,0,0,0.9)',
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
var searchList = function(){
	$('.js-search__list').jScrollPane({
		contentWidth: '0px',
		verticalDragMinHeight : 12,
		verticalDragMaxHeight: 12,
		mouseWheelSpeed: 50,
		animateScroll: true,
		animateDuration: 100,
		showArrows: false,
		verticalDragMinHeight: 80,
		verticalDragMaxHeight: 80,
		horizontalDragMinWidth: 80,
		horizontalDragMaxWidth: 80
	});	
}
$(window).resize(function() {
   searchList();
});
$(document).ready(function(){  
  $(".js-search").click(function(){

	$(this).closest('.formSearch__group').find('.containerS, .inputS').toggleClass("active");
	var $this = $(this);
	var $thisInput = $(this).closest('.formSearch__group').find('.inputS');
	var list = $(this).closest('.search').find('.js-search__list'),
		$closest = $this.closest('.search');

	$thisInput.focus();

	$closest.find('.js-search__list').slideUp();
  });
});
$(document).on('keypress','.js-formSearch__input',function(){
	var $this = $(this),
		$closest = $this.closest('.search');

		$closest.find('.js-search__list').slideDown(function(){
			searchList();
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
	arrows: true,
});

/* ajax */

$(document).ready(function(){              
	$('.js-showMore').click(function(e){      
		e.preventDefault();

		var text = $(this).closest('.news').find('.article__text p').load('ajax/example.html');
	});

	$(document).on('click','.js-btnSent',function(){
		$.ajax({
		    url: '/ajax/exampleForm.html',             // указываем URL и
		    dataType : "json",                     // тип загружаемых данных
		    success: function (data, textStatus) { // вешаем свой обработчик на функцию success
		           console.log(1);
		        $.each(data, function(i, val) {    // обрабатываем полученные данные
		        });
		    },
		    beforeSend: function(){
		    	console.log(2);
		    },
		    complete: function(){
		    	console.log( ' complete ' )
		    }
		});		
	})


	// $.ajax({
	// 	type: 'get',
	// 	success:function (data) {
	// 		var $data = $(data); 

	// 		$('#stocks-block-ajax').append($data.find('#stocks-block-ajax .preview-stock-block').hide().show('slow'));
	// 		$('#navigation-ajax-block').replaceWith($data.find('#navigation-ajax-block'));
	// 		$('#show-next-block').show();
	// 	}
	// });
}); 


// функция изменение количества товаров

function changeQuantity($link, value){

if ($link.length <= 0){

return;

}

var $input = $link.parent().find('input'),

count = parseInt($input.val()) + value;

count = count < 1 ? 1 : count;

$input.val(count);

if (isNaN($input.val())){

$input.val(1)

}

}

$(document).on('click','.js-cardQuantity__minus', function(event){

event.preventDefault();

changeQuantity($(this), -1);

});

$(document).on('click','.js-cardQuantity__plus', function(event) {

event.preventDefault();

changeQuantity($(this), 1);

});

$(document).on('keydown','.js-cardQuantity__input',function(e){

var key = e.charCode || e.keyCode || 0;

return (

key == 8 ||

key == 9 ||

key == 46 ||

(key >= 37 && key <= 40) ||

(key >= 48 && key <= 57) ||

(key >= 96 && key <= 105));

});

$(document).on('change','.js-cardQuantity__input', function(event){
changeQuantity($(this), 0);
});

$(document).on('click','.js-card__close',function(e){
	e.preventDefault();
	$(this).closest('.card').fadeOut();
});

$(document).on('click','.js-catalog-view',function(e){
	e.preventDefault();
	var $this = $(this),
		thisData = $this.data('id'),
		$catalog = $('.js-catalog-list'),
		catalogData = $catalog.data('view');

	$('.js-catalog-view').removeClass('current');	
	$this.addClass('current');
	
	$catalog.attr('data-view', thisData);

});

//input upload 
$(document).on('change','.js-uploadFile__input',function(){
	var $thisVal = $(this).val();
	$(this).next().text($thisVal);
});

// отмена выделения 
$(document).on('onselectstart onmousedown','*',function(){
	return false;
})
