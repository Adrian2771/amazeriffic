/* Bug Test functionality */

var main = function(arg){

	var $myList = $("<ul>");
	arg.forEach(function(elem){
		$tempLi = $("<li>");
		$tempLi.text(elem.description);
		elem.tags.forEach(function(elms){
			$tempUL = $("<ul>");
			$subLi = $("<li>").text(elms);
			$tempUL.append($subLi);
			$tempLi.append($tempUL);
		})
		$myList.append($tempLi);
	})
	$("body .initial-list").append($myList);

	var $arrCollector = [];
	arg.forEach(function(elm){
		elm.tags.forEach(function(elms){
			$pg = $("<p>").text(elms);
			$("body .modified").append($pg);
			$arrCollector.push($pg.text());
		});
		
	});
	console.log($arrCollector);
	
	function helper(myArr, myString){
		count = 0;
		myArr.forEach(function(el){
			if(el === myString){
				count++;
			}
		});
		return count;	
	};
	
	var $arrInter = [];
	$arrCollector.forEach(function(elmt){
		$arrInter.push(elmt);
	})

	// removing non-null duplicates from the array
	do{ 
		var flag = false;
		for(var i = 0; i < $arrInter.length; i++){
			if($arrInter[i] !== null && helper($arrInter, $arrInter[i]) > 1){
				$arrInter[i] = null;
				flag = true;
				break;
			};
		};
	}
	while(flag);

	console.log($arrInter);

	$arrInter.forEach(function(elt){
		if(elt !== null){
			$pg = $("<p>").text(elt);
			$("body .uniques").append($pg);
		}
		
	});	

	// constructing the new object

	var newObjArr = [];

	$arrInter.forEach(function(eln){
		if(eln !== null){
			var tempObj = {};
			tempObj.name = eln;
			tempObj.toDos =[];
			arg.forEach(function(w){
				for(var j = 0; j < w.tags.length; j++){
					if(w.tags[j] === eln){
						tempObj.toDos.push(w.description);
						break;
					}
				}

				});
			newObjArr.push(tempObj);
			};
		});
	console.log(newObjArr);

	var $finalList = $("<ul>");
	newObjArr.forEach(function(newObj){
		$tmpLi = $("<li>").text(newObj.name);
		$finalList.append($tmpLi);
		//$toDosLi = $("<li>");
		$tempUlst = $("<ul>");
		newObj.toDos.forEach(function(todo){
			$tempUlst.append($("<li>").text(todo));
		});

		$tmpLi.append($tempUlst);
		$finalList.append($tmpLi);

	});

	$("body .final").append($finalList);
};


$(document).ready(function(){
	$.getJSON("json/todos1.json", function(args){
		//console.log(args);
		main(args);
	});
});