
Index.prototype._ua = (function(){
	return {
		ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
		ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
		ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
		mobile:/android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
 	}
})();
/* ////////////////////////////////////////////////
* Event
//////////////////////////////////////////////// */
Index.prototype.onWindowLoad = function(){
	
}
Index.prototype.onWindowResize = function(){
	
}
Index.prototype.onWindowScroll = function(){
	
}
var _index = new Index();
function Index(){
	
	if(this._ua.ltIE6){
		//この中のコードはIE6以下用
	}
	if(this._ua.mobile){
		//この中のコードはスマートフォン、タブレット端末用
	}
	
	//Event
	window.onload = this.onWindowLoad;
	window.onresize = this.onWindowResize;
	window.onscroll = this.onWindowScroll;
	
}
