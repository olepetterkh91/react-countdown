import Navbar from "react-bootstrap/Navbar";
import { config } from "../../config/main";
import { Link } from "react-router-dom";
import { header } from "../../config/header";
function Header() {
	return (
		<Navbar bg="primary" variant="dark" expand="lg">
			<div className="container">
				<Navbar.Brand href="#home">{config.site_title}</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<ul className="navbar-nav mr-auto">
						{header.links.map((link, index) => {
							return (
								<li className="nav-item" key={index}>
									<Link className="nav-link" to={link.url}>
										{link.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
}
export default Header;
