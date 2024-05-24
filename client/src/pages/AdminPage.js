import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie, PolarArea } from 'react-chartjs-2'; // Import PolarArea from react-chartjs-2
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

    const getTotalScores = (difficulty) => {
        let totalScore = 0;
        let totalCount = 0;
        users.forEach(user => {
            const scores = user.scores[difficulty];
            if (scores) {
                totalScore += scores.reduce((acc, score) => acc + score, 0);
                totalCount += scores.length;
            }
        });
        return { totalScore, totalCount };
    };

    // Calculate total scores and scores for each category
    const easyScores = getTotalScores('easy');
    const mediumScores = getTotalScores('medium');
    const hardScores = getTotalScores('hard');

    const totalEasyScore = easyScores.totalScore;
    const totalEasyCount = easyScores.totalCount;
    const totalMediumScore = mediumScores.totalScore;
    const totalMediumCount = mediumScores.totalCount;
    const totalHardScore = hardScores.totalScore;
    const totalHardCount = hardScores.totalCount;

    const averageEasyScore = totalEasyCount ? (totalEasyScore / totalEasyCount).toFixed(2) : 0;
    const averageMediumScore = totalMediumCount ? (totalMediumScore / totalMediumCount).toFixed(2) : 0;
    const averageHardScore = totalHardCount ? (totalHardScore / totalHardCount).toFixed(2) : 0;

    const pieChartData = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{
            data: [totalEasyCount, totalMediumCount, totalHardCount],
            backgroundColor: ['#33cc33', '#f9b234', '#ff6666'],
            borderColor: ['#99ff99', '#ffe97d', '#ff9999'],
            borderWidth: 1,
        }]
    };

    const polarChartData = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{
            data: [averageEasyScore, averageMediumScore, averageHardScore],
            backgroundColor: ['rgba(51, 204, 51, 0.5)', 'rgba(249, 178, 52, 0.5)', 'rgba(255, 102, 102, 0.5)'],
            borderColor: ['rgba(51, 204, 51, 1)', 'rgba(249, 178, 52, 1)', 'rgba(255, 102, 102, 1)'],
            borderWidth: 1,
        }]
    };

    const polarOptions = {
        scales: {
            r: {
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

    return (
        <div className='admin-container'>
            <div className='active-players'>
                <div className="chart-container">
                    <Bar data={chartData} options={options} />
                </div>
            </div>
            <div className="pie-chart-container">
                <Pie data={pieChartData} />
            </div>
            <div className="polar-chart-container">
                <PolarArea data={polarChartData} options={polarOptions} />
            </div>
        </div>
    );
}

export default AdminPage;
