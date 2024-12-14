function Footer() {
  return (
    <div className="bg-white fixed bottom-4 right-4 z-10 p-1 rounded-full shadow-md border border-black hover:bg-red-600 transition-colors">
      <a href="https://github.com/guv-slime" target="_blank">
        <img src="./github.svg" alt="Github Logo" className="w-12 h-auto" />
      </a>
    </div>
  );
}

export default Footer;
