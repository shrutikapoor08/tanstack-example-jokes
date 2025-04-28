import { createServerFn } from "@tanstack/start";
import { readJokes, addJoke } from "./jokeService";

export const getJokesAction = createServerFn({
  method: "GET",
}).handler(async () => {
  return await readJokes();
});

export const addJokeAction = createServerFn({ 
  method: "POST" 
})
.validator((joke: { question: string; answer: string }) => joke)
.handler(async ({ data }) => {
  if (!data.question || !data.answer) return;
  await addJoke(data.question, data.answer);
  return { success: true };
});

export const getJokesFromChuckNorrisAPI = createServerFn({
  method: "GET" 
}).handler(async () => {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const joke = await response.json();
  return { value: joke?.value , icon_url: joke?.icon_url };
});

