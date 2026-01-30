import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../test/helper";
import GuestDetail from "./GuestDetail";
import Step3_Review from "../Step3/Step3_Review";

import { useReservations } from "../../../context/ReservationsContext";

// vi.mock("../../../context/ReservationsContext");

describe("Unit tests for the form validation and submission", () => {
    // const mockPrevStep = vi.fn();
    // const mockNextStep = vi.fn();
    // const mockUpdateReservations = vi.fn();

    // const defaultReservations = {
    //     partySize: 4,
    //     date: "20/01/2026",
    //     time: "19:00",
    //     tableLocation: "Outsize",
    //     customerFirstName: "",
    //     customerLastName: "",
    //     customerEmail: "",
    //     customerPhone: "",
    //     notifySms: false,
    //     specialRequests: "",
    // };

    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
        // useReservations.mockReturnValue({
        //     nextStep: mockNextStep,
        //     prevStep: mockPrevStep,
        //     updateReservations: mockUpdateReservations,
        //     reservations: defaultReservations,
        // });
    });
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    describe("the form validation", () => {
        describe("Required Fields Validation", () => {
            it("should show error when required field is empty", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.getByText("First name is required")).toBeInTheDocument();
                    expect(screen.getByText("Last name is required")).toBeInTheDocument();
                    expect(screen.getByText("Email is required")).toBeInTheDocument();
                    expect(screen.getByText("Mobile number is required")).toBeInTheDocument();
                });
            });
        });

        describe("Email Validation", () => {
            it("should show error for invalid email format", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const emailInput = screen.getByPlaceholderText("Email");
                await user.type(emailInput, "Invalid-email");

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
                });
            });

            it("should accept valid email", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const emailInput = screen.getByPlaceholderText("Email");
                await user.type(emailInput, "user@testing.com");

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
                });
            });
        });

        describe("Phone Validation", () => {
            it("should show error for phone < 6 digits", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const phoneInput = screen.getByPlaceholderText(/mobile - example/i);
                await user.type(phoneInput, "1234");

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.getByText("Phone number must be 6-12 digits")).toBeInTheDocument();
                });
            });

            it("should show error for phone > 12 digits", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const phoneInput = screen.getByPlaceholderText(/mobile - example/i);
                await user.type(phoneInput, "1234567891011");

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.getByText("Phone number must be 6-12 digits")).toBeInTheDocument();
                });
            });

            it("should show error for non-numeric phone", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const phoneInput = screen.getByPlaceholderText(/mobile - example/i);
                await user.type(phoneInput, "non-numberic");

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.getByText("Phone number must be 6-12 digits")).toBeInTheDocument();
                });
            });

            it("should accept valid phone (6-12 digits", async () => {
                const user = userEvent.setup();
                renderWithProviders(<GuestDetail />);

                const phoneInput = screen.getByPlaceholderText(/mobile - example/i);
                await user.type(phoneInput, "123456789");

                const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
                await user.click(submitButton);

                await waitFor(() => {
                    expect(screen.queryByText("Phone number must be 6-12 digits")).not.toBeInTheDocument();
                    expect(screen.queryByText("Mobile number is required")).not.toBeInTheDocument();
                });
            });
        });
    });

    describe("the form submission", () => {
        it("should submit with valid data", async () => {
            const user = userEvent.setup();
            renderWithProviders(<GuestDetail />);

            await user.type(screen.getByPlaceholderText("First name"), "Emma");
            await user.type(screen.getByPlaceholderText("Last name"), "Johnson");
            await user.type(screen.getByPlaceholderText("Email"), "emma.johnson23@gmail.com");
            await user.type(screen.getByPlaceholderText(/Mobile - Example/i), "12345678");

            const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
            await user.click(submitButton);

            await waitFor(() => {
                expect(renderWithProviders(<Step3_Review />));
            });
        });

        it("should not submit when validation fails", async () => {
            const user = userEvent.setup();
            renderWithProviders(<GuestDetail />);

            await user.type(screen.getByPlaceholderText("First name"), "Emma");

            const submitButton = screen.getByRole("button", { name: /proceed to confirmation/i });
            await user.click(submitButton);

            await waitFor(() => {
                expect(renderWithProviders(<Step3_Review />)).not;
            });
        });
    });
});
