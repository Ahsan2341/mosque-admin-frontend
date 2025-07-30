import AppRouter from "./Components/Routes/AppRouter";
import "./App.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer/>
        <AppRouter />
      
    </>
  );
}

export default App;
