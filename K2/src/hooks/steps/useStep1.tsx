import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../utils/constants";
import { getProceedButton } from "../../utils/generic";
import { useAppConfig } from "../useAppConfig";
import { useEphemeral } from "../useEphemeral";

export const useStep1 = (onNext: () => Promise<void>) => {
  const { configureApp, resetApp } = useAppConfig();
  const { generateEphemeral, resetEphemeral } = useEphemeral();
  const [proceedButton, setProceedButton] = useState(<></>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [internalStep, setInternalStep] = useState(0);

  const internalStep1 = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake timeout
      configureApp();
      toast.success('App was configured! Check the debug panel for the details.', TOAST_OPTIONS);
      setInternalStep(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to configure application.";
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
      await generateEphemeral();
      toast.success('Ephemeral keypair was generated! Check the debug panel for the details.', TOAST_OPTIONS);
      setInternalStep(2);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to generate ephemeral keypair.";
      setError(message);
      toast.error(message, TOAST_OPTIONS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    // reset configs for this step on mount if they were assigned before(e.g. getting back to home)
    resetApp();
    resetEphemeral();

    // fake loading on step load
    async function hideFakeLoading() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake timeout
      setLoading(false);
    }
    hideFakeLoading();
  }, []);

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
        "⚙️ Configure Application",
        "🤙 Generate Ephemeral Keypair"
      ],
      internalStep,
      processInternalStep
    ));
  }, [loading, internalStep]);

  return { proceedButton, processInternalStep, error };
}
