const { default: fetch } = require("node-fetch");

function manipulateAndBind(incomingArray) {
    const arrayOfTenItems = range(10);
    const randomRestaurantsArray = arrayOfTenItems.map((item) => {
        const which = getRandomIntInclusive(0, incomingArray.length);
        const restaurant = incomingArray[which];
        return restaurant;
    });

    sessionStorage.setItem('shortRestaurantList', JSON.stringify(randomRestaurantsArray));

    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantsArray[0])}<br /><br />`;
    $('.flex-outer').append(div);

    const newDataShape = changeDataShape(randomRestaurantsArray);

    const div2 = document.createElement('div');
    const obj = {
        label: randomRestaurantsArray[0].category,
        y: randomRestaurantsArray.length
    };
    div.innerHTML = `<h2>What we want</h2> <br /> <h4>A category, how many things are in the category</h4><pre><code class="language-javascript">${JSON.stringify(obj)}`

    $('.flex-outer').append(div2);
}

function displayMatches(e, dataSet) {
    console.log(e.target.value);
    const matches = matchWord(e.target.value, dataSet);
    let placesHTML = matches.map(
        (place) => `
        <li>
            <span class="name">${place.name}</span><br>
            <span class="category">${place.category}</span>
            <address>${place.address_line_1}<br>
            ${place.city}<br>
            ${place.zip}<address>
            </li>
            `);
        if (e.target.value.length == 0) {
            placesHTML = [];
        }
        return placesHTML;
    }

    async function loadData() {
        const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
        const json - await data.json();
        sessionStorage.setItem('restaurantData', JSON.stringify(json));
    }

    async function mainThread() {
        console.log('Firing main thread');
        await loadData();
        console.log('Check session storage', sessionStorage);
        const restaurantData = JSON.parse(sessionStorage.getItem('restaurantData'));
        manipulateAndBind(restaurantData);
    }

    window.onload = mainThread;

        const input
        input.addEvent
            const
            const
            target.
    }