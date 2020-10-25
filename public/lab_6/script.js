// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(max) {
  return 
  Math.floor(Math.random()*Math.floor(max));
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newArr = range(10);
      const newArr2 = newArr.map(() => {
        const number = getRandomIntInclusive(0,243);
        return fromServer[number];
      });

      const reverseList = newArr2.sort((org,compare) => sortByKey(org,compare,'name'));
      const ol = document.createElement('ol');
      ol.className = '.flex-inner';
      $('form').prepend(ol);

      reverseList.forEach(el => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" values=${el.code}/>`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        (ol).appendChild(li);
      }); 
    })
    .catch((err) => console.log(err));
});