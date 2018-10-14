const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const urls = require('./db/urls');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.post('/api/puny', async (req, res) => {
    try {
        
        if(await urls.exists(req.body.name)){
            res.json({'error': 'That name already exists'})
            return;      
        }
        console.log('here');
        

        const url = await urls.create(req.body);
        res.json(url);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Listening on port: ${port}`);
    
});