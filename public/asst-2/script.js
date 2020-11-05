
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

    async function SOMETHING() {
        const data
        const json
        const input
        input.addEvent
            const
            const
            target.
    }