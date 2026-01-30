import { useSearchParams } from "react-router-dom";
import { useReservations } from "../context/ReservationsContext";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function usePreloadFromQuery() {
    const { updateReservations } = useReservations();
    const [params] = useSearchParams();
    const saved = sessionStorage.getItem("bookingData");
    const bookingData = saved ? JSON.parse(saved) : {};

    useEffect(() => {
        const guests = bookingData.guests;
        const date = bookingData.date;
        const time = bookingData.time;
        const occasion = bookingData.occasion;
        // const size = params.get("partySize");
        // const date = params.get("date");
        // const time = params.get("time");
        // const table = params.get("tableLocation");

        updateReservations({
            guests: guests ? Number(guests) : 2,
            date: date || dayjs().format("DD/MM/YYYY"),
            time: time || "",
            occasion: occasion || "",
        });
    }, [params]);
}
