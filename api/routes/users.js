const router = require("express").Router();
const db = require("../db");


router.post("/register", async (req, res) => {
    let user = {
      email: req.body.email,
    };
    let added = await db.collection("users").add(user);
    res.status(200).json({ id: added.id });
  });

  //get all us
router.get("/users", async (req, res) => {
    let users = [];
    const result = await db.collection("users").get();
  
    result.forEach((doc) => {
      let user = {
        id: doc.id,
        email: doc.data().email,
      };
      users.push(user);
    });
    res.status(200).json(user);
  });

//GET user BY ID
router.get("/users/:id", async (req, res) => {
    let doc = await db.collection("users").doc(req.params.id).get();
    let user = {
        id: doc.id,
        email: doc.data().email,
       
    };
    if(user.id!=null){
      res.status(200).json(user);
    }
    res.status(404);
  });

  //PUT user
router.put("/users/:id", async (req, res) => {
    const response = await db
      .collection("users")
      .doc(req.params.id)
      .update(req.body);
    res.status(200).json("Edit successfull");
  });


module.exports = router;
