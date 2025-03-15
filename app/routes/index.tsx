import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getJokesAction, addJokeAction } from "../server/jokeActions";
import { JokeForm } from "@/components/jokes/JokeForm";
import { JokeList } from "@/components/jokes/JokeList";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getJokesAction(),
});

function Home() {
  const router = useRouter();
  const { jokes = [] } = Route.useLoaderData() || { jokes: [] };

  const handleAddJoke = async (question: string, answer: string) => {
    await addJokeAction({
      data: { question, answer },
    });

    router.invalidate();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="text-primary">Joke</span>ster
          </h1>
          <p className="text-muted-foreground mb-4">
            Your daily dose of DevJokes
          </p>

          <JokeForm />
        </header>

        <JokeList jokes={jokes} />
      </div>
    </main>
  );
}
