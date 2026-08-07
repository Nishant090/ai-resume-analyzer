const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full max-w-md
        rounded-2xl
        p-6 sm:p-8
        bg-white
        shadow-xl shadow-violet-100/50
        border border-violet-100
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;