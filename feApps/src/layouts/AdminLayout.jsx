import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="main-content">

                {children}

            </main>

        </>

    );

}

export default AdminLayout;