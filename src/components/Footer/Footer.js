import React from "react";
import { Link } from "react-router-dom";
import { footer } from "../../config/footer";
import { config } from "../../config/main";

const Footer = () => {
	return (
		<footer
			className="page-footer font-small pt-0 bg-primary"
			style={{ marginTop: "-7.6px" }}
		>
			<div className="container">
				<div className="row pt-5 mb-3 text-center d-flex justify-content-center">
					{footer.links.map((link, index) => {
						return (
							<div key={index} className="col-md-2 b-3">
								<h6
									className="title font-weight-bold"
									style={{ color: "white" }}
								>
									<Link to={link.url}>
										<span style={{ color: "white", textDecoration: "none" }}>
											{link.title}
										</span>
									</Link>
								</h6>
							</div>
						);
					})}

					<hr className="rgba-white-light" />
				</div>

				<hr className="clearfix d-md-none rgba-white-light" />

				<div className="row pb-3">
					<div className="col-md-12">
						<div className="mb-5 flex-center">
							{footer.social_links.map((link, index) => {
								return (
									<a key={index} href={link.url}>
										<i
											className={`${link.icon} fa-lg mx-2 white-text mr-md-4`}
										></i>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div
				className="footer-copyright text-center py-3 text-white"
				style={{ background: "rgba(0,0,0,0.5" }}
			>
				<div className="container-fluid">
					© {new Date().getFullYear()} Copyright:
					<a href={config.copyright_url} alt="">
						{" "}
						Ole Petter Kyrkjebø Hjønnevåg{" "}
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
