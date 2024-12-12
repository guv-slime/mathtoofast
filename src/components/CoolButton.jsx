export default function CoolButton({ onClick, buttonLabel, textColor }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 translate- z-20 w-[200px] h-[65px] font-arsenal text-lg text-shadow-btn ${textColor}`}
      >
        {buttonLabel}
      </button>
      <div className="cool-button absolute z-10"></div>
      <div className="warm-button"></div>
    </>
  );
}
