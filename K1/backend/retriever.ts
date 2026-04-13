import { GraphQLQueryResult, SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphqlClient } from "./utils/clients";
import dotenv from "dotenv";

dotenv.config();

/**
 * Helper function to query past events
 * @dev 
 * This function supports pagination, and thus returns paginated results, but we are not using it in this example.
 * For more info, see: https://docs.sui.io/guides/developer/accessing-data/query-with-graphql
 * @param filter - The filter to use for the query
 * @returns The past events
 */
const queryPastEvents = async (
    type: string
): Promise<GraphQLQueryResult<{events: {nodes: {contents: {json: unknown}}[]}}>> => {
    const result = await graphqlClient.query({
        query: `
            query discoverEvents($type: String) {
                events(filter: { type: $type }) {
                    nodes {
                        contents {
                            json
                            type {
                                layout
                            }
                        }
                    }
                }
            }
        `,
        variables: { type: type }
    });

    return result as GraphQLQueryResult<{events: {nodes: {contents: {json: unknown}}[]}}>;
}

const main = async () => {

    // query past events
    const response = await queryPastEvents(
        `${process.env.PACKAGE_ID}::${process.env.MODULE_NAME}::${process.env.EVENT_NAME}`
    );

    // log past events
    console.log(response.data?.events?.nodes.map((node) => node.contents.json));

    // optionally handle saving to db here if needed
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
