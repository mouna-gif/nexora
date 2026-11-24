# Nexora Mobile — Connected Business Application

<p align="center">
  <img src="public/favicon.svg" alt="Nexora Logo" width="110" />
</p>

<h1 align="center">NEXORA MOBILE</h1>

<p align="center">
  <strong>Your Business, Connected Everywhere.</strong>
</p>

<p align="center">
  A mobile application connected to the Nexora Stock ecosystem, bringing product access, order management, and inventory information directly to customers and employees.
</p>

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-brown?style=flat)

---

## Overview

**Nexora Mobile** is a mobile application designed to extend the capabilities of the main **Nexora Stock** platform to mobile devices.

It provides customers and employees with convenient access to the Nexora ecosystem through a unified mobile experience.

Connected to the central Nexora Stock system, the application aims to provide access to product information, stock availability, orders, and deliveries while maintaining consistency between mobile users and the main business platform.

Rather than operating as an independent stock management system, Nexora Mobile serves as the mobile interface of the broader Nexora ecosystem.

## Nexora Ecosystem

Nexora is built around two complementary applications:

- **Nexora Stock:** The main platform responsible for centralized stock and business operations management.
- **Nexora Mobile:** The mobile application providing customers and employees with access to the ecosystem's services.

The two applications are designed to work together through backend APIs.

## Key Features

### Customer Space

- Browse the product catalog.
- Search and filter products.
- View product details and availability.
- Manage a shopping cart.
- Place orders.
- Track order status.
- Access personal profile information.

### Employee Space

- Access operational information from mobile devices.
- Consult stock availability.
- View physical, reserved, and available quantities.
- Monitor customer orders.
- Follow delivery operations.
- Receive low-stock notifications.

### Connected Experience

- Integration with the Nexora Stock ecosystem.
- Centralized business data access.
- API-based communication.
- Role-based application experience.
- Shared product and order information.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Application interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Zustand | Global state management |
| TanStack Query | Server-state management |
| REST APIs | Communication with Nexora Stock |
| CSS | Interface styling |

## Project Structure

```text
nexora-mobile/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   └── EntryExperience.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── cart.service.ts
│   │   ├── delivery.service.ts
│   │   ├── inventory.service.ts
│   │   ├── notifications.service.ts
│   │   ├── orders.service.ts
│   │   └── products.service.ts
│   │
│   ├── store/
│   │   └── useAppStore.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js
- pnpm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/mouna-gif/nexora.git
```

Navigate to the project directory:

```bash
cd nexora
```

Install dependencies:

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open the local development URL displayed in your terminal.

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## API Configuration

Nexora Mobile is designed to communicate with the main Nexora Stock platform through backend APIs.

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

Replace the URL with the actual backend API address when configuring the connected environment.

## Architecture Principles

- **Ecosystem Integration:** Designed as a mobile extension of Nexora Stock.
- **Centralized Data:** Uses the main platform as the business data source.
- **Modularity:** Separate services for authentication, products, orders, inventory, and deliveries.
- **Type Safety:** Structured TypeScript interfaces.
- **Scalability:** Prepared for future API integration and feature expansion.
- **User-Centered Design:** Dedicated experiences for customers and employees.

## Project Status

Nexora Mobile is developed as part of the Nexora ecosystem.

Its architecture includes dedicated service modules for authentication, products, cart, orders, inventory, deliveries, and notifications.

Backend connectivity and production integration depend on the configuration of the main Nexora Stock platform.

## Author

**Mouna Bouallegui**

Computer Science Engineer — Data Science & Artificial Intelligence

Tunisia

- GitHub: [@mouna-gif](https://github.com/mouna-gif)

---

<p align="center">
  <strong>NEXORA MOBILE</strong>
  <br />
  Connected to Nexora Stock.
  <br />
  Your Business. Everywhere.
</p>
