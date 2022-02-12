import { Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import MainPage from './pages/Mainpage';


function App() {
  return (
    <>
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={MainPage} />
    </>
  );
}

export default App;
