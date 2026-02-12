import { useQuery } from "@tanstack/react-query";

interface Hero {
  hero_id: string;
  hero_name: string;
  owner: string;
  timestamp: string;
}

export const HeroesList = () => {
  const { data: heroes, isLoading } = useQuery({
    queryKey: ["heroes"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3000/events/hero/hero-event",
      );
      if (!response.ok) {
        throw new Error("Error fetching heroes");
      }
      return response.json() as Promise<Hero[]>;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!heroes) {
    return <div>No heroes found</div>;
  }
  return (
    <div>
      <h1>Heroes List</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.hero_id}>
            <h2>Hero Name: {hero.hero_name}</h2>
            <p>Hero ID: {hero.hero_id}</p>
            <p>Owner: {hero.owner}</p>
            <p>
              Timestamp: {new Date(parseInt(hero.timestamp)).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
