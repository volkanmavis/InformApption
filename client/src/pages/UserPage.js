import React, { useState, useEffect } from 'react';
import './css/userPage.css';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function UserPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [easyScores, setEasyScores] = useState([]);
  const [mediumScores, setMediumScores] = useState([]);
  const [hardScores, setHardScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [registration, setRegistration] = useState("")

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const calculateAverage = (scores) => {
    if (scores.length === 0) return 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / scores.length).toFixed(2);
  };

  const getUserInfo = async () => {
    if (!userId) {
      setError("No user ID found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/users/score/${userId}`);
      const allInfo = response.data.data;

      // Get the first three scores before sorting
      const firstThreeEasyScores = allInfo.scores.easy.slice(0, 3);
      const firstThreeMediumScores = allInfo.scores.medium.slice(0, 3);
      const firstThreeHardScores = allInfo.scores.hard.slice(0, 3);

      // Sort the scores
      const sortedEasyScores = allInfo.scores.easy.sort((a, b) => b - a);
      const sortedMediumScores = allInfo.scores.medium.sort((a, b) => b - a);
      const sortedHardScores = allInfo.scores.hard.sort((a, b) => b - a);

      const userEmail = allInfo.email;
      const userLogin = allInfo.lastLoginDate;
      const userRegistration = allInfo.registerDate;
      const userName = allInfo.userName

      const formatDateTime = (dateString) => {
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', options).replace(',', '');
      };

      setEasyScores(sortedEasyScores);
      setMediumScores(sortedMediumScores);
      setHardScores(sortedHardScores);
      setEmail(userEmail);
      setUsername(userName);
      setLastLogin(formatDateTime(userLogin));
      setRegistration(formatDateTime(userRegistration))
      setUserInfo({
        ...allInfo,
        firstThreeEasyScores,
        firstThreeMediumScores,
        firstThreeHardScores,
        averageEasy: calculateAverage(allInfo.scores.easy),
        averageMedium: calculateAverage(allInfo.scores.medium),
        averageHard: calculateAverage(allInfo.scores.hard),
      });
    } catch (error) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="user-container">
        <div className="ag-format-container">
          <div className="ag-courses_box">
            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  Easy
                </div>

                <div className="ag-courses-item_date-box">
                  Your Best:
                  <span className="ag-courses-item_date">
                    {easyScores.length > 0 ? easyScores[0] : 'N/A'}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Last Three Games:
                  <span className="ag-courses-item_date">
                    {userInfo.firstThreeEasyScores.join(', ') || 'N/A'}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Average Score:
                  <span className="ag-courses-item_date">
                    {userInfo.averageEasy || 'N/A'}
                  </span>
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  Medium
                </div>

                <div className="ag-courses-item_date-box">
                  Your Best:
                  <span className="ag-courses-item_date">
                    {mediumScores.length > 0 ? mediumScores[0] : 'N/A'}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Last Three Games:
                  <span className="ag-courses-item_date">
                    {userInfo.firstThreeMediumScores.join(', ') || 'N/A'}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Average Score:
                  <span className="ag-courses-item_date">
                    {userInfo.averageMedium || 'N/A'}
                  </span>
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  Hard
                </div>
                <div className="ag-courses-item_date-box">
                  Your Best:
                  <span className="ag-courses-item_date">
                    {hardScores.length > 0 ? hardScores[0] : 'N/A'}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Last Three Games:
                  <span className="ag-courses-item_date">
                    {userInfo.firstThreeHardScores.join(', ') || 'N/A'}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Average Score:
                  <span className="ag-courses-item_date">
                    {userInfo.averageHard || 'N/A'}
                  </span>
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  User Details
                </div>

                <div className="ag-courses-item_date-box">
                  Username:
                  <span className="ag-courses-item_date">
                    {username}
                  </span>
                </div>

                <div className="ag-courses-item_date-box">
                  E-mail:
                  <span className="ag-courses-item_date">
                    {email}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Last Login:
                  <span className="ag-courses-item_date">
                    {lastLogin}
                  </span>
                </div>
                <div className="ag-courses-item_date-box">
                  Registration:
                  <span className="ag-courses-item_date">
                    {registration}
                  </span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
