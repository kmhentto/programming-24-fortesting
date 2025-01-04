import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        {/* Your main content */}
      </div>
    </Router>
  );
}
