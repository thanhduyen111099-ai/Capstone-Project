import { cleanup, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import BookingPage from "./BookingPage";
import { renderWithProviders } from "../../test/helper";

describe("BookingPage", () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("Renders the BookingForm", () => {
        renderWithProviders(<BookingPage />);
        const headingElement = screen.getByText("Choose table");
        expect(headingElement).toBeInTheDocument();
    });
});
