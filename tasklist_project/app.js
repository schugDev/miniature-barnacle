//document.querySelector('.clear-tasks').addEventListener('click', function (e) {
//  console.log('Button clicked', new Date().getTime());
//
//  e.preventDefault();
//});
//
document.querySelector('.clear-tasks').addEventListener('mouseover',onClick);

function onClick(e) {

  document.querySelector('.clear-tasks').textContent = new Date().getTime();
  let r = Math.floor(Math.random() * 240);
  let g = Math.floor(Math.random() * 240);
  let b = Math.floor(Math.random() * 240);
  console.log(r);
  document.body.style.backgroundColor = 'rgb(' + r +','+b+','+g+')'; 
  
}