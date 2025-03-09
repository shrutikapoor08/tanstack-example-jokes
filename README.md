# TanStack Start Tutorial: Building a Jokes App

This repository demonstrates how to use TanStack Start to build a full-stack React application. The project is structured as a step-by-step tutorial, starting with basic setup and progressively adding more advanced features.

## What is TanStack Start?

TanStack Start is a framework for building full-stack React applications. It provides a seamless development experience with features like:
- Server-side rendering (SSR)
- File-system based routing
- Type-safe server functions
- Built-in development server

## Tutorial Steps

### ✅ 1. Basic Setup
Learn how to:
- Set up a new TanStack Start project
- Configure the development environment
- Understand the project structure
- Create your first route

###  2. File System Operations
Learn how to:
- Create server functions
- Read and write to JSON files
- Add Shadcn components 
- Add Tailwind
- Handle form submissions
- Update UI based on server responses

### 3. Styling with Tailwind
  [✅] Add tailwind
  [] style nicely with tailwind
  [] Fix TS issues
  [] Clean up and refactor
  [] Ensure jokes have an id, and match the rest of the json file
  [] Add nice jokes
  [] Best practices of building a tutorial code. Check other people's repos - maybe Kent or Eve. 
  [] Add error component
  [] Test manually
  [] Write tests?


For me - 
[] How does TanStack Start define where the server -ssr.tsx and where the client is. - client.tsx
[] Read tutorials to watch how other people do it. -> fir styles and understanding how tanstack start works
## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/your-username/tanstack-example-jokes.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── app/
│   ├── routes/
│   │   ├── __root.tsx    # Root layout
│   │   └── index.tsx     # Home page
│   ├── serverFunctions/
│   │   └── getJokes.ts   # Server functions for joke operations
│   ├── router.tsx        # Router configuration
│   └── ssr.tsx          # Server-side rendering setup
├── jokes.json           # Data storage
└── package.json
```

## Current Features

- Add new jokes with setup and punchline
- Persist jokes to a JSON file
- Display all jokes on the home page
- Real-time UI updates

## Tech Stack

- React
- TanStack Router
- TanStack Start
- TypeScript

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!