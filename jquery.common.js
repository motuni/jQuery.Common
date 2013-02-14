/*
--------------------------------------------------------
jQuery Utility Plugin
https://github.com/motuni/jQuery.Common

Update:2013.2.14
--------------------------------------------------------
*/

(function($){

	/* ////////////////////////////////////////////////
	 * SlideDown Menu
	//////////////////////////////////////////////// */

	$.fn.slideDownMenu = function(options){

		var settings = $.extend({
			sub : '.sub', // スライドダウンする要素(ul)のクラス名
			down : 'normal',
			up : 'fast'
		}, options);

		this.find('li').hover(
			function(){
				$(this).find(settings.sub).slideDown(settings.down);
			},function(){
				$(this).find(settings.sub).slideUp(settings.up);
			}
		);

		return this;
	}

	/* ////////////////////////////////////////////////
	 * RollOver Effect
	//////////////////////////////////////////////// */

	$.fn.rollOver = function(options){

		var settings = $.extend({
			alpha : 0.7
		}, options);

		$(this)
		.hover(function(){
			$(this).css({'opacity': settings.alpha});
		},function(){
			$(this).css({'opacity': 1.0});
		});

		return this;
	}
	$.fn.rollOverImg = function(options){

		var settings = $.extend({
			hName : '_on' // ロールオーバー時の接尾語
		}, options);

		$(this).each(function(i){
			var src = $(this).attr('src');
			var hSrc = src.replace(/^(.+)(\.[a-z]+)$/, '$1'+ settings.hName +'$2');
			var img = new Image();img.src = hSrc; // ロールオーバー画像をプリロード

			$(this).hover(function(){
				$(this).attr('src', hSrc);
			},function(){
				$(this).attr('src', src);
			});
		});

		return this;
	}

	/* ////////////////////////////////////////////////
	 * Scroll to Anchor
	 * @speed : 'slow', 'normal', 'fast', 'ミリ秒'
	 * @easing : 'linear', 'swing', 'jswing'
	//////////////////////////////////////////////// */

	$.fn.scrollToAnc = function(options){

		var settings = $.extend({
			speed : 'normal',
			easing : 'swing'
		}, options);

		this.click(function(){
			$($.browser.webkit ? 'body' : 'html').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, settings.speed, settings.easing); return false;
		});

		return this;
	}

	/* ////////////////////////////////////////////////
	 * Floating Contents(Vertical)
	//////////////////////////////////////////////// */

	$.fn.floatingY = function(options){

		var settings = $.extend({
			speed : 'normal',
			easing : 'swing',
			delay : 100,
			offsetY : 0
		}, options);

		var self = this;
	  	var offset = self.offset();
		var delayTimer;

		$(window).scroll(function() {
			clearTimeout(delayTimer);
			delayTimer = setTimeout(function(){
				if($(window).scrollTop() > offset.top) {
					self.stop().animate({top: $(window).scrollTop() - offset.top + settings.offsetY}, settings.speed, settings.easing);
				} else {
					self.stop().animate({top: 0}, settings.speed, settings.easing);
				}
			}, settings.delay);
		});

		return this;
	}

	/* ////////////////////////////////////////////////
	 * Accordion
	//////////////////////////////////////////////// */

	$.fn.slideAccordion = function(options){

		var settings = $.extend({
			speed : 'normal',
			bar: '.bar',
			contents: '.barCont'
		}, options);

		var self = this;
		
		$(settings.contents, this).hide();
		
		$(settings.bar, this).each(function(){
			$(this).css({'cursor': 'pointer'})
			.hover(
				function(){
					$(this).addClass('hover');
				},function(){
					$(this).removeClass('hover');
				}
			)
			.click(function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$(this).next().slideUp(settings.speed);
				}else{
					// reset
					$(settings.bar, $(self)).removeClass('active');
					$(settings.contents, $(self)).slideUp(settings.speed);
					// add
					$(this).removeClass('hover').addClass('active');
					$(this).next().slideDown(settings.speed);
				}
			})
			/*
			.toggle(
				function(){
					$(this).removeClass('hover').addClass('active');
					$(this).next().slideDown(settings.speed);
				}
				,function(){
					$(this).removeClass('active');
					$(this).next().slideUp(settings.speed);
				}
			)
	*/
		});

		return this;
	}

	/* ////////////////////////////////////////////////
	 * Tab
	//////////////////////////////////////////////// */

	$.fn.tabs = function(options){

		var settings = $.extend({
			initNo : 0,
			tab : '.tab',
			tabMain : '.tabMain'
		}, options);

		var addNo = function(target){
			//reset
			$(settings.tab).children().removeClass('active');
			$(settings.tabMain).children().hide();
			//active
			target.addClass('active');
			var a = $('a', target).attr('href');
			$(a, settings.tabMain).fadeTo('fast', 1); // or show()
		}

		$(settings.tab).children().each(function(i){
			$(this)
			.css({'cursor': 'pointer'})
			.hover(
				function(){
					$(this).addClass('hover');
				},function(){
					$(this).removeClass('hover');
				}
			)
			.click(function(){
				addNo($(this));
				return false;
			});
			if(i == settings.initNo){
				addNo($(this));
			}
		});

		return this;
	}

	/* ////////////////////////////////////////////////
	 * Tooltip
	//////////////////////////////////////////////// */

	$.fn.tooltips = function(options){

		var settings = $.extend({
			tooltipArea : 'tooltipArea',
			offsetY : -20,
			offsetX : 20
		}, options);
		
		var titleTxt = '';
		var tooltip = $('<div />').attr('id', settings.tooltipArea)
		
		this
		.hover(function(e){
			titleTxt = $(this).attr('title');
			$(this).attr('title', '');
			tooltip
				.appendTo('body')
				.text(titleTxt)
				.css({top: e.pageY + settings.offsetY, left: e.pageX + settings.offsetX}); 
		},function(){
			$(this).attr('title', titleTxt);
			tooltip.remove();
		})
		.mousemove(function(e){
			tooltip.css({top: e.pageY + settings.offsetY, left: e.pageX + settings.offsetX}); 
		});

		return this;
	}

})(jQuery);


$(function(){
	
	// SlideDown Menu
	$('.menuArea .list').slideDownMenu({'down': 300, 'up': 100});

	// RollOver Effect
	$('.onOver').rollOver({alpha: 0.4});
	$('.onOverImg').rollOver({alpha: 0.2}).rollOverImg({hName: '_on'});

	// Scroll to Anchor
	$('.pagetop a').scrollToAnc();
	$('.side a').scrollToAnc({speed: 'fast', easing: 'swing'});

	// Floating Contents
	$('.side').floatingY({delay: 60, offsetY: 20});

	//Accordion
	$('.accordion .accGrp').slideAccordion({
		speed: 200
	});

	// Tab
	$('.tabArea').tabs({
		tab: '.tab'
		,tabMain: '.tabMain'
		,initNo: 0
	});

	// Tooltip
	$('.tooltip').tooltips({
		tooltipArea: 'tooltipArea', 
		offsetY: -20, 
		offsetX: 20
	});
	
});