require('dotenv').config();
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000


app.get('/', (req, res) => {

	let json = JSON.parse(fs.readFileSync(process.env.URL))
	let response = `<html><head><title>Desafio</title></head><body>`

	json.forEach((i, item) => {
		if ( i <= 100 ){
			response = `<h3>${item.albumId} / ${item.id} - ${item.title}</h3><img src='${item.url}'><br />`
		}
	})

	response += `</body>`

	res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})