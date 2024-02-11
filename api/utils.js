const { faker } = require("@faker-js/faker");

const generateProducts = () => {
    let productsList = [];
    for (let i = 0; i < 10; i++) {
    
      let fname = faker.commerce.productName();
      let fprice = faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' });
      let fmaterial = faker.commerce.productMaterial();
      let fdescription = faker.commerce.productDescription();

      let prod = {
        name:fname,
        price: fprice,
        material: fmaterial,
        description: fdescription,
      };
      console.log(prod)
      console.log(fmaterial)
      productsList.push(prod);
    }
    console.log(productsList);
    return productsList;
  };

  module.exports = { generateProducts };