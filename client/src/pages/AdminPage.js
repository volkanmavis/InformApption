import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2'; // Import Pie from react-chartjs-2
import Chart from 'chart.js/auto';
import './css/adminPage.css';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/users/allusers");
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to sort users by the number of game sessions
    const sortUsersBySession = () => {
        return users.slice().sort((a, b) => b.gameSessions.length - a.gameSessions.length);
    };

    // Get labels and data for the chart
    const chartData = {
        labels: sortUsersBySession().slice(0, 5).map(user => user.email),
        datasets: [{
            label: 'Most Active Players',
            data: sortUsersBySession().slice(0, 5).map(user => user.gameSessions.length),
            backgroundColor: '#f9b234',
            borderColor: '#ffe97d',
            borderWidth: 1,
            text: {
                color: 'black'
            }
        }]
    };

    const options = {
        scales: {
            y: {
                ticks: {
                    color: 'black'
                }
            },
            x: {
                ticks: {
                    color: 'black'
                }
            }
        },
        plugins: {
            tooltip: {
                titleColor: 'white', 
                bodyColor: 'white',
            }
        }
    };

    // Get data for pie charts
    const pieChartData = users.map(user => {
        const { easy, medium, hard } = user.scores;

        const easyCount = easy ? easy.count : 0;
        const mediumCount = medium ? medium.count : 0;
        const hardCount = hard ? hard.count : 0;

        return {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                label: user.email,
                data: [easyCount, mediumCount, hardCount],
                backgroundColor: ['#f9b234', '#ffe97d', '#ffaf46']
            }]
        };
    });

    return (
        <div>
            <div className='active-players'>
                <div className="chart-container">
                    <Bar data={chartData} options={options} />
                </div>
                
            </div>
            <div className="pie-chart-container">
                {users.map((user, index) => (
                    <div key={index} className="pie-chart">
                        <Pie data={pieChartData[index]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
