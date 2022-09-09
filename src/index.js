import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CanvasProvider } from "./context/canvas";
import { GlobalStyles } from 'twin.macro'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CanvasProvider>
			<GlobalStyles />
			<App />
		</CanvasProvider>
	</React.StrictMode>
)
