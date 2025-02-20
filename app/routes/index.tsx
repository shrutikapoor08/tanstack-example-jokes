// app/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const filePath = "jokes.json";
interface Joke {
  question: string;
  answer: string;
}

interface JokesData {
  jokes: Joke[];
}
async function readJokesFromFile(): Promise<JokesData> {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data) as JokesData;
  } catch {
    return { jokes: [] };
  }
}

const getJokes = createServerFn({
  method: "GET",
}).handler(() => {
  return readJokesFromFile();
});

const updatejokes = createServerFn({ method: "POST" })
  .validator((joke: { question: string; answer: string }) => joke)
  .handler(async ({ input: { question, answer } }) => {
    const jokes = await readJokesFromFile();
    console.log({ joke, question, answer });
    const joke = { question, answer };
    await fs.promises.writeFile(
      filePath,
      JSON.stringify({ jokes: [...jokes.jokes, joke] })
    );
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getJokes(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div>
      <input type="text" placeholder="Enter your joke setup" name="question" />
      <input
        type="text"
        placeholder="Enter your joke punchline"
        name="answer"
      />
      <button
        type="button"
        onClick={() => {
          updatejokes({
            question: "question", // get from input
            answer: "answer", // get from input
          }).then(() => {
            router.invalidate();
          });
        }}
      >
        Submit Joke
      </button>
      {state?.jokes?.map((joke) => <div>{joke.question}</div>)}
    </div>
  );
}
