import "./GuestDetail.css";

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Form from "../../../components/ui/Form/Form";
import Info from "../../../components/ui/Info/Info";
import Button from "../../../components/ui/Button/Button";
import { useReservations } from "../../../context/ReservationsContext";
import FormInput from "../../../components/ui/FormInput/FormInput";

import iconTime from "../../../assets/icons/icon_timesup.svg";
import iconLemon from "../../../assets/icons/icon_logo-1.png";
import FormCheckbox from "../../../components/ui/FormCheckbox/FormCheckbox";

export default function GuestDetail() {
    const { prevStep, nextStep, reservations, updateReservations, DURATION_MINUTES, remaining } = useReservations();

    const { guests, date, time, occasion, customerFirstName, customerLastName, customerEmail, customerPhone, notifySms, specialRequests } = reservations;

    const remainingTime = `${remaining.minutes.toString().padStart(2, "0")}:${remaining.seconds.toString().padStart(2, "0")}`;

    // SET TIME OUT ---------------------------------------------------------
    const [isTimeoutOpen, setIsTimeoutOpen] = useState(false);

    useEffect(() => {
        if (remaining.minutes === 0 && remaining.seconds === 0) {
            setIsTimeoutOpen(true);
        }
    }, [remaining]);

    // HANDLE SUBMIT --------------------------------------------------------

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: customerFirstName,
            lastName: customerLastName,
            email: customerEmail,
            phone: customerPhone,
            notifySms: notifySms,
            specialRequests: specialRequests,
        },
    });

    const onSubmit = (data) => {
        updateReservations({
            customerFirstName: data.firstName,
            customerLastName: data.lastName,
            customerEmail: data.email,
            customerPhone: data.phone,
            notifySms: data.notifySms,
            specialRequests: data.specialRequests,
        });

        nextStep();
    };

    return (
        <div className="flex flex-col gap-12 md:px-5 px-3 py-12">
            <Form className="confirmation flex flex-row flex-nowrap justify-between max-sm:flex-col-reverse" title={"Please check your booking information:"}>
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

            <Form title={"Your details will not be shared and are used only for booking confirmation"} className="customer-details-form">
                <FormInput
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    register={register}
                    rules={{ required: `First name is required`, maxLength: 80 }}
                    error={errors.firstName}
                />
                <FormInput
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    register={register}
                    rules={{ required: `Last name is required`, maxLength: 100 }}
                    error={errors.lastName}
                />

                <FormInput
                    className="col-span-full"
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    register={register}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        },
                    }}
                    helper="Enter your email to receive booking confirmation."
                    error={errors.email}
                />
                <FormInput
                    type="tel"
                    placeholder="Mobile - Example: 0123456789"
                    required
                    name="phone"
                    register={register}
                    rules={{
                        required: "Mobile number is required",
                        pattern: {
                            value: /^[0-9]{6,12}$/,
                            message: "Phone number must be 6-12 digits",
                        },
                    }}
                    error={errors.phone}
                />

                <FormCheckbox name="notifySms" label="Notify me via sms?" register={register} />
                <p className="text-pretty">
                    By providing this information, I agree to <span className="font-[karla-med]! underline">Term of service</span> and{" "}
                    <span className="font-[karla-med]! underline">Privacy Policy</span>
                </p>
            </Form>

            <Form>
                <textarea className="form-textarea" placeholder="Special requests" {...register("specialRequests")} />
            </Form>

            <div className="flex flex-col gap-5 items-center justify-center px-5">
                <Button onClick={handleSubmit(onSubmit)} className="max-sm:w-full">
                    Proceed to Confirmation{" "}
                    <span className="text-red-600! font-[karla-bd]!">
                        {"("}
                        {remainingTime}
                        {")"}
                    </span>
                </Button>

                <button onClick={() => prevStep()} className="font-[karla-med] text-(--color-primary-1) hover:underline">
                    <FontAwesomeIcon icon={"arrow-left"} /> Select another table
                </button>
            </div>

            <Dialog
                open={isTimeoutOpen}
                onClose={() => {
                    setIsTimeoutOpen(false);
                    prevStep();
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
                                prevStep();
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
