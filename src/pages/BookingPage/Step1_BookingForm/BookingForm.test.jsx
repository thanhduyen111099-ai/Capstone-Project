import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderWithProviders } from "../../../test/helper";
import BookingForm from "./BookingForm";
import { fetchAPI } from "../../../api/api";
import { initializeTimes, updateTimes } from "./BookingForm";

vi.mock("../../../api/api", () => ({
    fetchAPI: vi.fn(),
}));

describe("Renders the BookingForm heading", () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    fetchAPI.mockReturnValue(["17:00", "18:00", "19:00", "20:00"]);

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("Renders the BookingForm", () => {
        renderWithProviders(<BookingForm />);
        const headingElement = screen.getByLabelText("Number of guests *");
        expect(headingElement).toBeInTheDocument();
    });
});

describe("Unit test for the initializeTimes", () => {
    it("should return available times form fetchAPI", () => {
        const mockTimes = ["17:00", "18:00", "20:30"];
        fetchAPI.mockReturnValue(mockTimes);

        const result = initializeTimes();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
});

describe("Unit test for the updateTimes", () => {
    it("returns the same state when a date is provided", () => {
        const state = ["17:00", "18:00", "20:30"];
        const action = { type: "UPDATE_TIMES", date: "30/01/2026" };

        const result = updateTimes(state, action);

        expect(result).toEqual(state);
    });
});

describe("unit tests for the form input validation", () => {
    describe("HTML5 validation attributes", () => {
        beforeEach(() => {
            fetchAPI.mockReturnValue(["17:00", "18:00"]);
            renderWithProviders(<BookingForm />);
        });

        it("guests select should exist", () => {
            const guestsSelect = screen.getByLabelText(/number of guests/i);
            expect(guestsSelect).toBeInTheDocument();
        });

        it("should keep the previous valid date when user types invalid characters", async () => {
            const user = userEvent.setup();
            const dateInput = screen.getByLabelText(/Day/i);
            await user.type(dateInput, "a");
            expect(dateInput.value).not.toBe("a");
        });

        it("time select should be disabled when no date is selected", async () => {
            const user = userEvent.setup();
            const dateInput = screen.getByLabelText(/Day/i);
            await user.clear(dateInput);

            const timeSelect = screen.getByLabelText(/time/i);
            expect(timeSelect).toBeDisabled();
        });
    });
});

describe("unit tests for the form submission", () => {
    describe("JavaScript validation - invalid state", () => {
        beforeEach(() => {
            fetchAPI.mockReturnValue(["17:00", "18:00"]);
            renderWithProviders(<BookingForm />);
        });

        it("shows error when submitting without date and time", async () => {
            const user = userEvent.setup();
            const dateInput = screen.getByLabelText(/Day/i);
            await user.clear(dateInput);

            const submitBtn = screen.getByRole("button", { name: /Search/i });
            fireEvent.click(submitBtn);

            expect(await screen.findByText(/please select party size, date and time/i)).toBeInTheDocument();
        });

        it("does not show error when form is valid", async () => {
            fireEvent.change(screen.getByLabelText(/number of guests/i), {
                target: { value: "2" },
            });

            fireEvent.click(screen.getByRole("button", { name: /search/i }));

            expect(screen.queryByText(/please select party size, date and time/i)).not.toBeInTheDocument();
        });
    });
});
