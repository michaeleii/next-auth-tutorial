import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { status } = useSession();

  const handleLogout = () => signOut();

  return (
    <nav className="p-5 bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 sm:flex-row justify-between items-center">
        <div className="font-bold text-3xl btn btn-ghost normal-case">
          Next Auth
        </div>
        <ul className="flex gap-10 text-lg font-semibold items-center">
          {status === "unauthenticated" && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {status === "authenticated" && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
