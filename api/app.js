const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { generateProducts } = require("../api/utils");
const productRouter = require("../api/routes/product");
const userRouter = require("../api/routes/users");
const orderRouter = require("../api/routes/orders");
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const db = require("./db");

const secret = "your-secret-key";

const firebaseConfig = {
  apiKey: "AIzaSyA6u-5-xQCv548sHlvx1FS18IdFhMwajQM",
  authDomain: "anaproiectticvue.firebaseapp.com",
  databaseURL: "https://anaproiectticvue-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "anaproiectticvue",
  storageBucket: "anaproiectticvue.appspot.com",
  messagingSenderId: "1076193723213",
  appId: "1:1076193723213:web:fc9dfdaabbd166565ded04",
  measurementId: "G-VYKC368DP1"
};

const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth(appFirebase);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", productRouter);
app.use("/users", userRouter);
app.use("/", orderRouter);

app.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});



// REGISTER USER
app.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      res.send("User already exists");
    } else {
      if (!email) {
        res.status(400).send("Email is required");
        return;
      }
      //const userCredential = await createUserWithEmailAndPassword(auth, email, "");

      const userData = {
        email: email,
      };

      await db.collection("users").add(userData);

      res.status(200).send("Register OK");
    }
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// LOGIN USER
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    let token = jwt.sign(
      {
        email: userCredential.user.email,
      },
      secret,
      { expiresIn: "7 days" }
    );

    let response = {};
    response.token = token;
    response.message = "Acces granted";
    res.status(200).json(response);
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// POPULATE DB prod
app.get("/populateproducts", async (req, res) => {
  let productsGeneratedList = generateProducts();
  productsGeneratedList.forEach(async (prod) => {
    await db.collection("products").add(prod);
  });

  res.status(200).send("Populate with products ok");
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
});


app.post("/buyproduct", async (req, res) => {
  try {
    const { email, product } = req.body;

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

    res.status(200).send("Order added successfully");
  } catch (error) {
    console.error('Error adding order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// get produse din email
app.get("/orders/products/:email", async (req, res) => {
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

app.post("/productadd", async (req, res) => {
  try {
    const prod = req.body;

    if (!prod) {
      throw new Error('Invalid request body');
    }

    console.log("Received product data:", prod);

    await db.collection("products").add(prod);

    console.log("Product added successfully");

    res.status(200).send("Product added successfully");
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
