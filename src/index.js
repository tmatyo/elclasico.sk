import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { onLCP, onINP, onCLS } from "web-vitals";

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
