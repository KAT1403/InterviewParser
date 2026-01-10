import { useState } from 'react';
import { authApi, interviewApi, analyticsApi } from '@/shared/api';

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [test, settest] = useState({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  const testRegister = async () => {
    setLoading(true);
    try {
      const result = await authApi.register(test);
      console.log('Registration successful:', result);
      setIsLoggedIn(true);
      setData(result);
    } catch (error) {
      console.error('Registration Error:', error);
      setData({ error: 'Registration failed', details: error });
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await authApi.login({
        email: test.email,
        password: test.password
      });
      console.log('Login successful:', result);
      setIsLoggedIn(true);
      setData(result);
    } catch (error) {
      console.error('Login Error:', error);
      setData({ error: 'Login failed', details: error });
    } finally {
      setLoading(false);
    }
  };

  const testApi = async () => {
    setLoading(true);
    try {
      const interviews = await interviewApi.getInterviews();
      const mockInterviews = await interviewApi.getMockInterviews();
      const globalAnalytics = await analyticsApi.getGlobalAnalytics();
      
      console.log('Interviews:', interviews);
      console.log('Mock Interviews:', mockInterviews);
      console.log('Global Analytics:', globalAnalytics);
      
      setData({
        interviews,
        mockInterviews,
        globalAnalytics
      });
    } catch (error) {
      console.error('API Error:', error);
      setData({ error: 'API call failed', details: error });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setIsLoggedIn(false);
    setData(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>БЕБЕБЕББЕБЕБЕББЕ</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>test:</h3>
        <input 
          type="text" 
          placeholder="Name" 
          value={test.name}
          onChange={(e) => settest({...test, name: e.target.value})}
          style={{ margin: '5px', padding: '5px' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={test.email}
          onChange={(e) => settest({...test, email: e.target.value})}
          style={{ margin: '5px', padding: '5px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={test.password}
          onChange={(e) => settest({...test, password: e.target.value})}
          style={{ margin: '5px', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={testRegister} disabled={loading} style={{ margin: '5px' }}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        <button onClick={testLogin} disabled={loading} style={{ margin: '5px' }}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {isLoggedIn && (
          <>
            <button onClick={testApi} disabled={loading} style={{ margin: '5px' }}>
              {loading ? 'Loading...' : 'Test API'}
            </button>
            <button onClick={logout} style={{ margin: '5px' }}>
              Logout
            </button>
          </>
        )}
      </div>

      <div>
        <strong>Status:</strong> {isLoggedIn ? 'Logged In' : 'Not Logged In'}
      </div>

      {data && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
