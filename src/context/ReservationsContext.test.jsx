import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { useReservations } from "./ReservationsContext";
import { renderWithProviders } from "../test/helper";

function TestComponent() {
    const { reservations, updateReservations, step, nextStep, prevStep, goToStep, resetReservations, isFirst, isLast } = useReservations();

    return (
        <div>
            <div data-testid="current-step">{step}</div>
            <div data-testid="guests">{reservations.guests}</div>
            <div data-testid="date">{reservations.date}</div>
            <div data-testid="time">{reservations.time}</div>
            <div data-testid="occasion">{reservations.occasion}</div>
            <div data-testid="first-name">{reservations.customerFirstName}</div>
            <div data-testid="last-name">{reservations.customerLastName}</div>
            <div data-testid="email">{reservations.customerEmail}</div>
            <div data-testid="phone">{reservations.customerPhone}</div>
            <div data-testid="notify-sms">{reservations.notifySms}</div>
            <div data-testid="special-request">{reservations.specialRequests}</div>
            <div data-testid="is-first">{isFirst.toString()}</div>
            <div data-testid="is-last">{isLast.toString()}</div>

            <button data-testid="update-guests" onClick={() => updateReservations({ guests: 6 })}>
                Update guests of number
            </button>
            <button
                data-testid="update-customer"
                onClick={() =>
                    updateReservations({
                        customerFirstName: "Emma",
                        customerLastName: "Johnson",
                        customerEmail: "emma.johnson23@gmail.com",
                        customerPhone: "+12 345 678",
                        specialRequest: "Please provide a gluten-free and lactose-free menu option, as some guests have dietary restrictions.",
                    })
                }
            >
                Update Customer
            </button>
            <button data-testid="next-step" onClick={nextStep}>
                Next Step
            </button>
            <button data-testid="prev-step" onClick={prevStep}>
                Prev Step
            </button>
            <button data-testid="go-to-step" onClick={() => goToStep(3)}>
                Go to step 3
            </button>
            <button data-testid="reset" onClick={resetReservations}>
                Reset
            </button>
        </div>
    );
}

describe("Initial State", () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it("should have correct initial state", () => {
        renderWithProviders(<TestComponent />);

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");
        expect(screen.getByTestId("guests")).toHaveTextContent("2");
        expect(screen.getByTestId("time")).toHaveTextContent("");
        expect(screen.getByTestId("occasion")).toHaveTextContent("");
        expect(screen.getByTestId("first-name")).toHaveTextContent("");
        expect(screen.getByTestId("last-name")).toHaveTextContent("");
        expect(screen.getByTestId("email")).toHaveTextContent("");
        expect(screen.getByTestId("phone")).toHaveTextContent("");
        expect(screen.getByTestId("notify-sms")).toHaveTextContent("");
        expect(screen.getByTestId("special-request")).toHaveTextContent("");
    });
});

describe("Update Reservations", () => {
    it("should update party size", () => {
        renderWithProviders(<TestComponent />);

        expect(screen.getByTestId("guests")).toHaveTextContent("2");

        fireEvent.click(screen.getByTestId("update-guests"));

        expect(screen.getByTestId("guests")).toHaveTextContent("6");
    });

    it("should update customer information", () => {
        renderWithProviders(<TestComponent />);

        fireEvent.click(screen.getByTestId("update-customer"));

        expect(screen.getByTestId("first-name")).toHaveTextContent("Emma");
        expect(screen.getByTestId("email")).toHaveTextContent("emma.johnson23@gmail.com");
    });

    it("should merge with existing data", () => {
        renderWithProviders(<TestComponent />);

        fireEvent.click(screen.getByTestId("update-guests"));
        expect(screen.getByTestId("guests")).toHaveTextContent("6");

        fireEvent.click(screen.getByTestId("update-customer"));
        expect(screen.getByTestId("guests")).toHaveTextContent("6");
        expect(screen.getByTestId("first-name")).toHaveTextContent("Emma");
    });
});

describe("Navigation", () => {
    it("should increment step from 1 to 2", () => {
        renderWithProviders(<TestComponent />);

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");

        fireEvent.click(screen.getByTestId("next-step"));

        expect(screen.getByTestId("current-step")).toHaveTextContent("2");
        expect(screen.getByTestId("is-first")).toHaveTextContent("false");
    });

    it("should not exceed step 3", () => {
        renderWithProviders(<TestComponent />);

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");

        fireEvent.click(screen.getByTestId("next-step"));
        fireEvent.click(screen.getByTestId("next-step"));
        fireEvent.click(screen.getByTestId("next-step"));
        fireEvent.click(screen.getByTestId("next-step"));

        expect(screen.getByTestId("current-step")).toHaveTextContent("3");
        expect(screen.getByTestId("is-last")).toHaveTextContent("true");
    });

    it("should decrement step from 2 to 1", () => {
        renderWithProviders(<TestComponent />);

        fireEvent.click(screen.getByTestId("next-step"));
        expect(screen.getByTestId("current-step")).toHaveTextContent("2");

        fireEvent.click(screen.getByTestId("prev-step"));
        expect(screen.getByTestId("current-step")).toHaveTextContent("1");

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");
        expect(screen.getByTestId("is-first")).toHaveTextContent("true");
    });

    it("should not go below step 1", () => {
        renderWithProviders(<TestComponent />);

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");

        fireEvent.click(screen.getByTestId("prev-step"));
        fireEvent.click(screen.getByTestId("prev-step"));

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");
        expect(screen.getByTestId("is-first")).toHaveTextContent("true");
    });

    it("should jump to specific step", () => {
        renderWithProviders(<TestComponent />);

        expect(screen.getByTestId("current-step")).toHaveTextContent("1");

        fireEvent.click(screen.getByTestId("go-to-step"));

        expect(screen.getByTestId("current-step")).toHaveTextContent("3");
    });
});

describe("reset", () => {
    it("should reset to initial state", () => {
        renderWithProviders(<TestComponent />);

        fireEvent.click(screen.getByTestId("update-guests"));
        fireEvent.click(screen.getByTestId("update-customer"));
        fireEvent.click(screen.getByTestId("next-step"));

        expect(screen.getByTestId("guests")).toHaveTextContent("6");
        expect(screen.getByTestId("first-name")).toHaveTextContent("Emma");
        expect(screen.getByTestId("current-step")).toHaveTextContent("2");

        fireEvent.click(screen.getByTestId("reset"));

        expect(screen.getByTestId("guests")).toHaveTextContent("2");
        expect(screen.getByTestId("first-name")).toHaveTextContent("");
        expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    });
});
