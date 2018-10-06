export default function say(name) {
	
	var child_block;
	var parent_block;

	child_block = document.createElement( 'div' );
	child_block.style.background = "Aquamarine";
	child_block.style.textAlign = "center";
	child_block.style.margin = "Auto";
	child_block.style.marginTop = "250px";
	child_block.style.width = "200px";
	//child_block.style.height = "100px";
	child_block.style.padding = "40px";
	//child_block.style.marginLeft = "500px";
	//child_block.style.marginTop = "300px";
	child_block.style.border = "5px solid lightblue"
	
	child_block.innerHTML = `Hello, ${name}!`;
	
	parent_block = document.body;
	parent_block.appendChild(child_block);
	
	child_block.id = "another_background";
	console.log("text");

};

