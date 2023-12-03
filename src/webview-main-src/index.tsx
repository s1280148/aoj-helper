import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import "./settings/i18n/config";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
