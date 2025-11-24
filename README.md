# UO Template Builder

A web application for building, saving, and sharing Ultima Online (UO) character templates.
It manages skill values and equipment boost values, automatically calculating the totals.

## Features

*   **Skill Management**: Input real skill values and manage totals.
*   **Equipment & Boost Management**: Input skill bonuses from equipment (accessories, etc.) and calculate adjusted values.
*   **Template Saving**: Save multiple character templates locally in your browser (LocalStorage) with custom names.
*   **Sharing**: Generate shareable URLs for your templates to share with other users or transfer to another device.
*   **Skill Cap Check**: Displays the remaining skill points against a standard 720 skill cap.

## Tech Stack

*   [React](https://react.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [React Hot Toast](https://react-hot-toast.com/) (Notification UI)

## Local Development Setup

To run this project locally, follow these steps:

### Prerequisites

*   Node.js (Recommended: v18 or higher)
*   pnpm (or npm/yarn)

### Installation & Startup

1.  Clone the repository.
    ```bash
    git clone <repository-url>
    cd uo-templates-builder
    ```

2.  Install dependencies.
    ```bash
    pnpm install
    ```

3.  Start the development server.
    ```bash
    pnpm dev
    ```

4.  Open `http://localhost:5173` in your browser.

## Build

To build for production, run the following command:

```bash
pnpm build
```

Static files will be generated in the `dist` directory. You can deploy these to GitHub Pages or any web server.

## Credits

This project and all its code were implemented by **Antigravity** and the **Gemini 3 Pro** model.

## License

MIT License
