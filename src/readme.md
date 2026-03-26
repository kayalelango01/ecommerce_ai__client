# LUXE E-Commerce — File Structure Guide

## How to Organise Your Project

Place files in your React project like this:

```
src/
├── App.js                        ← REPLACE your existing App.js
│
├── pages/
│   ├── LoginPage.jsx             ← existing (keep as is)
│   ├── LoginPage.css             ← existing (keep as is)
│   ├── SignupPage.jsx            ← existing (keep as is)
│   ├── SignupPage.css            ← existing (keep as is)
│   ├── LandingPage.jsx           ← existing (keep as is)
│   ├── LandingPage.css           ← existing (keep as is)
│   │
│   ├── CollectionsPage.jsx       ← NEW
│   ├── CollectionsPage.css       ← NEW
│   ├── NewInPage.jsx             ← NEW
│   ├── NewInPage.css             ← NEW
│   ├── SalePage.jsx              ← NEW
│   ├── SalePage.css              ← NEW
│   ├── DesignersPage.jsx         ← NEW
│   ├── DesignersPage.css         ← NEW
│   ├── AboutPage.jsx             ← NEW
│   ├── AboutPage.css             ← NEW
│   ├── CartPage.jsx              ← NEW
│   └── CartPage.css              ← NEW
│
├── components/
│   ├── Navbar.jsx                ← NEW (shared across all pages)
│   ├── Navbar.css                ← NEW
│   ├── ProductCard.jsx           ← NEW (reusable product card)
│   └── ProductCard.css           ← NEW
│
└── data/
    └── productData.js            ← NEW (all dummy product data)
```

---

## Install React Router (if not already installed)

```bash
npm install react-router-dom
```

---

## Import Paths to Check

In each new page file, update imports based on your folder structure:

- If pages are in `src/pages/`:
  ```js
  import Navbar from "../components/Navbar";
  import ProductCard from "../components/ProductCard";
  import { products } from "../data/productData";
  ```

- In `App.js`:
  ```js
  import CollectionsPage from "./pages/CollectionsPage";
  // etc.
  ```

---

## Features Included

| Feature               | Where                          |
|-----------------------|--------------------------------|
| Navbar with cart count| Navbar.jsx (all pages)         |
| Search bar            | Navbar → filters products      |
| Category filters      | CollectionsPage                |
| New arrivals          | NewInPage                      |
| Sale items            | SalePage                       |
| Designer profiles     | DesignersPage                  |
| Brand story & stats   | AboutPage                      |
| Add to Cart           | ProductCard (localStorage)     |
| Cart management       | CartPage                       |
| Sign out              | Navbar → clears session        |

---

## Cart Logic

- Cart is stored in `localStorage` under key `luxe_cart`
- Cart count in navbar auto-updates when items are added
- CartPage reads from `localStorage` and allows qty changes / removal