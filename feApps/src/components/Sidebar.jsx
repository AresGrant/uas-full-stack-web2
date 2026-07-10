import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaCapsules,
    FaTruck,
    FaUsers,
    FaUserShield,
    FaLayerGroup,
    FaProjectDiagram,
    FaShoppingCart,
    FaCashRegister
} from "react-icons/fa";

function Sidebar() {

    const menus = [
        {
            name: "Dashboard",
            path: "/",
            icon: <FaHome />
        },
        {
            name: "Obat",
            path: "/obat",
            icon: <FaCapsules />
        },
        {
            name: "Suplier",
            path: "/suplier",
            icon: <FaTruck />
        },
        {
            name: "Pelanggan",
            path: "/pelanggan",
            icon: <FaUsers />
        },
        {
            name: "User",
            path: "/user",
            icon: <FaUserShield />
        },
        {
            name: "Golongan Obat",
            path: "/golongan-obat",
            icon: <FaLayerGroup />
        },
        {
            name: "Kelas Terapi",
            path: "/kelas-terapi",
            icon: <FaProjectDiagram />
        },
        {
            name: "Sub Kelas",
            path: "/sub-kelas-terapi",
            icon: <FaProjectDiagram />
        },
        {
            name: "Pembelian",
            path: "/pembelian",
            icon: <FaShoppingCart />
        },
        {
            name: "Penjualan",
            path: "/penjualan",
            icon: <FaCashRegister />
        }
    ];

    return (

        <aside className="sidebar">

            <div className="sidebar-header">

                <h3>MyPharmacy</h3>

            </div>

            <ul className="sidebar-menu">

                {
                    menus.map((menu) => (

                        <li key={menu.path}>

                            <NavLink
                                to={menu.path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >

                                {menu.icon}

                                <span>{menu.name}</span>

                            </NavLink>

                        </li>

                    ))
                }

            </ul>

        </aside>

    );

}

export default Sidebar;