const Footer = () => {
  return (
    <footer className="bg-yellow-100 text-gray-500 dark:bg-gray-800 p-3 flex flex-col md:flex-row items-center justify-around text-center text-m gap-2 md:gap-0">
      <div>&copy; {new Date().getFullYear()} MooDuck All rights reserved.</div>
      <div className="flex gap-4">
        <div className="hover:underline hover:cursor-pointer">contact@mooduck.xyz</div>
      </div>
      <div className="hover:underline hover:cursor-pointer">Buy me a coffee ☕</div>
    </footer>
  );
};
export default Footer;
