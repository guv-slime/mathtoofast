function Logs({ answerLog }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <ul className="mt-4 p-4 bg-white max-w-[300px] max-h-[400px] rounded-md border-2 border-gray-200 font-arsenal overflow-y-auto">
        <h2 className="font-expose text-6xl text-center mb-4">Answer Log</h2>
        {answerLog.map((item, index) => (
          <li key={index}>
            {"Q" + (index + 1) + ": "}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logs;
