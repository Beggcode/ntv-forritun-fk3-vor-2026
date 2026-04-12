Task and project Management System
A React + TypeScript task and project manager

Technical

Framework: React 18 (Vite)

State: Zustand + Custom LocalStorage Hook

Forms: React Hook Form + Zod validation

UI: Material UI v6

Routing: React Router 6

Setup

npm install

npm run dev

npm run build

Architecture

Styled Components: To maintain clean JSX, most styling is moved to separate \*.styles.ts files.

Schema-Driven: Zod schemas are used for both runtime validation and TypeScript type inference.

Centralized Store: Zustand manages the global state for projects and tasks with automatic local storage persistence.

📂 Folder Structure
src/features/ - Feature-based modules (Task and Project management).

src/shared/ - Global store, Zod schemas, types, and custom hooks.
