export default function say(name) {
  let childBlock;
  let parentBlock;

  childBlock = document.createElement('div');
  childBlock.className = "dif_block";

  childBlock.innerHTML = `Hello, ${name}!`;

  parentBlock = document.body;
  parentBlock.appendChild(childBlock);

  childBlock.id = 'another_background';
  console.log('text');
}
