import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import "./assets/scss/common.scss";
import "./assets/scss/_abstracts.scss";

import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {
  return (
    <Dashboard />
  );
};

export default App
