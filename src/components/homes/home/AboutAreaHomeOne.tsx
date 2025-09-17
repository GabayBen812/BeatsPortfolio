const AboutAreaHomeOne = () => {
	return (
		<div className="section-space-md-y">
			<div className="container">
				<div className="row g-4 justify-content-xxl-between align-items-center">
					{/* Left: Image */}
					<div className="col-lg-6 col-xxl-5">
						<img
							src="assets/img/about-img-4.png"
							alt="EchoLab preview"
							className="img-fluid rounded-4 shadow"
							data-cue="slideInUp"
						/>
					</div>

					{/* Right: Content */}
					<div className="col-lg-6">
						<div
							className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
							data-cue="fadeIn"
						>
							<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
							<span className="d-block fw-medium text-light fs-20">
								About EchoLab
							</span>
						</div>

						<h2 className="text-light mt-3" data-cue="fadeIn">
							A Modern Platform for Music Producers
						</h2>

						<p className="text-light mb-8 max-text-11" data-cue="fadeIn">
							EchoLab makes it effortless to showcase and share your beats online. 
							No apps to install, no friction – just a clean, professional way 
							to let people listen, preview, and connect with you directly.
						</p>

						<ul className="list gap-6" data-cues="fadeIn">
							<li className="d-flex align-items-center gap-4">
								<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
									<i className="bi bi-music-note-beamed"></i>
								</span>
								<span className="d-block flex-grow-1 fw-medium text-light">
									Share beats with a simple link – no apps required
								</span>
							</li>
							<li className="d-flex align-items-center gap-4">
								<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
									<i className="bi bi-lock"></i>
								</span>
								<span className="d-block flex-grow-1 fw-medium text-light">
									Private access via invite-only links or codes
								</span>
							</li>
							<li className="d-flex align-items-center gap-4">
								<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
									<i className="bi bi-graph-up"></i>
								</span>
								<span className="d-block flex-grow-1 fw-medium text-light">
									Automatic BPM & key detection powered by AI
								</span>
							</li>
							<li className="d-flex align-items-center gap-4">
								<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
									<i className="bi bi-play-circle"></i>
								</span>
								<span className="d-block flex-grow-1 fw-medium text-light">
									Play and preview your full beat catalog online
								</span>
							</li>
							<li className="d-flex align-items-center gap-4">
								<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
									<i className="bi bi-palette"></i>
								</span>
								<span className="d-block flex-grow-1 fw-medium text-light">
									Designed to look clean, aesthetic, and professional
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutAreaHomeOne;
