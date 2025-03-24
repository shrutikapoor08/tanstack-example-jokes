import React from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getJokesAction, addJokeAction } from "../server/jokeActions";
import { JokeForm } from "@/components/jokes/JokeForm";
import { JokeList } from "@/components/jokes/JokeList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getJokesAction(),
});

function Home() {
  const router = useRouter();
  const { jokes = [] } = Route.useLoaderData() || { jokes: [] };
  const [listTabIndex, setListTabIndex] = useState(0);

  const handleAddJoke = async (question: string, answer: string) => {
    await addJokeAction({
      data: { question, answer },
    });

    router.invalidate();
  };

  const handleSubscribe = () => {
    console.log("Subscribed!");
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target !== document.activeElement) {
      // element is currently not focussed
      console.log("Focussed!", e);
      setListTabIndex(0);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target === document.activeElement) {
      // element is currently focussed
      console.log("Blurred!", e);
      setListTabIndex(-1);
    }
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

        <section className="mb-8">
          <JokeList
            jokes={jokes}
            listTabIndex={listTabIndex}
            onFocus={handleFocus}
          />
        </section>

        <section className="mb-8">
          <h3>
            Subscribe to our newsletter to get the latest jokes delivered to
            your inbox.
          </h3>
          <form className="flex flex-row gap-2 w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              className="input"
            />
            <Button className="btn" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
