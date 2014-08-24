var app = (function(w, d) {
	var visibleSub;

	var attachEvents = function() {
		$(document).ready(function(){
			$(".tabs").click(function(){
				showSubMenu($(".tabs").index(this));
				if(visibleSub==2 || visibleSub==3){
					if(visibleSub==2){
						$(".totalCost").text("Total Price:$100-$200");
					}
					else if(visibleSub==3){
						$(".totalCost").text("Total Price:$5000");
					}
				}
				else{
					$(".ceselected").each(function(){
					getCost($(this)); });
					getTotalCost();
				}
			});

			$(".backtoTab").click(function(){
				showMainTabs();
			});

			$(".result").click(function(){
				showSubList($(this));
			});

			$(".subSub ul li").click(function(){
				if($(this).parent().parent().attr('id')=="s"){
					getResult($(this));
				}
				else if($(this).parent().parent().attr('id')=="m"){
					getResults($(this));
				}

				getCost($(this));
				getTotalCost();
			});

		});

	};

	var getTotalCost=function(){
		var totalCost=0;
		$("#sub"+visibleSub.toString()+" div div ul .ceselected").each(function(){
			totalCost += parseFloat($(this).attr("value"));
		});
		$(".totalCost").text("Total Price:$"+totalCost);
	};


	var getCost=function(selection){
		var id=selection.parent().parent().parent().attr('id');

		var cost=0;
		$("#sub"+visibleSub+" #"+id+" .subSub ul .ceselected").each(function(){
			cost += parseFloat($(this).attr("value"));
		});
		$("#sub"+visibleSub+" #"+id+" div .cost").text("$"+cost);
	};



	//single selection
	var getResult=function(selection){
		var id=selection.parent().parent().parent().attr('id');

		//change class name for selected option
		if(selection.attr('class')=="notSelected"){
			$("#sub"+visibleSub+" #"+id+" .subSub ul .ceselected").addClass("notSelected");
			$("#sub"+visibleSub+" #"+id+" .subSub ul .ceselected").removeClass("ceselected");
			selection.removeClass("notSelected");
			selection.addClass("ceselected");
		}
	};

	//multiple selection
	var getResults=function(selection){

			if(selection.attr('class')=="notSelected"){
				selection.removeClass("notSelected");
				selection.addClass("ceselected");
			}
			else if(selection.attr('class')=="ceselected"){
				selection.removeClass("ceselected");
				selection.addClass("notSelected");
			}


	};


	var showSubList=function(selection){
		var id=selection.parent().attr('id');

		if(id){
			if(selection.hasClass("expanded")){
				$("#sub"+visibleSub+" #"+id+" .subSub").animate({height:"0px"}, 200);
				selection.removeClass("expanded");
			}
			else{
				$(".subSub").animate({height:"0px"}, 200);
				animateAuto($("#sub"+visibleSub+" #"+id+" .subSub"),200);
				$(".expanded").removeClass("expanded");
				selection.addClass("expanded");


			}
		}
	};

	var showSubMenu=function(index){
		$(".Tab").addClass("Tab-hide");
		$(".subContainer").show();
				$(".expanded").removeClass("expanded");

		$(".subMenu").hide();
		$("#sub"+index.toString()).show();
		$(".subSub").css( "height", "0px" );
		$(".backtoTab").show();
		$(".totalCost").show();
		$(".subContainer").removeClass("subContainer-hide");
		visibleSub=index;
		setTimeout(function(){$(".Tab").hide();},200);
	};

	var showMainTabs = function(){
		$(".subContainer").addClass("subContainer-hide");
		$(".Tab").show();
		setTimeout(function(){	$(".Tab").removeClass("Tab-hide");
								init();},200);
	};

	var init = function(callback) {
		// console.log('App init');

		$(".subContainer").hide();
		$(".subMenu").hide();//use css animation later

		$(".subSub").css( "height", "0px" );
		$(".backtoTab").hide();//use css animation later
		$(".totalCost").hide();

		if (callback){
			callback();
		}
	};


	var animateAuto = function(el, speed, callback){
		var elem, height;

		el = jQuery(el), elem = el.clone().css({"height":"auto"}).appendTo("body");
        height = elem.css("height"),
        elem.remove();
        el.animate({"height":height}, speed, callback);
	};

	return {
		attachEvents : attachEvents,
		init : init,
	};


})(window, document);

window.addEventListener('DOMContentLoaded', function(){
	app.init(function(){
		app.attachEvents();
	});
});
