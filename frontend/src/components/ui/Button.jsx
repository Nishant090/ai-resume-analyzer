const Button = ({ children, loading = false,loadingText ,...props }) => {
  return (
    <button
      className="
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-3
        text-white
        font-medium
        cursor-pointer
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        transition-all
        duration-200
        hover:scale-[1.02]
        active:scale-[0.98]
      "
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
