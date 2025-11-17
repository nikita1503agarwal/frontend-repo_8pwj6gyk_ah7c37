export default function DummyLink({ children, className = "", ariaLabel, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#7BA4D0] ${className}`}
    >
      {children}
    </button>
  );
}
