import { useEffect, useState, useReducer } from "react";
import dayjs from "dayjs";

import { fetchAPI } from "../../../api/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

import { useReservations } from "../../../context/ReservationsContext";
import Button from "../../../components/ui/Button/Button";
import contact from "../../../data/contact.json";

import iconSearch from "../../../assets/icons/icon_search.svg";
import restaurantImage from "../../../assets/images/restaurant.jpg";

import "./BookingForm.css";

export const initializeTimes = () => {
    if (fetchAPI) {
        const today = dayjs();
        const timeSlots = fetchAPI(today.toDate());

        const minValidTime = today.add(30, "minutes");

        return timeSlots.filter((slot) => {
            const [h, m] = slot.split(":");
            const slotTime = today.set("hour", h).set("minute", m).set("second", 0);

            return slotTime.isAfter(minValidTime) || slotTime.isSame(minValidTime);
        });
    }

    return ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
};

export const updateTimes = (state, action) => {
    switch (action.type) {
        case "UPDATE_TIMES":
            if (action.date && fetchAPI) {
                const selectedDate = dayjs(action.date, "DD/MM/YYYY");

                const availableTimes = fetchAPI(selectedDate.toDate());
                console.log("Fetched times for date:", action.date, availableTimes);

                const isToday = selectedDate.isSame(dayjs(), "day");

                if (isToday) return initializeTimes();

                return availableTimes;
            }

            return state;

        case "SET_TIMES":
            return action.times;

        default:
            return state;
    }
};

export default function BookingForm({ submitForm }) {
    const { nextStep, reservations, updateReservations } = useReservations();

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // lưu kết quả API
    const [guestNumber, setGuestNumber] = useState(2);
    const [error, setError] = useState(null);

    const { guests, date, time, occasion } = reservations;

    // UpdateTimes
    const [availableTimes, dispatchTimes] = useReducer(updateTimes, [], initializeTimes);

    // limit 2 weeks
    const today = dayjs();
    const maxDate = dayjs().add(14, "day");

    const handleDateChange = (d) => {
        if (!d) {
            updateReservations({ date: "", time: "" });
            return;
        }
        if ((today.isBefore(d) || today.isSame(d, "date")) && (d.isBefore(maxDate) || d.isSame(maxDate, "date"))) {
            const formatted = d.format("DD/MM/YYYY");
            updateReservations({ date: formatted });

            dispatchTimes({
                type: "UPDATE_TIMES",
                date: formatted,
            });
        }
    };

    useEffect(() => {
        if (availableTimes.length > 0) {
            if (!time || !availableTimes.includes(time)) {
                updateReservations({ time: availableTimes[0] });
            }
        }
    }, [availableTimes]);

    // submit search
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date || !time || !guestNumber) {
            setError("Please select Party Size, Date and Time.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await submitForm(reservations);
            setResult(res);

            if (res.found) {
                console.log("Saving to context:", {
                    guests: guestNumber,
                    time: res.time,
                    date: res.date,
                    occasion: res.occasion,
                });

                updateReservations({
                    guests: guestNumber,
                    time: res.time,
                    date: res.date,
                    occasion: res.occasion,
                });

                console.log("After update, reservations:", reservations);
            }
        } catch (error) {
            setError("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNextStep = () => {
        if (!result || !result.found) {
            setError("Please search and select an available table first");
            return;
        }

        sessionStorage.setItem("bookingData", JSON.stringify(result));
        nextStep();
    };

    return (
        <div className="select-table">
            <div className="container">
                <form onSubmit={handleSubmit} className="select-table-form">
                    <fieldset className="top-row-form sm:divide-x-1 sm:divide-solid sm:divide-(--color-highlight-2)">
                        <div className="field">
                            <label htmlFor="guests">
                                Number of guests <span className="text-red-600!">*</span>
                            </label>
                            <div className="select-wrapper">
                                <select
                                    value={guestNumber}
                                    onChange={(e) => {
                                        setGuestNumber(e.target.value);
                                        setError(null);
                                    }}
                                    id="guests"
                                    className="select"
                                    required
                                >
                                    {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <option key={num} value={num}>
                                            {num} People
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="date">
                                Date <span className="text-red-600!">*</span>
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="date"
                                    value={date ? dayjs(date, "DD/MM/YYYY") : null}
                                    onChange={handleDateChange}
                                    minDate={today}
                                    maxDate={maxDate}
                                    format="DD/MM/YYYY"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            InputProps: {
                                                className: "select date-select",
                                                disableUnderline: true,
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="field">
                            <label htmlFor="time">
                                Time <span className="text-red-600!">*</span>
                            </label>
                            <select
                                value={time}
                                onChange={(e) => {
                                    updateReservations({ time: e.target.value });
                                    setError(null);
                                }}
                                disabled={!date}
                                id="time"
                                className="select"
                            >
                                {availableTimes.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" disabled={loading} className="btn-search">
                            <img src={iconSearch} alt="icon" />
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </fieldset>

                    <fieldset className="bottom-row-form">
                        <label htmlFor="occasion">Occasion:</label>
                        <div className="flex gap-5 flex-wrap">
                            {["Birthday", "Anniversary"].map((o) => (
                                <button
                                    type="button"
                                    key={o}
                                    value={o}
                                    className={`btn-occasion ${occasion === o ? "active" : ""}`}
                                    onClick={() => {
                                        updateReservations({ occasion: occasion === o ? null : o });
                                        setError(null);
                                    }}
                                >
                                    {o}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </form>

                {error && (
                    <div
                        className="error-message "
                        style={{
                            borderRadius: "0.5rem",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                <div className="select-table-result">
                    {!result && !loading && (
                        <div className="loading">
                            <h5>Find your table</h5>
                            <p>OR</p>
                            <p>
                                For specific requests such as hosting large groups (15+ people), booking more than 30 days in advance or choosing a preferred ambiance, please
                                contact our restaurant (16:00 - 22:00) via:
                                <br />
                                Phone number: {contact.find((item) => item.label === "Phone")?.value} (Please chossing press 1 for Reservation)
                            </p>
                        </div>
                    )}

                    {result && result.found && (
                        <div className="found">
                            <div className="info">
                                <h5>1 Availability for your request</h5>
                                <p>
                                    Available at <strong className="font-[karla-bd]">{result.time}</strong>, <strong className="font-[karla-bd]">{result.date}</strong>,{" "}
                                    <strong className="font-[karla-bd]">{guests} People</strong>
                                </p>
                                {occasion !== "" && (
                                    <p>
                                        Occasion: <strong className="font-[karla-bd]">{occasion}</strong>
                                    </p>
                                )}
                                <p>Reservation held for {result.heldMinutes} minutes</p>
                                <Button name="Book A Table Now" onClick={handleNextStep}>
                                    Book A Table Now
                                </Button>
                            </div>
                            <div className="img">
                                <img src={restaurantImage} alt="Restaurant IMG" />
                            </div>
                        </div>
                    )}

                    {result && !result.found && (
                        <div className="not-found">
                            <h5>NO MATCHING TABLE FOUND</h5>
                            <p>
                                Explore other time/table locations for available tables on the same date. Click your preferred time to continue booking.
                                <br />
                                OR
                                <br />
                                Join our Waitlist at your chosen restaurant, we'll contact you as soon as a table is available.
                                <br />
                                Option for delivery by clicking at
                                <Link className="card-link" to="">
                                    Order a delivery
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
