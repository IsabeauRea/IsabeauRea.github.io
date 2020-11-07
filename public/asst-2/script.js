const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data));

function findMatches(wordsToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.city.match(regex) || place.zip.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
        const zipcode = place.zip.replace(regex, `<span class="h1">${this.value}</span>`);
        return `
        <li>
            <span class="name">${cityName}, ${zipcode}</span><br>
            <span class="population">${(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
    }

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);