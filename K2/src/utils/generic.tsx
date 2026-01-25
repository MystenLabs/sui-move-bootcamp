import type { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

const uppercaseFirstLetter = (str: string) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

const getProceedButton = (
    loading: boolean,
    internalStepsTexts: (string | ReactNode)[],
    currentInternalStep: number,
    callback: () => Promise<void>
) => {
    if (loading) {
        return <>Loading...</>;
    }

    const getText = () => {
       return internalStepsTexts[currentInternalStep] || // step exists
       "🎉 Step Complete! Let's move forward to the next step!"; // step does not exist(length+1), complete.
    }
    
    return (
        <button
            onClick={callback}
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--secondary)] hover:to-[var(--accent)] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
        >
            {getText()}
            <FaArrowRight />
        </button>
    );
}

export { uppercaseFirstLetter, getProceedButton }
