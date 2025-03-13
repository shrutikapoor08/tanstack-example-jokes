import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Joke } from "../../types";

interface JokeCardProps {
  joke: Joke;
}

export function JokeCard({ joke }: JokeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{joke.question}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <p className="leading-relaxed">{joke.answer}</p>
      </CardContent>
    </Card>
  );
}