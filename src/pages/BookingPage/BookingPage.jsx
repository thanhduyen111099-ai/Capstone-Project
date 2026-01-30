import { useReservations } from "../../context/ReservationsContext";
import BookingForm from "./Step1_BookingForm/BookingForm";
import GuestDetail from "./Step2_GuestDetail/GuestDetail";
import ConfirmedBooking from "./Step3_ConfirmedBooking/ConfirmedBooking";
import CancelReservation from "./Cancel/CancelReservation";
import Banner from "../../components/common/Banner/Banner";
import NotFound from "../NotFound";
import { submitAPI } from "../../api/api";

export default function BookingPage() {
    const { step, isCancel } = useReservations();

    const submitForm = (formData) => {
        const respond = submitAPI(formData);

        if (respond) {
            return {
                found: true,
                ...formData,
            };
        }

        return {
            found: false,
            otherOption: [],
            reason: "NO_VACANCY",
        };
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <BookingForm submitForm={submitForm} />;
            case 2:
                return <GuestDetail />;
            case 3:
                return <ConfirmedBooking />;
            case "cancel":
                return <CancelReservation />;
            default:
                return <NotFound />;
        }
    };

    return (
        <>
            {!isCancel ? (
                <Banner heading="Reservations" content={(step === 1 && "Choose table") || (step === 2 && "Guest Detail") || (step === 3 && "ConfirmedBooking")} />
            ) : (
                <Banner heading={"Confirm Cancellation"} />
            )}
            <div className="bg-(--color-highlight-2)">{renderStep()}</div>
        </>
    );
}
