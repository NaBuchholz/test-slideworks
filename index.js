require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	fetch(process.env.URL)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			console.log(data);
			let response = `<!DOCTYPE html><html><head><title>Desafio</title></head><body>${data.map(
				(item) => {
					if (item.id <= 100) {
						return `<h3>${item.albumId} / ${item.id} - ${item.title}</h3><img src='${item.url}'/><br />`;
					}
				}
			)}`;
			response = response.concat('</body></html>');
			fs.writeFile('Movies.html', response, (err) => {
				if (err) throw err;
				console.log('arquivo escrito okay');
			});
			res.end(response);
		})
		.catch((error) => {
			console.log('Erro ao obter os dados:', error);
			res.status(500).send('Erro ao obter os dados');
		});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
