import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Joke } from "../../types";

interface JokeCardProps {
  joke: Joke;
}

export function JokeCard({ joke }: JokeCardProps) {
  const handleLike = () => {
    console.log("Liked joke:", joke.id);
  };

  const handleDislike = () => {
    console.log("Disliked joke:", joke.id);
  };

  return (
    <Card
      role="listitem"
      className="overflow-hidden transition-all hover:shadow-md mb-6"
      tabIndex={0}
    >
      <CardHeader className="pb-2">
        <CardTitle id="joke-label-{`${joke.id}`}" className="text-xl">
          Question: {joke.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <p className="leading-relaxed">Answer: {joke.answer}</p>
        <Button onClick={handleLike}>Like</Button>
        <Button onClick={handleDislike}>Dislike</Button>
      </CardContent>
    </Card>
  );
}
