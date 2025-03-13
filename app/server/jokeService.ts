import * as fs from "node:fs";
import { v4 as uuidv4 } from "uuid";
import { Joke, JokesData } from "../types";

const JOKES_FILE_PATH = "jokes.json";

export async function readJokes(): Promise<JokesData> {
  try {
    const data = await fs.promises.readFile(JOKES_FILE_PATH, "utf-8");
    return JSON.parse(data) as JokesData;
  } catch (error) {
    return { jokes: [] };
  }
}

export async function addJoke(question: string, answer: string): Promise<void> {
  if (!question || !answer) return;
  
  const jokesData = await readJokes();
  
  const updatedJokes = {
    jokes: [
      ...jokesData.jokes,
      {
        id: uuidv4(),
        question,
        answer,
      },
    ],
  };
  
  await fs.promises.writeFile(
    JOKES_FILE_PATH,
    JSON.stringify(updatedJokes, null, 2),
    "utf-8"
  );
}