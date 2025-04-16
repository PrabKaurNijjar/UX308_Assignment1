import { Order } from "./Order.js"; // Updated import
import express from 'express';

const app = express();
const port = process.env.PORT || parseInt(process.argv.pop()) || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("www"));
let orders = {};

app.post("/sms", (req, res) => {
  let senderNumber = req.body.From || req.body.from;
 
  if (!orders.hasOwnProperty(senderNumber)) {
    orders[senderNumber] = new Order(senderNumber);
  }
 
  let message = req.body.Body || req.body.body;
  let reply = orders[senderNumber].handleInput(message);
 
  res.setHeader('content-type', 'text/xml');
  let response = "<Response>";
  for (let i = 0; i < reply.length; i++) {
    response += "<Message>";
    response += reply[i];
    response += "</Message>";
  }
  res.end(response + "</Response>");
 
  if (orders[senderNumber].isOrderComplete()) {
    delete orders[senderNumber];
  }
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});