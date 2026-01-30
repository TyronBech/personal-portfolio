

function Header() {
  return (
    <header className="absolute w-full h-20 flex items-center justify-end">
      <nav className="relative w-full h-full flex items-center justify-center">
        <ul className="flex gap-16 text-white font-lexend tracking-wider text-sm">
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#experience" className="hover:underline">Experience</a></li>
          <li><a href="#projects" className="hover:underline">Projects</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;