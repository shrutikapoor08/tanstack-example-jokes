import { getJokesFromChuckNorrisAPI } from "@/server/jokeActions";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/chuck-norris")({
  component: ChuckNorrisComponent,
  loader: async () => await getJokesFromChuckNorrisAPI(),
});

function ChuckNorrisComponent() {
  console.log(Route.useLoaderData());
  const router = useRouter();

  const { value, icon_url } = Route.useLoaderData();

  const handleClick = async () => {
    await getJokesFromChuckNorrisAPI();
    router.invalidate();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <img className="w-48 h-48" src={`${icon_url}`} />
      <h2 className="text-5xl">{value}</h2>
      <button
        className="mt-4 p-5 bg-blue-500 text-white rounded-md"
        onClick={handleClick}
      >
        Get another joke
      </button>
    </div>
  );
}
