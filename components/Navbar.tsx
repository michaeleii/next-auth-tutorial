import Link from "next/link";

function Navbar() {
  return (
    <nav className="p-5 bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 sm:flex-row justify-between items-center">
        <div className="font-bold text-3xl btn btn-ghost normal-case">
          Next Auth
        </div>
        <ul className="flex gap-10 text-lg font-semibold items-center">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="" className="btn btn-secondary">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
