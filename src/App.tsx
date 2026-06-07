import { AppRoutes } from "./router/app-router";
import { Header } from "./common-app";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
