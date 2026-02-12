import { BrowserRouter, Route, Routes } from "react-router"
import Header from "./components/Header"
import Home from "./pages/Home"
import ZkLogin from "./pages/ZkLogin"

const Router = () => {
    return (
        <BrowserRouter>
            <div className="p-4 m-4 rounded-lg min-h-[100vh]">
                <Header />
                <div className="p-8 bg-[var(--bg-secondary)] rounded-lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/zklogin" element={<ZkLogin />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Router;
