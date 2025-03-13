export interface Joke {
  id: string;
  question: string;
  answer: string;
}

export interface JokesData {
  jokes: Joke[];
}