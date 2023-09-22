import InputSearch from "./InputSerach";
import Logo from "./Logo";
import Results from "./Result";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <InputSearch />
      <Results />
    </nav>
  );
}
