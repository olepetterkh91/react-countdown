import "./App.css";

import Header from "./components/Header/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
