import "./ConfirmedBooking.css";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import { useReservations } from "../../../context/ReservationsContext";
import Form from "../../../components/ui/Form/Form";
import Info from "../../../components/ui/Info/Info";
import Button from "../../../components/ui/Button/Button";

import { useNavigate } from "react-router-dom";

import iconTime from "../../../assets/icons/icon_timesup.svg";
import iconLemon from "../../../assets/icons/icon_logo-1.png";

export default function ConfirmedBooking() {
    const navigate = useNavigate();
    const { reservations, goToStep, resetReservations, remaining, DURATION_MINUTES } = useReservations();
    const [isOpen, setIsOpen] = useState(false);

    const { guests, date, time, occasion, customerFirstName, customerLastName, customerEmail, customerPhone, notifySms, specialRequests } = reservations;

    const remainingTime = `${remaining.minutes.toString().padStart(2, "0")}:${remaining.seconds.toString().padStart(2, "0")}`;

    const [isTimeoutOpen, setIsTimeoutOpen] = useState(false);

    useEffect(() => {
        if (remaining.minutes === 0 && remaining.seconds === 0) {
            setIsTimeoutOpen(true);
        }
    }, [remaining]);

    const handleNextStep = () => {
        setIsOpen(false);
        resetReservations();
        navigate("/");
        sessionStorage.clear();
    };

    return (
        <div className="review-form">
            <Form className="confirmation flex flex-row flex-nowrap justify-between max-sm:flex-col-reverse">
                <div className="flex flex-col gap-2">
                    <Info icon={"users"} className="pt-8">
                        {guests} Guests
                    </Info>
                    <Info icon={"calendar"}>{date}</Info>
                    <Info icon={"clock"}>{time}</Info>
                    {occasion !== "" && (
                        <Info icon={"cake-candles"} className="pb-8">
                            {occasion}
                        </Info>
                    )}
                </div>

                <div className="remaining-time">
                    <div className="flex flex-row gap-2">
                        <p>Remaining Time</p>
                        <img src={iconTime} />
                    </div>
                    <p>{remainingTime}s</p>
                </div>
            </Form>

            <Form className="relative">
                <div className="flex flex-col gap-2">
                    <Info className="form-info" icon={"user"}>
                        {customerFirstName} {customerLastName}
                    </Info>
                    <Info className="form-info" icon={"envelope"}>
                        {customerEmail}
                    </Info>
                    <Info className="form-info" icon={"mobile"}>
                        {customerPhone}
                        <span>({notifySms ? "SMS notifications enabled" : "SMS notifications disabled"})</span>
                    </Info>
                    <Info className="form-info" icon={"comment"}>
                        {specialRequests === "" ? "No special requests" : specialRequests}
                    </Info>
                </div>

                <button onClick={() => goToStep(2)} className="btn-edit">
                    <Info className="gap-2!" icon={"pen-to-square"}>
                        Edit
                    </Info>
                </button>
            </Form>

            <div className="mx-auto">
                <Button className="" onClick={() => setIsOpen(true)}>
                    Confirm Booking{" "}
                    <span className="text-red-600! font-[karla-bd]!">
                        {"("}
                        {remainingTime}
                        {")"}
                    </span>
                </Button>
            </div>

            <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="space-y-4 p-8 max-sm:p-4 bg-(--color-highlight-1) rounded-xl flex flex-col items-center justify-center">
                        <FontAwesomeIcon icon={"bell-concierge"} className="bell-icon" />
                        <DialogTitle className="text-center text-2xl/9">Your reservation has been confirmed</DialogTitle>
                        <Description className="font-[karla-reg]! text-center">
                            Thank you for choosing our restaurant.
                            <br /> Your booking details have been successfully confirmed as follows
                        </Description>
                        <div className="mt-6 flex flex-col gap-2 justify-center w-full">
                            <Button onClick={handleNextStep}>Go to Homepage</Button>
                            <Button onClick={() => goToStep("cancel")} variant="" className="text-(--color-secondary-1) hover:underline hover:text-(--color-secondary-2)">
                                Cancel Reservation
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog
                open={isTimeoutOpen}
                onClose={() => {
                    setIsTimeoutOpen(false);
                    goToStep(1);
                }}
                className="relative z-50"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 p-4 bg-(--color-highlight-1) rounded-xl flex flex-col items-center justify-center">
                        <div>
                            <img src={iconLemon} alt="Lemon Icon" className="w-6" />
                        </div>
                        <DialogTitle className="text-lg! font-[karla-bd]!">Time Limit Reached</DialogTitle>
                        <Description className="font-[karla-reg]! text-center">
                            We apologize but the table has been released after the {DURATION_MINUTES} minutes reviewing time, please kindly make your selection again
                        </Description>
                        <Button
                            onClick={() => {
                                setIsTimeoutOpen(false);
                                goToStep(1);
                            }}
                            className="max-md:w-full"
                        >
                            Re-select the table
                        </Button>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
