import "./FormInput.css";

export default function FormInput({ className = "", name, register, rules = {}, type, placeholder, helper, error }) {
    const style = `form-input ${className}`;
    return (
        <div className={style}>
            <input type={type} placeholder={placeholder} className={`form-input_input ${error ? `form-input--error` : ""}`} {...register(name, rules)} />

            {error && <p className="form-input_error text-red-600!">{error.message}</p>}

            {!error && helper && <p className="form-input_helper">{helper}</p>}
        </div>
    );
}
