import style from './index.css';

const temp = `<style>${style.toString()}</style>`;

function createFooter() {
  const body = document.body;
  const textbox = body.getElementsByTagName('div')[0];
  textbox.innerHTML += temp;
}

//function addFontLink() {
//    var head = document.head;
//    head.innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'
//}
createFooter();
//addFontLink();
