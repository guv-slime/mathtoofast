import CoolButton from "./CoolButton";

function StartMenu({ onClick, highScore }) {
  return (
    <div className="bg-black text-white text-center max-w-[300px] min-h-[400px] flex flex-col items-center justify-center mx-auto p-4 rounded-md relative border-2 border-gray-200 shadow-md shadow-red-950/50">
      <h2 className="font-expose text-5xl">Welcome to MATHTOOFAST!</h2>
      <p className="font-arsenal">
        You have 30 seconds to answer as many problems as possible.
      </p>
      <div className="relative">
        <CoolButton
          onClick={onClick}
          buttonLabel={"Start"}
          textColor={"text-black"}
        />
      </div>
      <p className="font-expose text-3xl absolute bottom-3">
        HIGHSCORE <span className="font-arsenal">: {highScore}</span>
      </p>
      <span className="text-3xl absolute top-3 left-3">♠</span>
      <span className="text-3xl absolute top-3 right-3">♥</span>
      <span className="text-3xl absolute left-3 bottom-3">♦</span>
      <span className="text-3xl absolute bottom-3 right-3">♣</span>
    </div>
  );
}

export default StartMenu;
