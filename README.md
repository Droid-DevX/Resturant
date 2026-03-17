<div align="center">

#  Maharaja Family Restaurant
**Where Every Meal is a Royal Feast.**

![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg?style=for-the-badge&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=for-the-badge&logo=threedotjs)
![GSAP](https://img.shields.io/badge/GSAP-Animations-green.svg?style=for-the-badge&logo=greensock)

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

##  About The Project

Welcome to the official frontend application for **Maharaja Family Restaurant**, located in the heart of Gulbarga (Kalaburagi), Karnataka. 

This highly interactive web application is crafted with surgical precision to provide a **premium, dynamic, and aesthetic** digital experience. From the majestic Mughlai cuisine to the elegant digital storefront, everything speaks royalty.

###  Royal Highlights

- **Aesthetic Royal Design:** A harmonious blend of Gold, Deep Red, and Charcoal colors. Combined with premium typography (`Playfair Display`, `Cinzel`) reflecting pure elegance.
- **Fluid & Cinematic Animations:** Powered by **GSAP** & **Lenis**, delivering ultra-smooth scroll reveals, magnetic cursor effects, and native-feeling smooth scrolling.
- **Breathtaking 3D Canvas:** Interactive WebGL particle backgrounds and parallax hero effects engineered with **Three.js**.
- **Performance First:** Built with bleeding-edge tools—**React 19** and **Vite**, boasting near-instant loading times and blazing fast Hot Module Replacement (HMR).

---

##  Technology Stack

We've chosen the absolute best-in-class technologies to deliver a zero-compromise experience:

| Category | Technologies Used |
| :--- | :--- |
| **Framework** | React 19, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Vanilla CSS (Variables, Flexbox/Grid, Responsive) |
| **3D & Canvas** | Three.js |
| **Animations** | GSAP, Split-Type |
| **Scrolling** | Lenis |
| **Assets** | FontAwesome, Google Fonts |

---

##  Getting Started

Follow these instructions to set up your local development environment.

### Prerequisites

Ensure you have the latest stable version of [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate into the directory:**
   ```bash
   cd Resturant
   ```

3. **Install dependencies:**
   *(Note: Use `--legacy-peer-deps` if you face React 19 compatibility warnings with third-party libraries).*
   ```bash
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Feast your eyes:**
   Open your browser and navigate to `http://localhost:5173`.

---

##  Architecture & Structure

```text
src/
├── animations/       # GSAP timelines, Lenis scroll setups, text splitting
├── assets/           # High-resolution images, SVG icons, brand assets
├── components/       # Reusable, atomic React components (Navbar, Footer)
│   ├── Hero.tsx      # Cinematic intro with 3D canvas overlay
│   ├── MenuSection   # Category-based list with tilt-cards
│   └── ...
├── data/             # Static restaurant data (Menu items, reviews, locations)
├── scene/            # Three.js 3D environment & WebGL configurations
├── styles/           # Global styles, variables, and responsive constraints
├── App.tsx           # Application orchestrator mapping routing & context
└── main.tsx          # React DOM mounting and global providers
```

---

##  Responsive & SEO Best Practices

- **Flawless Responsiveness:** Seamless scaling across all devices—from large desktop monitors to compact mobile screens, ensuring a consistent royal experience.
- **Search Engine Optimized:** Semantic HTML5 document structure equipped with targeted meta descriptions for "Gulbarga restaurant", "Mughlai cuisine", "Biryani", and "Mandi", optimizing local search visibility.

---

##  Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/RoyalFeature`)
3. Commit your Changes (`git commit -m 'Add some RoyalFeature'`)
4. Push to the Branch (`git push origin feature/RoyalFeature`)
5. Open a Pull Request

---

