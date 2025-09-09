import { Route, Routes } from 'react-router-dom';
import { CustomersDashboard } from './pages/CustomersDashboard';
import { UserPage } from './pages/CustomerPage';

function App() {
  return (
    <div className="p-6 bg-white">
      <Routes>
        <Route path="/" element={<CustomersDashboard />} />
        <Route path="/users/:userId" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
