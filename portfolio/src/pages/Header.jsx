function Header() {
  return (
    <header className="lg:absolute z-100 w-full h-20 lg:pt-8 flex items-center justify-end">
      <nav className="relative w-full h-full flex items-center justify-center">
        <ul className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-white font-lexend tracking-wider text-sm">
          {["About", "Experience", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-halloween-orange transform scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
