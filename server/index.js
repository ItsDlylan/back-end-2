const express = require('express');
const cors = require('cors');
const ctrl = require('./Controller');
const app = express();

const baseURL = '/api/houses';

app.use(express.json());
app.use(cors());

// Gets all houses when the query is the baseURL on a get request
app.get(baseURL, ctrl.getHouses);

// creates a house when the baseURL is sent on a post request
app.post(baseURL, ctrl.createHouse);

// Deletes a house from the house db when a delete request at that query is made.
app.delete(`${baseURL}/:id`, ctrl.deleteHouse);

// updates the house item when a put request at the query is made.
app.put(`${baseURL}/:id`, ctrl.updateHouse);

app.listen(4004, () => {
	console.log(`server running on port 4000`);
});
