import "./HomepageStyle.css";

import React from "react";

function MicroworldDescription() {
  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            <strong>Stage 1: Background Research</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body">
            <strong>
              During Stage 1: Background Research you are expected to:
            </strong>
            <ul>
              <li>
                <strong>Research: </strong>Read the background information for
                the experiment.
              </li>
              <li>
                <strong>Record: </strong>Take down information that you think
                will be important when you are conducting your experiment.
              </li>
              <li>
                <strong>Remember: </strong>Try your best to remember the
                relevant information to be used in the experiment. Don't worry
                you will still be able to access this information throughout the
                experiment process.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            <strong>Stage 2: Variable Identification</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            Add here an easily understandable description of what needs to be
            carried out in stage 2.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            <strong>Stage 3: Hypothesis Formation</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            Add here an easily understandable description of what needs to be
            carried out in stage 3.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFour"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFour"
          >
            <strong>Stage 4: Experimentation</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFour"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            Add here an easily understandable description of what needs to be
            carried out in stage 4.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFive"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFive"
          >
            <strong>Stage 5: Results</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFive"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            Add here an easily understandable description of what needs to be
            carried out in stage 5.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseSix"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseSix"
          >
            <strong>Stage 6: Conclusion</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseSix"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            Add here an easily understandable description of what needs to be
            carried out in stage 6.
          </div>
        </div>
      </div>
    </div>
  );
}

export default MicroworldDescription;
