const Input = ({ label, error, id, ...props }) => {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full
          rounded-lg
          border
          ${error ? "border-red-300" : "border-slate-300"}
          px-4 py-2.5 sm:py-3
          text-sm sm:text-base
          outline-none
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-200
          transition-colors duration-200
        `}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;