const Joi = require('joi');
const { json } = require('express');
const express = require('express');
const { default: getToots } = require('./getToots');
const app = express();

// app.put();
// app.delete();
const port = process.env.PORT || 3000;
const elements = [
    { id: 1, name: 'kevin' },
    { id: 2, name: 'norm' },
    { id: 3, name: 'barb' },
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/data', (req, res) => {
    // this is where you get the data
    // don't need to create a page for this

    // let data = getToots();
    // res.send(data);
    res.send(elements);
});

app.get('/api/data/:id', (req, res) => { // get one record based on id parameter
    const oneRecord = elements.find(d => d.id === parseInt(req.params.id));
    if (!oneRecord) { // not found
        res.status(404).send('No such record found.');
    }
    res.send(oneRecord);
});

app.post('/api/data', (req, res) => {

    const result = validateElement(req.body);

    if (result.error) return res.status(400).send(result.error.details[0].message); // send detailed error message
    
    const element = { // add new element
        id: elements.length + 1, name: req.body.name
    }
    elements.push(element);
    res.send(element); // send the added element back
});

app.put('/api/data/:id', (req, res) => {
    // look up element
    // if doesn't exist return 404
    const oneRecord = elements.find(d => d.id === parseInt(req.params.id));
    if (!oneRecord) { // not found
        res.status(404).send('No such record found.');
        return;
    }   
    // else validate element
    const result = validateElement(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message); // send detailed error message
        return;
    }
    // update element and return updated element
    oneRecord.name = req.body.name;
    res.send(oneRecord);
})

const validateElement = (element) => {
    const nameSchema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(element, nameSchema);
}

app.delete('/api/data/:id', (req, res) => {
    // look up element. Return 404 if not exists
    const oneRecord = elements.find(d => d.id === parseInt(req.params.id));
    if (!oneRecord) { // not found
        res.status(404).send('No such record found.');
        return;
    }
    // delete and return same course
    const index = elements.indexOf(oneRecord);
    elements.splice(index, 1);
    res.send(oneRecord);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
