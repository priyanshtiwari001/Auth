
import LoginPage from "./components/LoginPage";
import {Routes, Route} from 'react-router';
import SignupPage from "./components/SignupPage";
import User from "./components/User";

function App() {

  return (
    <Routes>
      <Route path="/dashboard" element={<User/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
    </Routes>
  );
}

export default App;
