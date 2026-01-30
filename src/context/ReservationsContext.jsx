import { createContext, useContext, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const ReservationsContext = createContext();

export default function ReservationsProvider({ children, totalSteps = 3 }) {
    const [searchParams, setSearchParams] = useSearchParams();

    // REMANDING TIME ---------------------------------------------------------------------------------

    const DURATION_MINUTES = 1;
    const startTimeRef = useRef(null);

    const [remaining, setRemaining] = useState({
        minutes: DURATION_MINUTES,
        seconds: 0,
    });

    const [isTimerActive, setIsTimerActive] = useState(false);

    // STEP --------------------------------------------------------------------------------------------

    const isValidStep = (s) => {
        if (s === "cancel") return true;
        const num = Number(s);
        return !isNaN(num) && num >= 1 && num <= totalSteps;
    };

    const stepFromUrl = searchParams.get("step");
    const initialStep = isValidStep(stepFromUrl) ? (stepFromUrl === "cancel" ? "cancel" : Number(stepFromUrl)) : 1;

    const [step, setStep] = useState(initialStep);

    // REMANDING TIME ---------------------------------------------------------------------------------

    useEffect(() => {
        if (step === 1) {
            setIsTimerActive(false);
            startTimeRef.current = null;
            setRemaining({
                minutes: DURATION_MINUTES,
                seconds: 0,
            });
        } else if (step === 2 && !startTimeRef.current) {
            startTimeRef.current = dayjs();
            setIsTimerActive(true);
        }
    }, [step]);

    useEffect(() => {
        if (!startTimeRef.current || !isTimerActive) return;

        const timer = setInterval(() => {
            const now = dayjs();
            const diff = DURATION_MINUTES * 60 - now.diff(startTimeRef.current, "second");

            if (diff <= 0) {
                clearInterval(timer);
                setRemaining({ minutes: 0, seconds: 0 });
                setIsTimerActive(false);
                return;
            }

            setRemaining({
                minutes: Math.floor(diff / 60),
                seconds: diff % 60,
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isTimerActive, DURATION_MINUTES]);

    const syncStepToURL = (newStep) => {
        setStep(newStep);
        setSearchParams({ step: newStep });
    };

    const nextStep = () => {
        if (step === "cancel") return;
        syncStepToURL(Math.min(step + 1, totalSteps));
    };

    const prevStep = () => {
        if (step === "cancel") return;
        syncStepToURL(Math.max(step - 1, 1));
    };

    const goToStep = (s) => {
        if (isValidStep(s)) {
            syncStepToURL(s === "cancel" ? "cancel" : Number(s));
        }
    };

    const isFirst = step === 1;
    const isLast = step === totalSteps;
    const isCancel = step === "cancel";

    const initialReservations = {
        guests: 2,
        date: dayjs().format("DD/MM/YYYY"),
        time: "",
        occasion: "",
        tableId: "",
        customerFirstName: "",
        customerLastName: "",
        customerEmail: "",
        customerPhone: "",
        notifySms: false,
        specialRequests: "",
        reservationCode: "",
        // Cancel Reservations
        cancelReason: "",
        cancelReasonDetail: "",
    };

    const [reservations, setReservations] = useState(initialReservations);

    const updateReservations = (newData) => {
        setReservations((prev) => ({ ...prev, ...newData }));
    };

    const resetReservations = () => {
        setReservations(initialReservations);
        syncStepToURL(1);
        setIsTimerActive(false);
        startTimeRef.current = null;
        setRemaining({ minutes: DURATION_MINUTES, seconds: 0 });
    };

    return (
        <ReservationsContext
            value={{
                step,
                setStep,
                nextStep,
                prevStep,
                goToStep,
                resetReservations,
                updateReservations,
                isFirst,
                isLast,
                isCancel,
                reservations,
                remaining,
                isTimerActive,
                DURATION_MINUTES,
            }}
        >
            {children}
        </ReservationsContext>
    );
}

export const useReservations = () => {
    const context = useContext(ReservationsContext);
    if (!context) throw new Error("useReservations must be used within ReservationProvider");
    return context;
};
