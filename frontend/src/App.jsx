import { Outlet} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      

      {/* Nested routes will render here */}
      <Outlet />
    </>
  );
}

export default App;
