// fetch request
const boston = fetch('https://burlacenko.github.io/data/bostonData.json')
	.then(response => response.json());

export default await boston;


// "await" keyword before specifying the constant boston to export
// This means any other modules which include this one will wait until colors has been downloaded and parsed before using it.