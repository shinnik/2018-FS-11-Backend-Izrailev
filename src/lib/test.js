export default function say(name) {
  const childBlock = document.createElement('div');
  childBlock.className = 'dif_block';

  childBlock.innerHTML = `Hello, ${name}!`;

  const parentBlock = document.body;
  parentBlock.appendChild(childBlock);

  childBlock.id = 'another_background';
  console.log('text');
}
