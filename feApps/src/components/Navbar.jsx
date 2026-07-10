import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar-custom">

            <div className="navbar-title">
                Sistem Informasi Apotek
            </div>

            <div className="navbar-user">

                <FaUserCircle size={28} />

                <span>Administrator</span>

            </div>

        </nav>
    );
}

export default Navbar;