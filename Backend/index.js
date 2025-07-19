import express from 'express';
const app= express();
const Port = process.env.PORT || 3000;
import cors from 'cors';
import bodyParser from 'body-parser';
app.use(cors());
app.use(bodyParser.json());

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
