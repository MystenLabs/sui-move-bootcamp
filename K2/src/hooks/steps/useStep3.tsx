import { useEffect, useState } from "react";
import { getProceedButton } from "../../utils/generic";
import { useWallet } from "../useWallet";
import { useZkProof } from "../useZkProof";
import { TOAST_OPTIONS } from "../../utils/constants";
import { toast } from "react-toastify";

export const useStep3 = (onNext: () => void) => {
  const { getZkProof, resetZkProof } = useZkProof();
  const { getWallet, resetWallet } = useWallet();
  const [proceedButton, setProceedButton] = useState(<></>);
  const [internalStep, setInternalStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const internalStep1 = async () => {
    setLoading(true);
    setError(null);
    try {
      await getZkProof();
      toast.success('ZK Proof was generated! Check the debug panel for the details.', TOAST_OPTIONS);
      setInternalStep(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to generate ZK proof.";
      setError(message);
      toast.error(message, TOAST_OPTIONS);
    } finally {
      setLoading(false);
    }
  }
  const internalStep2 = async () => {
    setLoading(true);
    setError(null);
    try {
      await getWallet();
      toast.success('Your wallet is ready! Check the debug panel for the details.', TOAST_OPTIONS);
      setInternalStep(2);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load wallet details.";
      setError(message);
      toast.error(message, TOAST_OPTIONS);
    } finally {
      setLoading(false);
    }
  }

  const processInternalStep = async () => {
    switch (internalStep) {
      case 0: // App Config
        await internalStep1();
        break;
      case 1: // Ephemeral Keypair Generation
        await internalStep2();
        break;
      default:
        onNext(); // Next step(external) callback
        break;
    }
  }

  useEffect(() => {
    setProceedButton(getProceedButton(
      loading,
      [
        "⚙️ Generate ZK Proof",
        "🤙 Get Wallet Address & Balance"
      ],
      internalStep,
      processInternalStep
    ));
  }, [loading, internalStep]);

  useEffect(() => {

    // reset configs for this step on mount if they were assigned before(e.g. getting back to home)
    resetZkProof();
    resetWallet();

    // fake loading on step load
    async function hideFakeLoading() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake timeout
      setLoading(false);
    }
    hideFakeLoading();
  }, []);

  return { proceedButton, processInternalStep, error };
};
