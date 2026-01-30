import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import ReservationsProvider from "../context/ReservationsContext";

// Helper để render component với tất cả providers
export function renderWithProviders(ui, option = {}) {
    const Wrapper = ({ children }) => {
        return (
            <MemoryRouter initialEntries={["/"]}>
                <ReservationsProvider>{children}</ReservationsProvider>
            </MemoryRouter>
        );
    };

    return render(ui, { wrapper: Wrapper, ...option });
}

// Helper để mock reservations data
export const mockReservationsData = {
    partySize: 3,
    date: "20/01/2026",
    time: "20:00",
    occasion: "",
    customerFirstName: "Emma",
    customerLastName: "Johnson",
    customerEmail: "emma.js1@gmail.com",
    customerPhone: "012345678",
    notifySms: true,
    specialRequest: "Window seat please",
    cancelReason: "",
    cancelReasonDetail: "",
};

// Helper mock fetch
export function mockFetch(response, options = {}) {
    globalThis.fetch = vi.fn(() =>
        Promise.resolve({
            ok: options.ok ?? true,
            status: options.status ?? 200,
            json: async () => response,
        }),
    );
}
