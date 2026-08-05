const Input = ({ label, error, ...props }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          px-4
          py-3
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          transition-colors 
          duration-200
        "
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
