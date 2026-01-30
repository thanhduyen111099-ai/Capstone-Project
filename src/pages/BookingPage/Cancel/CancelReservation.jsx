import "./CancelReservation.css";

import { useState } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import { useReservations } from "../../../context/ReservationsContext";
import Form from "../../../components/ui/Form/Form";
import Info from "../../../components/ui/Info/Info";
import Button from "../../../components/ui/Button/Button";

import iconLemon from "../../../assets/icons/icon_logo-1.png";

const REASONS = [
    {
        type: "change_plans",
        label: "Change of plans",
        icon: "calendar-xmark",
    },
    {
        type: "personal",
        label: "Personal reasons",
        icon: "user",
    },
    {
        type: "sick",
        label: "Not feeling well",
        icon: "head-side-cough",
    },
    {
        type: "weather/traffic",
        label: "Bad weather or traffic",
        icon: "sun",
    },
    {
        type: "other",
        label: "Other (please specify)",
        icon: "circle-info",
    },
];

export default function CancelReservation() {
    const { reservations, goToStep, resetReservations, updateReservations, isCancel } = useReservations();
    const { partySize, date, time, tableLocation, reservationCode } = reservations;

    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [reason, setReason] = useState("");
    const [other, setOther] = useState("");
    let [isOpen, setIsOpen] = useState(false);

    if (!isCancel) return null;

    // const handleConfirmCancel = async () => {
    //     setIsSubmitting(true);
    //     try {
    //         const response = await fetch('/api/reservations/cancel', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 reservationCode: reservations.reservationCode,
    //                 cancelReason: reservations.cancelReason,
    //                 email: reservations.customerEmail,
    //             })
    //         });

    //         if (response.ok) {
    //             // Hiển thị thông báo thành công
    //             alert('Đã hủy đặt bàn thành công!');
    //             resetReservations(); // Clear data
    //         }
    //     } catch (error) {
    //         alert('Có lỗi xảy ra, vui lòng thử lại');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const handleConfirmCancel = () => {
        if (!reason) {
            setError("Please select a cancellation reason");
            return;
        }

        if (reason === "other" && !other.trim()) {
            setError("Please specify your reason");
            return;
        }

        setError("");

        updateReservations({
            cancelReason: reason,
            cancelReasonDetail: reason === "other" ? other.trim() : "",
        });

        setIsOpen(true);

        sessionStorage.setItem("bookingData", null);
    };

    //     const submitCancellation = async () => {
    //     const response = await fetch('/api/reservations/cancel', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             reservationCode: reservations.reservationCode,
    //             cancelReason: reservations.cancelReason,
    //             cancelReasonDetail: reservations.cancelReasonDetail, // ← Gửi cả detail
    //             email: reservations.customerEmail,
    //         })
    //     });
    // };

    const handleKeepReservation = () => {
        setReason("");
        setOther("");
        setError("");
        setIsOpen(false);
        updateReservations({
            cancelReason: "",
            cancelReasonDetail: "",
        });
    };

    const handleMakeNewReservation = () => {
        setIsOpen(false);
        resetReservations();
        goToStep(1);
    };

    const handleBackToHomepage = () => {
        setIsOpen(false);
        resetReservations();
    };

    return (
        <div className="cancel-reservations">
            <Form title={<>Reservation Code: {reservationCode}</>}>
                <div className="flex flex-col gap-4">
                    <Info icon={"users"} className="form-info">
                        {partySize} Guests
                    </Info>
                    <Info icon={"calendar"} className="form-info">
                        {dayjs(date).format("DD/MM/YYYY")}
                    </Info>
                    <Info icon={"clock"} className="form-info">
                        {time}
                    </Info>
                    <Info icon={"location-dot"} className="form-info">
                        {tableLocation}
                    </Info>
                </div>
            </Form>

            <Form
                title={
                    <>
                        Cancel reason <span className="text-red-600! text-xl!">*</span>
                    </>
                }
                className="cancel-reservations_form"
            >
                {REASONS.map((r) => (
                    <label key={r.type} className={reason === r.type ? "border-(--color-secondary-1)! bg-(--color-secondary-2)!" : ""}>
                        <input type="radio" name="cancelReason" value={r.type} checked={reason === r.type} onChange={() => setReason(r.type)} className="hidden" />
                        <FontAwesomeIcon icon={r.icon} className="text-xl" />
                        <span>{r.label}</span>
                    </label>
                ))}

                <textarea value={other} disabled={reason !== "other"} required onChange={(e) => setOther(e.target.value)} />
            </Form>

            <div className="cancel-reservations_buttons">
                <Button to="/" onClick={handleKeepReservation}>
                    Keep Reservation
                </Button>

                <Button onClick={handleConfirmCancel} variant="" className="cancel-btn">
                    Cancel Reservation
                </Button>

                <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="space-y-4 p-4 bg-(--color-highlight-1) rounded-xl flex flex-col items-center justify-center">
                            <div>
                                <img src={iconLemon} alt="Lemon Icon" className="w-6" />
                            </div>
                            <Description className="font-[karla-reg]! text-center">Your reservation has been canceled. We hope to welcome you another time.</Description>
                            <div className="flex flex-row gap-5 justify-center w-full">
                                <Button onClick={handleMakeNewReservation} className="flex-1">
                                    Make a new reservation
                                </Button>
                                <Button to="/" onClick={handleBackToHomepage} className="flex-1 bg-(--color-secondary-2)! hover:bg-(--color-secondary-1)!">
                                    Back to homepage
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
