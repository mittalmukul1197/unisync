import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminTabContext } from '../../layout/navbar';
import './AdminDashboard.css';

export default function DeanDashboard() {
    const navigate = useNavigate();
    const { setActiveTab } = useContext(AdminTabContext);  

    const departmentName = "Computer Science & Engineering";

    const stats = [
        { title: 'Total Students', value: '90', icon: '🎓' },
        { title: 'Active Groups', value: '6', icon: '📚' },
        { title: 'Department Attendance', value: '84%', icon: '📊' },
        { title: 'Department Faculty', value: '18', icon: '👨‍🏫' }
    ];

    const rawActivities = [
        {
            id: 1,
            title: 'Mid-Term Examinations',
            date: '2026-10-27', 
            time: '10:00 AM - 01:00 PM',
            venue: 'Main Examination Hall',
            icon: '📝'
        },
        {
            id: 2,
            title: 'Department Faculty Board Meeting',
            date: '2026-10-28', 
            time: '02:30 PM - 04:00 PM',
            venue: 'Conference Room 2B',
            icon: '🤝'
        },
        {
            id: 3,
            title: 'Guest Lecture on AI & Cloud',
            date: '2026-11-08', 
            time: '11:00 AM - 01:00 PM',
            venue: 'Auditorium A',
            icon: '💡'
        },
        {
            id: 4,
            title: 'Capstone Project Evaluation',
            date: '2026-11-15',
            time: '09:30 AM - 04:30 PM',
            venue: 'Lab 4 & 5',
            icon: '💻'
        }
    ];

    const todayStr = new Date().toISOString().split('T')[0];
    
    const scheduledActivities = rawActivities
        .filter(activity => activity.date >= todayStr)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const updates = [
        {
            id: 1,
            title: 'New Student Enrolled',
            description: 'Rahul Sharma joined CSE Batch 2026.',
            time: '10 minutes ago',
            icon: '🎓'
        },
        {
            id: 2,
            title: 'Batch Schedule Updated',
            description: 'Updated timetable for CSE Batch 2025.',
            time: '30 minutes ago',
            icon: '📅'
        },
        {
            id: 3,
            title: 'Faculty Assigned',
            description: 'Dr. Verma assigned to Advanced Algorithms.',
            time: '1 hour ago',
            icon: '👨‍🏫'
        },
        {
            id: 4,
            title: 'Department Notice Issued',
            description: 'Mid-term assessment dates published.',
            time: '3 hours ago',
            icon: '📢'
        }
    ];

    return (
        <div className="dashboard">

            <div className="welcome">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome, Dean. Here is the overview and performance summary for your department.
                    </p>
                </div>

                <div className="date">
                    {new Date().toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>
            </div>

            <div className="dashboard-stats">
                {stats.map((item, index) => (
                    <div className="statcard" key={index}>
                        <div className="statcard-head">
                            <div>
                                <p className="stat-title">{item.title}</p>
                                <h2>{item.value}</h2>
                            </div>

                            <div className="stat-icon">
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <section className="dashboard-panel quick-actions-panel">
                <div className="panel-header">
                    <div>
                        <h2>Quick Actions</h2>
                        <p>Here is your Quick Actions buttons which are frequently used.</p>
                    </div>
                </div>

                <div className="quick-actions">
                    <button
                        className="quick-action-btn"
                        onClick={() => {
                            setActiveTab('Batches');
                            navigate('/admin/batches')
                        }}
                    >
                        <span>🎓</span>
                        <div>
                            <h4>View Students</h4>
                            <p>View Student information here</p>
                        </div>
                    </button>

                    <button
                        className="quick-action-btn"
                        onClick={() =>{
                            setActiveTab('Attendance');
                            navigate('/admin/attendence')
                        } }
                    >
                        <span>📊</span>
                        <div>
                            <h4>View Attendence</h4>
                            <p>View your department attendence in details.</p>
                        </div>
                    </button>

                    

                    <button
                        className="quick-action-btn"
                        onClick={() => {
                            setActiveTab('Performance');
                            navigate('/admin/performance');
                        }}
                    >
                        <span>📊</span>
                        <div>
                            <h4>Department Reports</h4>
                            <p>View analytics and attendance</p>
                        </div>
                    </button>
                </div>
            </section>

            <div className="dashboard-content">

                <section className="dashboard-panel scheduled-activities-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Scheduled Activities</h2>
                            <p>Upcoming and today's events for {departmentName}</p>
                        </div>
                    </div>

                    <div className="activity-list">
                        {scheduledActivities.length > 0 ? (
                            scheduledActivities.map(activity => (
                                <div className="activity-item" key={activity.id}>
                                    <div className="activity-icon">
                                        {activity.icon}
                                    </div>

                                    <div className="activity-details">
                                        <h4>{activity.title}</h4>
                                        <p>{activity.venue} | {activity.time}</p>
                                        <span>
                                            {new Date(activity.date).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '16px', color: '#666' }}>No upcoming activities scheduled.</p>
                        )}
                    </div>
                </section>

                <section className="dashboard-panel activity-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Recent Updates</h2>
                            <p>Latest announcements and updates from {departmentName}</p>
                        </div>

                        <button
                            className="view-all-btn"
                            onClick={() => {
                                setActiveTab('Updates');
                                navigate('/admin/updates');
                            }}
                        >
                            View All
                        </button>
                    </div>

                    <div className="activity-list">
                        {updates.map(update => (
                            <div className="activity-item" key={update.id}>
                                <div className="activity-icon">
                                    {update.icon}
                                </div>

                                <div className="activity-details">
                                    <h4>{update.title}</h4>
                                    <p>{update.description}</p>
                                    <span>{update.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

           

        </div>
    );
}
