
import LoginPage from "./components/login";
import {Routes, Route} from 'react-router';
import SignPage from "./components/signup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="signup" element={<SignPage/>}/>
    </Routes>
  );
}

export default App;
