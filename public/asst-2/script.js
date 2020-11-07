function findMatches(wordsToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
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

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);