# Team Task Hub

A React + TypeScript app for managing projects and tasks.
Users can create projects, add tasks for projects, filter and search for tasks, update task status
via the dashboard. Data saved in localStorage.

## Stack

- React + TypeScript (Vite)
- Zustand
- React Hook Form + Zod
- Material UI
- React Router
- Vitest + React Testing Library
- Storybook + @storybook/addon-vitest + Playwright
- Cypress
- uuid (ID generator)

## Running the app

### Copy and paste these lines below into terminal

```
git clone -b skilaverkefni-2 https://github.com/Beggcode/ntv-forritun-fk3-vor-2026.git

cd ntv-forritun-fk3-vor-2026/skilaverkefni-1

npm install

npm run dev
```

## Testing

### Unit and Storybook tests (Vitest)

```
npm run test:run
```

Runs all tests

- Storybook component tests
- hooks
- store flow
- Zod schemas
- UI components

### Storybook

```
npm run storybook
```

Opens Storybook on port 6006. Stories are available for ProjectCard, ProjectForm, TaskCard, TaskFilters and TaskForm.

### E2E tests (Cypress)

Run tests in the terminal:

```
npm run cypress:run
```

Or open the Cypress UI to view tests in a browser:

```
npm run cypress:open
```

## CI

GitHub Actions runs Vitest and Cypress automatically on push or pull requests to main and branch "skilaverkefni-2".
