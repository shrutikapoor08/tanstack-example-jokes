import React, { useCallback, useEffect, useRef, useState } from "react";
import { Joke } from "../../types";
import { JokeCard } from "./JokeCard";

interface JokeListProps {
  jokes: Joke[];
  listTabIndex?: number;
}

export function JokeList({ jokes, listTabIndex = 0 }: JokeListProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, jokes.length);
  }, [jokes.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeIndex < jokes.length - 1) {
          setActiveIndex(activeIndex + 1);
          cardRefs.current[activeIndex + 1]?.focus();
        }
      }
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
          cardRefs.current[activeIndex - 1]?.focus();
        }
      }
    },
    [activeIndex, jokes.length]
  );

  if (!jokes || jokes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No jokes yet. Be the first to add one!
      </div>
    );
  }

  return (
    <div
      role="list"
      className="space-y-6"
      aria-label="Developer Jokes"
      onKeyDown={handleKeyDown}
    >
      {jokes.map((joke, index) => (
        <JokeCard
          key={joke.id}
          joke={joke}
          listTabIndex={activeIndex === index ? listTabIndex : -1}
          className={
            activeIndex === index
              ? "outline outline-amber-700 shadow-md shadow-amber-950"
              : ""
          }
          ref={(el) => (cardRefs.current[index] = el)}
          onFocus={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
