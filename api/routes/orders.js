const router = require("express").Router();

const db = require("../db");


//POST ord 
router.post("/buyproduct", async (req, res) => {
  try {
    const { email, product } = req.body.obj;

    if (!email || !product || !product.name || !product.price) {
      return res.status(400).json({ error: 'Email, name, and price are required' });
    }

    const orderData = {
      email: email,
      products: [
        {
          name: product.name,
          price: product.price,
        },
      ],
    };

    await db.collection("orders").add(orderData);
    res.status(200).json({ message: "Order added successfully" });
  } catch (error) {
    console.error('Error adding order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//GET ALL ord
router.get("/orders", async (req, res) => {
  let orders = [];
  const result = await db.collection("orders").get();

  result.forEach((doc) => {
    let order = {
      id: doc.id,
      email: doc.data().email,
    };
    orders.push(order);
  });
  res.status(200).json(order);
});

//GET ord BY ID
router.get("/orders/:id", async (req, res) => {
  let doc = await db.collection("orders").doc(req.params.id).get();
  let order = {
      id: doc.id,
      email: doc.data().email,
     
  };
  if(order.id!=null){
    res.status(200).json(order);
  }
  res.status(404);
});


//PUT ord
router.put("/orders/:id", async (req, res) => {
  try {
    const response = await db
      .collection("orders")
      .doc(req.params.id)
      .update(req.body);

   
    res.status(200).json("Edit successful");
  } catch (error) {

    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;


//iau produsele unui email
// Adaugă această rută pentru a obține lista de produse asociată unui email
router.get("/orders/products/:email", async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const orderDoc = await db.collection("orders").doc(email).get();

    if (orderDoc.exists) {
      const orderData = orderDoc.data();
      const products = orderData.products || [];

      res.status(200).json({ products });
    } else {
      res.status(404).json({ error: 'Order not found for the provided email' });
    }
  } catch (error) {
    console.error('Error getting order products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
