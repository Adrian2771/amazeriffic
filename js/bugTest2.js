/* Bug Test 2 functionality */

/* Starting from (an array of) objects containing unique toDo-s and multiple tags associated with each unique toDo, we are required to create (an array of) objects with an unique tag name and multiple toDo-s corresponding to that tag. The original objects have a string property named "description" (i.e. the unique toDo) and another property called "tags", which is an array of strings.

The newly created objects shall have a name property (the unique tag) and a toDos property, consisting of an array whose elements are strings (the previous 'description' properties).*/

function main(arg){

	var arrOfTags = [];
	arg.forEach(function(element){
		element.tags.forEach(function(tag){
			arrOfTags.push(tag);
		});
	});

	// we've created an array containing all the tags
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

	// Removing the duplicates from the array of tags
	do{
		var flag = false;
		for(var i = 0; i < arrOfTags.length; i++){
			if(arrOfTags[i] !== null && helperF2(arrOfTags, arrOfTags[i]) > 1){
				arrOfTags[i] = null;
				flag = true;
				break;
				// Break the inner loop and jump to the next iteration of the outer loop until the array contains only null and unique string elements
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

	console.log(arrOfNewObj);
};

$(document).ready(function(){
	$.getJSON("json/todos1.json", function(args){
		main(args);
		console.log(args);
	});
	
});