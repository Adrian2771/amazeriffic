/* application functionality */



var main = function(args){
	"use strict";
	/* var toDos = [
	"Finish writing this book",
	"Take Gracie to the park",
	"Answer emails",
	"Prep for Monday's class",
	"Make up some new ToDos",
	"Get Groceries"
	]; */

	/*
	// version 1
	var tabNumber;
	for(tabNumber = 1; tabNumber <= 3; tabNumber++){
		var tabSelector = ".tabs a:nth-of-type(" + tabNumber + ")";

		$(tabSelector).on("click", function(){
			$(".tabs span").removeClass("active");
			event.target.setAttribute("class", "active"); // use event object in order to retrieve the properties of the target element
			return false;
		})
	}*/

	// version 3
	
	var toDos = args.map(function(elem){
		return elem.description;
	});
	
	$(".tabs span").toArray().forEach(function(element){
		$(element).on("click", function(){

			var $elem = $(element);
			$(".tabs span").removeClass("active");
			$(element).addClass("active");
			$("main .content").empty();


			function AuxFunc(){
				var $temp = $("<ul>");
				toDos.forEach(function(todo){
				$temp.append($("<li>").text(todo));
				});
				$("main .content").append($temp);
			}

			if($elem.parent().is(":nth-of-type(1)")){
				console.log("Newest tab clicked, action comes later");
				var $len = toDos.length;
				var $temp = $("<ul>");
				for(var i = $len - 1; i >= 0; i--){
					$temp.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($temp);
			}
			else if($elem.parent().is(":nth-of-type(2)")){
				console.log("Oldest tab clicked, action comes now");
				AuxFunc();
			}
			else if($elem.parent().is(":nth-of-type(3)")){
				console.log("Tags tab clicked!");

				 function ReturnOrganizedByTabs(arg){
				 	var arrOfTags = [];
					arg.forEach(function(element){
						element.tags.forEach(function(tag){
							arrOfTags.push(tag);
						});
					});

					console.log(arrOfTags);

					function helperF2(arrOfStr, myStr){
						var countElems = 0;
						arrOfStr.forEach(function(elt){
							if(elt === myStr){
								countElems++;
							};
						});

						return countElems;
					};


					do{
						var flag = false;
						for(var i = 0; i < arrOfTags.length; i++){
							if(arrOfTags[i] !== null && helperF2(arrOfTags, arrOfTags[i]) > 1){
								arrOfTags[i] = null;
								flag = true;
								break;
							};
						};

					}while(flag);

					console.log(arrOfTags);

					var arrOfNewObj = [];

					arrOfTags.forEach(function(elmt){
						if(elmt !== null){
							var tempObj = {};
							tempObj.name = elmt;
							var temp1 = [];
							arg.forEach(function(elmn){
							elmn.tags.forEach(function(elmnt){
								if(elmnt === elmt){
									temp1.push(elmn.description);
								};
							});
						});
						tempObj.toDos = temp1;
						arrOfNewObj.push(tempObj);
						};
					
					});

					return arrOfNewObj;
				};

				var organizedByTags = ReturnOrganizedByTabs(args);

				organizedByTags.forEach(function(elem){
					var $tagName = $("<h3>").text(elem.name);
					var $content = $("<ul>");
					
					elem.toDos.forEach(function(argmt){
						var $li = $("<li>").text(argmt);
						$content.append($li);
					});
					
					$("main .content").append($tagName);
					$("main .content").append($content);
					
				});
			}
			else{
				if($("#input").val() !== ""){
					console.log("Add tab clikced, action needed imediately!");
					toDos.push($("#input").val());
					AuxFunc();
				}
			}

			return false;
		})
	});
}


$(document).ready(function(){
	$.getJSON("json/todos1.json", function(arg){
		//console.log(arg);
		main(arg);
		
	});
});