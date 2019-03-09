export function setEndOfContenteditable(contentEditableElement)
{
    let range, selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
        // console.log(range, selection);
    }
}

export function placeCaretAfterNode(node) {
    if (typeof window.getSelection != "undefined") {
        var range = document.createRange();
        console.log(node);
        range.setStartAfter(node);
        range.collapse(false);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // console.log(selection, range)
    }
}
