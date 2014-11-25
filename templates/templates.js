window.JST = {};JST["board-view"] = function anonymous(it) {
var out='<div class="board"> ';var arr1=it;if(arr1){var row,rowIndex=-1,l1=arr1.length-1;while(rowIndex<l1){row=arr1[rowIndex+=1];out+=' <div class="board__row"> ';var arr2=row;if(arr2){var cell,cellIndex=-1,l2=arr2.length-1;while(cellIndex<l2){cell=arr2[cellIndex+=1];out+=' <div class="board__cell" data-position="'+( rowIndex )+'-'+( cellIndex )+'">';if(cell > 0){out+=( cell );}out+='</div> ';} } out+=' </div> ';} } out+='</div>';return out;
};
JST["screen-board"] = function anonymous(it) {
var out='<header class="header--main title title--medium">Uber Sudoku</header> <div class="screen__content hcenter"> <div class="ui-component section" id="board-view"></div> <div class="fab-group medium aside" id="keyboard"> ';var arr1=it.buttons;if(arr1){var n,index=-1,l1=arr1.length-1;while(index<l1){n=arr1[index+=1];out+=' <div class="fab blue" data-key="'+( n )+'">'+( n )+'</div> ';} } out+=' </div></div>';return out;
};