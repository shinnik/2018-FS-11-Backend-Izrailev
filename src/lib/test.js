export default function say(name) {
  let childBlock;
  let parentBlock;

  childBlock = document.createElement('div');
  childBlock.style.background = 'Aquamarine';
  childBlock.style.textAlign = 'center';
  childBlock.style.margin = 'Auto';
  childBlock.style.marginTop = '250px';
  childBlock.style.width = '200px';
  // childBlock.style.height = "100px";
  childBlock.style.padding = '40px';
  // childBlock.style.marginLeft = "500px";
  // childBlock.style.marginTop = "300px";
  childBlock.style.border = '5px solid lightblue';

  childBlock.innerHTML = `Hello, ${name}!`;

  parentBlock = document.body;
  parentBlock.appendChild(childBlock);

  childBlock.id = 'another_background';
  console.log('text');
}
