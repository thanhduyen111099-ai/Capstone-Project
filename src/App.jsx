import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./pages/Home/Homepage";
import Menu from "./pages/Menu/Menu";
import BookingPage from "./pages/BookingPage/BookingPage";
import { Routes, Route } from "react-router-dom";
import ReservationsProvider from "./context/ReservationsContext";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
    return (
        <ReservationsProvider>
            <ScrollToTop />

            <div className="app-layout">
                <Header />

                <main className="app-content">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/reservations" element={<BookingPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </ReservationsProvider>
    );
}

export default App;
