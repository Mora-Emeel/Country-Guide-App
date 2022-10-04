let countryInp = document.getElementById("countrey-inp");
let searchBtn = document.getElementById("search-btn");
let resultWrapper = document.getElementById("result");

searchBtn.addEventListener("click", () => {
	let countryName = countryInp.value;
	let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
	// console.log(finalURL);
	fetch(finalURL)
		.then(res => res.json())
		.then(data => {
			console.log(data[0]);
			// console.log(data[0].name.common);
			// console.log(data[0].flags.svg);
			// console.log(Object.keys(data[0].currencies));
			// console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
			// console.log(data[0].currencies[Object.keys(data[0].currencies)].symbol);
			// console.log(data[0].capital[0]);
			// console.log(data[0].region);
			// console.log(Object.values(data[0].languages).join(", "));
			countryInfo(data[0]);
		})
		.catch(() => {
			if (countryName.length == 0) {
				resultWrapper.innerHTML = `
					<h3>The input field can't be empty</h3>
				`;
			} else {
				resultWrapper.innerHTML = `
					<h3>Please enter a valid country name</h3>
				`;
			}
		});
});
function countryInfo(data) {
	resultWrapper.innerHTML = `
		<img src="${data.flags.svg}" id="flag" alt="flag">
		<p><strong>Country: </strong>${data.name.common.toUpperCase()}</p>
		
		<p><strong>Capital: </strong>${data.capital[0]}</p>
		<p><strong>Population: </strong>${data.population}</p>
		<p><strong>Continent: </strong>${data.region}</p>
		<p><strong>Languages: </strong>${Object.values(data.languages)
			.toString()
			.split(",")
			.join(", ")}</p>
		<p><strong>Currency: </strong>${
			data.currencies[Object.keys(data.currencies)].name
		} - ${data.currencies[Object.keys(data.currencies)].symbol}</p>
	`;
	countryInp.value = "";
}
