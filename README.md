# Online Store where customers can place orders (Magazin online în care clienții pot plasa comenzi)

## User Registration Page  (Pagina de inregistrare a unui nou utilizator)
This is the section where a user can create a new account. Access the registration page and fill in the required information. Ensure that you follow the security requirements for the password. Please note that you cannot register with an existing email address, and the password must contain a minimum of 6 characters. <br>
Acesta este secțiunea în care un utilizator poate crea un cont nou. Accesează pagina de înregistrare și completează informațiile necesare. Asigură-te că respecți cerințele de securitate pentru parolă. Notă: nu poți înregistra un cont cu o adresă de email existentă și parola trebuie să conțină cel puțin 6 caractere.

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/766126a4-caa7-4311-b697-b34de6ed7a2e)

## Authentication Page (Pagina de autentificare)
The user account must be created before authentication. <br>
Contul utilizatorului trebuie creat înainte de autentificare.

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/078903be-6055-4970-89ea-bd229486946b)

## Home Page - View All Products (Buyer's Perspective)
## Pagina Acasa in care sunt afisate toate produsele (din perspectiva cumparatorului)

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/05cd60c7-4f1f-42a6-af31-947ddc9264ef)

## Seller's Dashboard - Home Page
## Pagina acasa in care un vanzator poate adauga produse si poate vedea produsele existente  (din perspectiva vanzatorului)

This page allows the seller to add a new product by filling in the following fields in the form: product name, price, material, and description. <br>
Această pagină permite vânzătorului să adauge un nou produs prin completarea următoarelor câmpuri din formular: numele produsului, prețul, materialul și descrierea. 

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/3cf0f608-974a-44a6-8811-bc812618d50f)

## Order Overview Page (Pagina Despre Comenzi)
This page provides users with the ability to view all ordered products. In this section, the total number of ordered products is calculated, along with the overall sum of all products. Additionally, information about the most expensive and cheapest purchased products is displayed. <br>
Users can sort these products alphabetically, based on price, or by both criteria. <br>
<br>
Această pagină oferă utilizatorului posibilitatea de a vizualiza toate produsele comandate. În această secțiune se calculează numărul total de produse comandate, suma totală aferentă tuturor produselor, precum și informații despre cel mai scump și cel mai ieftin produs cumpărat.<br>
Utilizatorul are opțiunea de a sorta aceste produse în ordine alfabetică, în funcție de preț sau în funcție de ambele criterii.<br>

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/ea59eef5-0d1c-46b9-8399-1dad4275792c)

## Firestore Database - Order List
This Firestore database contains a list of orders, each comprising the products ordered by individual users. <br>
Lista de comenzi care contine produsele comandate pentru fiecare user.

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/4416ab7b-e5e9-4aa5-b62a-7e3152151128)

## Firebase Authentication - User List
This Firebase Authentication module manages a list of users stored in the database. <br>
Lista de utilizatori din baza de date.

![image](https://github.com/dumitriu-ana/Store_Products_Orders_TIC/assets/72306782/03186518-abbb-475f-85c2-e8bf4b14c2d7)


## Pornirea Proiectului

Proiectul este divizat în două părți: frontend și backend. Deschide două terminale:

1. **Frontend:**
   ```bash
   cd front
   npm install
   npm run serve

2. **Backend:**
   ```bash
   cd api
   npm install
   node app.js
