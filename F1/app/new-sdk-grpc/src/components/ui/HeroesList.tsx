import { useCurrentClient } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";

export const HeroesList = () => {
  const suiClient = useCurrentClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getObject"],
    queryFn: async () => {

      // VIA GRPC
      const result = await suiClient.getObject({
        objectId: import.meta.env.VITE_HEROES_REGISTRY_ID,
        include: {
          json: true
        }
      });
      return (result.object.json as any).ids;

      // Via JSONRPC
      /*
        const result = await suiJsonRpcClient.getObject({
          id: import.meta.env.VITE_HEROES_REGISTRY_ID,
          options: {
            showContent: true
          }
        });
        return result.data.content.fields.ids;
      */
     
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Could not get heroes registry...</div>;
  }

  return (
    <div>
      <div>Found {data.length} Heroes.</div>
      <ul>
        {data.map((heroId: string, i) => (
          <li key={heroId}>
            <a
              href={`https://testnet.suivision.xyz/object/${heroId}`}
              target="_blank"
            >
              {i}. {heroId}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
