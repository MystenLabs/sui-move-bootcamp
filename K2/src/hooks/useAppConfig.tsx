import { useAppContext } from "../contexts/AppContext";

export const useAppConfig = () => {
  const { network, salt } = useAppContext();

  const configureApp = () => {
    // configure: network, and salt based on config, through environment variables
    const _network = "Not Implemented";
    const _salt = "Not Implemented";

    network.set(_network);
    salt.set(_salt);
  }

  const resetApp = () => {
    if (network.value || salt.value) {
      network.set(null);
      salt.set(null);
    }
  }

  return { configureApp, resetApp };
}
