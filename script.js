const url = 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=Seattle';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1729b91219mshcbdfddad1105223p1438f7jsn7af3323f65d8',
		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}