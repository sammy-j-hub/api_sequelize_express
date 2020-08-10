const express = require('express');
const models = require("./models/");
const Order = models.Order;
const User = models.User;
const Product = models.Product;
const OrderItem = models.OrderItem;

const app = express();
const port = 4000;

app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Okay");
    console.log("ok")
});
app.get("/orders/:id", (req, resp) => {
    Order.findByPk(req.params.id, {
      include: [User, OrderItem]
    }).then(o => resp.send(o.dataValues));
  });
app.post("/orders", (req,res)=>{
    Order.create(req.body,{include :[OrderItem]}).then( o=>
        res.send(o.dataValues)
    );
});
app.put("/orders/:id",(req,res)=>{
    Order.findByPk(req.params.id).then(o =>{
        o.update(req.body).then((o2)=>{
            res.send(o2.dataValues)
        });
    });
});

app.listen(port, ()=>{
    console.log("Server is listening on "+port);
})