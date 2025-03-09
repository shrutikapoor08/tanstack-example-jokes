// app/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { useState } from "react";

const filePath = "jokes.json";
interface Joke {
  id: number;
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
  .handler(async ({ data }) => {
    const jokes = await readJokesFromFile();
    const joke = data as Joke;

    await fs.promises.writeFile(
      filePath,
      JSON.stringify({
        jokes: [
          ...jokes.jokes,
          {
            id: jokes.jokes.length + 1,
            question: joke.question,
            answer: joke.answer,
          },
        ],
      }),
      "utf-8"
    );
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getJokes(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your joke setup"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your joke punchline"
        name="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          updatejokes({
            data: {
              question,
              answer,
            },
          }).then(() => {
            router.invalidate();
          });
        }}
      >
        Submit Joke
      </button>
      {state?.jokes?.map((joke) => (
        <div key={joke.id}>
          <p>{joke.question}</p>
          <p>{joke.answer}</p>
        </div>
      ))}
    </div>
  );
}
