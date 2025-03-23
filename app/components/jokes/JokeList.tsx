import { Joke } from "../../types";
import { JokeCard } from "./JokeCard";

interface JokeListProps {
  jokes: Joke[];
}

export function JokeList({ jokes }: JokeListProps) {
  if (!jokes || jokes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No jokes yet. Be the first to add one!
      </div>
    );
  }

  return (
    <div role="list" className="space-y-6" aria-label="Developer Jokes">
      {jokes.map((joke) => (
        <JokeCard key={joke.id} joke={joke} />
      ))}
    </div>
  );
}
