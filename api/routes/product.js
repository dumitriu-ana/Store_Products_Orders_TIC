const router = require("express").Router();

const db = require("../db");


//POST prod
// router.post("/productadd", async (req, res) => {
//   let product = {
//     name: req.body.name,
//     price: req.body.price,
//     material: req.body.material,
//     description: req.body.description,
//   };
//   let added = await db.collection("products").add(product);
//   res.status(200).json({ id: added.id });
// });

//GET ALL prod
router.get("/products", async (req, res) => {
  let products = [];
  const result = await db.collection("products").get();

  result.forEach((doc) => {
    let product = {
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
      material: doc.data().material,
      description: doc.data().description,
    };
    products.push(product);
  });
  res.status(200).json(products);
});

//GET prod BY ID
router.get("/products/:id", async (req, res) => {
  let doc = await db.collection("products").doc(req.params.id).get();
  let product = {
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
      material: doc.data().material,
      description: doc.data().description,
  };
  if(product.id!=null){
    res.status(200).json(product);
  }
  res.status(404);
});

//PUT product
router.put("/products/:id", async (req, res) => {
  const response = await db
    .collection("products")
    .doc(req.params.id)
    .update(req.body);
  res.status(200).json("Edit successfull");
});

module.exports = router;
