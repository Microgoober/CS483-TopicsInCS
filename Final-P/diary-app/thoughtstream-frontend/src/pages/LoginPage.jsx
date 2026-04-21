import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './LoginPage.css';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      
      const response = await api.post('/auth/google', { idToken });
      
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Google login failed');
    alert('Google login failed. Please try again.');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>📔 ThoughtStream</h1>
          <p>Reflect, Record, Remember</p>
        </div>
        
        <div className="login-description">
          <p>Your personal digital diary for capturing thoughts,</p>
          <p>reflections, and memorable moments.</p>
        </div>
        
        <div className="login-features">
          <div className="feature">
            <span>✍️</span>
            <span>Write your daily entries</span>
          </div>
          <div className="feature">
            <span>🌤️</span>
            <span>Track weather with each entry</span>
          </div>
          <div className="feature">
            <span>🔒</span>
            <span>Secure and private</span>
          </div>
        </div>
        
        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            shape="rectangular"
            text="continue_with"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;