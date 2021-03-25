const express = require('express');
const path = require('path');
const app = express();

const port = 8000 || process.env.PORT;

app.use(express.static(path.join(__dirname,'public')));

app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})