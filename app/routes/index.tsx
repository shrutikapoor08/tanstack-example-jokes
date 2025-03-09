// app/routes/index.tsx
import * as fs from "node:fs";
import { PlusCircle } from "lucide-react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const filePath = "jokes.json";
interface Joke {
  id: string;
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
  } catch (error) {
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
    if (!data.question || !data.answer) return;
    const jokes = await readJokesFromFile();
    const joke = data as Joke;

    await fs.promises.writeFile(
      filePath,
      JSON.stringify({
        jokes: [
          ...jokes.jokes,
          {
            id: uuidv4(),
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="text-primary">Joke</span>ster
          </h1>
          <p className="text-muted-foreground mb-4">
            Your daily dose of laughter
          </p>
          <div className="flex flex-row items-center justify-stretch w-full">
            <Input
              className="w-full m-2"
              type="text"
              placeholder="Enter your joke setup"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Input
              className="w-full m-2"
              type="text"
              placeholder="Enter your joke punchline"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <Button
              className="hover:bg-gray-600 m-2"
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
              <PlusCircle className="h-4 w-4" />
              Add a Joke
            </Button>
          </div>
        </header>
      </div>
      {state?.jokes?.map((joke) => (
        <Card
          key={joke.id}
          className="overflow-hidden transition-all hover:shadow-md pb-2 mb-6"
        >
          <CardHeader className="pb-2 text-xl flex flex-row justify-between items-center">
            <CardTitle> {joke.question} </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <p className="leading-relaxed">{joke.answer}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
