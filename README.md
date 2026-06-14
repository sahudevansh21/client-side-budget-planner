# Client-Side Budget Planner

This is a client-side budgeting tool built with Next.js 14 App Router, designed for privacy and ease of use. It allows users to manually input their income and expenses, categorize them, and set monthly budgets. All data is stored locally in the browser's `localStorage` — no external APIs or databases are used.

## Features

- **Dashboard**: Overview of financial health, including total income, expenses, and balance, with a spending breakdown chart.
- **Transactions**: Add, view, and delete individual income and expense transactions.
- **Budget Categories**: Define custom spending categories and set monthly budget limits for each.
- **Client-Side Data**: All financial data is stored securely in your browser's local storage.
- **Stunning UI**: Dark theme, vibrant gradients, glassmorphic cards, and smooth animations.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js (version 18.x or higher) and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd client-side-budget-planner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the application for production:

```bash
npm run build
# or yarn build
# or pnpm build
```

This will create an optimized build of your application in the `.next` folder.

### Running in Production Mode

To start the application in production mode after building:

```bash
npm run start
# or yarn start
# or pnpm start
```

## Project Structure

-   `app/`: The root directory for the App Router.
    -   `layout.js`: The root layout for the application, including global navigation and styling.
    -   `page.js`: The home page of the application.
    -   `globals.css`: Global styles for the entire application.
    -   `dashboard/page.js`: The Dashboard page component.
    -   `transactions/page.js`: The Transactions page component.
    -   `budget-categories/page.js`: The Budget Categories page component.

## Technologies Used

-   **Next.js 14 (App Router)**: React framework for production.
-   **React**: UI library.
-   **Chart.js & React-Chartjs-2**: For interactive data visualizations.
-   **CSS**: For all styling, adhering to a dark, glassmorphic aesthetic.

## Data Storage

All application data (transactions, categories, budgets) is stored locally in your browser's `localStorage`. This ensures privacy as no data leaves your device.
