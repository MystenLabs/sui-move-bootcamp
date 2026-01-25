import { FaShieldAlt, FaGoogle, FaLock } from 'react-icons/fa';
import { SiSui } from 'react-icons/si';

const Header = () => {
    return (
        <header className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] opacity-10"></div>
            
            <div className="relative p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="flex items-center gap-2 text-[var(--primary)]">
                        <FaShieldAlt className="text-2xl" />
                        <SiSui className="text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                        ZK Login Demo
                    </h1>
                    <div className="flex items-center gap-2 text-[var(--accent)]">
                        <FaGoogle className="text-2xl" />
                        <FaLock className="text-2xl" />
                    </div>
                </div>
                <p className="text-[var(--text-secondary)] text-sm max-w-2xl mx-auto">
                    Secure, Private, and Seamless Web3 Authentication
                </p>
            </div>
            
            {/* Bottom border with gradient */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"></div>
        </header>
    )
}

export default Header;
