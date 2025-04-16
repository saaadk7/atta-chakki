import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Flour Mill Dashboard</div>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
      </div>
    </nav>
  );
}
