import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addJokeAction } from "../../server/jokeActions";

export function JokeForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!question || !answer || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await addJokeAction({
        data: { question, answer },
      });
      
      // Clear form
      setQuestion("");
      setAnswer("");
      
      // Refresh data
      router.invalidate();
    } catch (error) {
      console.error("Failed to add joke:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <Input
        className="w-full"
        placeholder="Enter your joke setup"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Input
        className="w-full"
        placeholder="Enter your joke punchline"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button
        className="whitespace-nowrap"
        onClick={handleSubmit}
        disabled={!question || !answer || isSubmitting}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Joke
      </Button>
    </div>
  );
}