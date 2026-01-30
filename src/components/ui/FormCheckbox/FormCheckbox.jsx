export default function FormCheckbox({ className = "", value, type = "checkbox", name, label, register }) {
    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <input value={value} name={name} id={name} type={type} {...register(name)} />
            <label className="text-nowrap" htmlFor={name}>
                {label}
            </label>
        </div>
    );
}
