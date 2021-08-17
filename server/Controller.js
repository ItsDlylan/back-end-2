const houses = require('./db.json');

let globalID = 3;

module.exports = {
	getHouses: (req, res) => {
		res.status(200).send(houses);
	},
	createHouse: (req, res) => {
		let { address, price, imageURL } = req.body;
		let newHouse = {
			id: ++globalID,
			address,
			price: parseInt(price),
			imageURL,
		};
		console.log(newHouse.id);
		houses.push(newHouse);

		if (address !== '' && price !== '' && imageURL !== '') {
			res.status(200).send(houses);
		} else {
			res.status(400).send(
				`Hey buddy, you look like you're missing some information of this property. do we look like cheapos here?`,
			);
		}
	},
	updateHouse: (req, res) => {
		let { id } = req.params;
		let { type } = req.body;
		let index = houses.findIndex((e) => e.id === +id);

		if (type === 'minus' && houses[index].price >= 10000) {
			houses[index].price -= 10000;
			res.status(200).send(houses);
		} else if (type === 'plus') {
			houses[index].price += 10000;
			res.status(200).send(houses);
		} else {
			res.status(400).send(
				`Hey buddy. it seems that what you're clicking isnt a feature. you might be a king for that.`,
			);
		}
	},
	deleteHouse: (req, res) => {
		let { id } = req.params;
		let index = houses.findIndex((e) => e.id === +id);
		// when delete update all the ids and move it back one and update the global id back to the length of the array - 1.
		for (let i = index + 1; i <= houses.length; i++) {
			houses.id -= 1;
			globalID = houses.length - 1;
		}
		houses.splice(index, 1);
		res.status(200).send(houses);
	},
};
