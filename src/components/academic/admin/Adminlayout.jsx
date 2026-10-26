
import React, { useState, useEffect } from 'react';

import { AdminSidebar, AdminTabContext } from '../../layout/navbar';
import { AdminHeader } from '../../layout/header';
import Footer from '../../layout/footer';

import { Outlet, useNavigate } from 'react-router-dom';

import './Adminlayout.css';


export default function Adminlayout({onLogout}) {

    const getActiveTab = () => {

        const path = window.location.pathname;

        const tabs = {
            "/admin": "Dashboard",
            "/admin/info": "My Info",
            "/admin/updates": "Updates",
            "/admin/attendence": "Attendance",
            "/admin/faculty": "Faculty",
            "/admin/batches": "Batches",
            "/admin/performance": "Performance"
        };

        return tabs[path] || "Dashboard";
    };


    const [activeTab, setActiveTab] = useState(getActiveTab);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();


    const user = JSON.parse(
        localStorage.getItem("user_session")
    ) || {
        email: "dr.sharma@chitkara.edu.in"
    };


    useEffect(() => {

        const updateTab = () => {
            setActiveTab(getActiveTab());
        };

        window.addEventListener("popstate", updateTab);

        return () => {
            window.removeEventListener("popstate", updateTab);
        };

    }, []);


    const handleAdminLogout = () => {
    sessionStorage.removeItem("activeTab");
    onLogout();
};


    return (

        <AdminTabContext.Provider
            value={{ activeTab, setActiveTab }}
        >

            <div className="admin-layout">

                <aside
                    className={`admin-sidebar ${
                        isMobileMenuOpen ? "open" : ""
                    }`}
                >

                    <AdminSidebar
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    />

                </aside>


                <div className="admin-content">


                    <header className="admin-header">

                        <AdminHeader
                            role="admin"
                            title={
                                activeTab === "Dashboard"
                                    ? "Admin"
                                    : activeTab
                            }
                            user={user}
                            onLogout={handleAdminLogout}
                            onToggleMobileMenu={() =>
                                setIsMobileMenuOpen(prev => !prev)
                            }
                        />

                    </header>


                    <main className="admin-main">

                        <Outlet />

                        <Footer />

                    </main>


                </div>


                {isMobileMenuOpen && (

                    <div
                        className="admin-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                )}

            </div>

        </AdminTabContext.Provider>

    );

}