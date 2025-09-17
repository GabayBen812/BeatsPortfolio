if (typeof window !== "undefined") {
	import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }
  
  const FaqHomeOne = () => {
	return (
	  <div className="section-space-md-y">
		<div className="container">
		  <div className="row g-4">
			{/* Left column */}
			<div className="col-lg-6">
			  <div
				className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
				data-cue="fadeIn"
			  >
				<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
				<span className="d-block fw-medium text-light fs-20">FAQ</span>
			  </div>
			  <h2 className="text-light" data-cue="fadeIn">
				Frequently Asked Questions
			  </h2>
			  <p data-cue="fadeIn">
				Everything you need to know about EchoLab – how to upload, share,
				and make the most out of your beats online.
			  </p>
			  <p className="mb-0" data-cue="fadeIn">
				Didn’t find your answer here? Reach out to us and we’ll be happy
				to help.
			  </p>
			</div>
  
			{/* Right column */}
			<div className="col-lg-6">
			  <div className="bg-dark-gradient p-6 p-xl-8 rounded-5">
				<div
				  className="accordion accordion--dark accordion-separate-body accordion--faq"
				  id="faqAccordion"
				  data-cues="fadeIn"
				>
				  {/* Q1 */}
				  <div className="accordion-item">
					<h2 className="accordion-header">
					  <button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#faqAccordion1"
						aria-expanded="true"
						aria-controls="faqAccordion1"
					  >
						How do I start using EchoLab?
					  </button>
					</h2>
					<div
					  id="faqAccordion1"
					  className="accordion-collapse collapse show"
					  data-bs-parent="#faqAccordion"
					>
					  <div className="accordion-body bg-dark">
						Simply sign up for free, upload your beats, and get a
						unique shareable link. No app downloads required.
					  </div>
					</div>
				  </div>
  
				  {/* Q2 */}
				  <div className="accordion-item">
					<h2 className="accordion-header">
					  <button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#faqAccordion2"
						aria-expanded="false"
						aria-controls="faqAccordion2"
					  >
						Who can access my beats?
					  </button>
					</h2>
					<div
					  id="faqAccordion2"
					  className="accordion-collapse collapse"
					  data-bs-parent="#faqAccordion"
					>
					  <div className="accordion-body bg-dark">
						Only people with your private link or code can access
						them. You stay in full control of who listens.
					  </div>
					</div>
				  </div>
  
				  {/* Q3 */}
				  <div className="accordion-item">
					<h2 className="accordion-header">
					  <button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#faqAccordion3"
						aria-expanded="false"
						aria-controls="faqAccordion3"
					  >
						Is there a Premium version?
					  </button>
					</h2>
					<div
					  id="faqAccordion3"
					  className="accordion-collapse collapse"
					  data-bs-parent="#faqAccordion"
					>
					  <div className="accordion-body bg-dark">
						Yes! We’re working on Premium features such as AI BPM &
						key detection, analytics, and advanced tools. For now, the
						Free plan is available.
					  </div>
					</div>
				  </div>
  
				  {/* Q4 */}
				  <div className="accordion-item">
					<h2 className="accordion-header">
					  <button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#faqAccordion4"
						aria-expanded="false"
						aria-controls="faqAccordion4"
					  >
						Can I listen to my beats online?
					  </button>
					</h2>
					<div
					  id="faqAccordion4"
					  className="accordion-collapse collapse"
					  data-bs-parent="#faqAccordion"
					>
					  <div className="accordion-body bg-dark">
						Absolutely. EchoLab includes a clean, modern online player
						so you and your listeners can stream your beats anywhere,
						anytime.
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
			{/* End right column */}
		  </div>
		</div>
	  </div>
	);
  };
  
  export default FaqHomeOne;
  