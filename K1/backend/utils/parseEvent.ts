import { bcs } from "@mysten/sui/bcs";

// Define the BCS structure for the UserRegistered event
const USER_REGISTERED_EVENT_BCS = bcs.struct("UserRegistered", {
  owner: bcs.Address,
  name: bcs.string(),
  user_id: bcs.u64(),
});

export const decodeBcsEvent = (event: any): any => {
  const eventValue = event.contents.value;
  // Convert object with numeric keys to Uint8Array
  const bytes = new Uint8Array(Object.values(eventValue).map((v) => Number(v)));

  const decoded = USER_REGISTERED_EVENT_BCS.parse(bytes);
  return {
    owner: decoded.owner,
    name: decoded.name,
    user_id: decoded.user_id.toString(),
  };
};
