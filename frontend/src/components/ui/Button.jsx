const Button = ({
  children,
  loading = false,
  loadingText,
  fullWidth = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-300",
    secondary:
      "bg-white text-violet-700 border border-violet-200 hover:bg-violet-50 focus-visible:ring-violet-200",
  };

  return (
    <button
      className={`
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        inline-flex items-center justify-center gap-2
        rounded-lg
        px-4 py-2.5 sm:py-3
        text-sm sm:text-base font-medium
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-60
        transition-all duration-200
        hover:scale-[1.02] active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;