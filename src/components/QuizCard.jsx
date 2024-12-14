function QuizCard({ children }) {
  return (
    <div className="bg-white max-w-[300px] min-h-[400px] border-2 border-gray-200 p-4 rounded-md flex flex-col justify-center items-center relative mx-auto shadow-md shadow-red-950/50">
      {children}
      <span className="text-3xl absolute top-3 left-3">♠</span>
      <span className="text-3xl absolute top-3 right-3">♥</span>
      <span className="text-3xl absolute left-3 bottom-3">♦</span>
      <span className="text-3xl absolute bottom-3 right-3">♣</span>
    </div>
  );
}

export default QuizCard;
