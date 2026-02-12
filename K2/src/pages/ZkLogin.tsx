import { useEffect } from 'react';
import { FaArrowLeft, FaCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import DebugPanel from '../components/DebugPanel';
import Step1 from '../components/ZkLogin/Step1';
import Step2 from '../components/ZkLogin/Step2';
import Step3 from '../components/ZkLogin/Step3';
import Step4 from '../components/ZkLogin/Step4';
import { useAppContext } from '../contexts/AppContext';

const ZkLogin = () => {
    const { currentStep } = useAppContext();
    const navigate = useNavigate();

    // Reset current step to 1 when the component mounts
    useEffect(() => {
        currentStep.set(1);
    }, [currentStep.set]);

    const handleNext = () => {
        if (currentStep.value < 4) {
            currentStep.set(currentStep.value + 1);
        }
    };

    const handleComplete = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const renderStep = () => {
        switch (currentStep.value) {
            case 1:
                return <Step1 onNext={handleNext} />;
            case 2:
                return <Step2 onNext={handleNext} />;
            case 3:
                return <Step3 onNext={handleNext} />;
            case 4:
                return <Step4 onComplete={handleComplete} />;
            default:
                return <Step1 onNext={handleNext} />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header with Go Back button */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleGoBack}
                    className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Back to Home</span>
                </button>

                {/* Step Indicator */}
                <div className="flex items-center gap-4">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center gap-2">
                            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${step === currentStep.value
                                    ? 'bg-[var(--primary)] text-white scale-110'
                                    : step < currentStep.value
                                        ? 'bg-[var(--success)] text-white'
                                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)]'
                                }`}>
                                {step < currentStep.value ? (
                                    <FaCircle className="text-xs" />
                                ) : (
                                    <span className="text-sm font-bold">{step}</span>
                                )}
                            </div>
                            {step < 4 && (
                                <div className={`w-8 h-0.5 transition-colors duration-300 ${step < currentStep.value ? 'bg-[var(--success)]' : 'bg-[var(--border)]'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Title */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-[var(--bg-card)] px-4 py-2 rounded-full border border-[var(--border)]">
                    <span className="text-sm text-[var(--text-secondary)]">Interactive Demo</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">Step {currentStep.value} of 4</span>
                </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[600px]">
                {renderStep()}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[var(--bg-card)] rounded-full h-2 border border-[var(--border)]">
                <div
                    className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep.value / 4) * 100}%` }}
                />
            </div>

            {/* Debug Panel */}
            <DebugPanel className="mt-8" />
        </div>
    );
};

export default ZkLogin;
