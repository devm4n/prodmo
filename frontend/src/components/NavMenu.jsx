import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";

export function NavMenu() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex justify-center py-4">
      <nav className="w-[700px] h-[50px] flex items-center justify-between bg-zinc-600 rounded-lg px-4">
        <Link
          to="/"
          className="font-semibold text-white hover:text-zinc-300 transition-colors"
        >
          Notes
        </Link>
        <Button
          onClick={logout}
          className="text-zinc-300 hover:text-white transition-colors text-sm"
        >
          Log Out
        </Button>
      </nav>
    </div>
  );
}
