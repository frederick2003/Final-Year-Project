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
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseOne"
          >
            <strong>Stage 1: Background Research</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse"
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
                <strong>Identify: </strong> Use the information given to
                Identify variables you would like to test during your
                experiment.
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
            <strong>
              During Stage 2: Variable Identification you are expected to:
            </strong>
            <ul>
              <li>
                <strong>Identify: </strong>Determine which factors (variables)
                in your experiment can change or affect the outcome.
              </li>
              <li>
                <strong>Classify: </strong>Distinguish between independent
                variables (what you change), dependent variables (what you
                measure), and controlled variables (what you keep the same).
              </li>
              <li>
                <strong>Select: </strong>Choose which variables you will focus
                on in your experiment.
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
            <strong>
              During Stage 3: Hypothesis Formation you are expected to:
            </strong>
            <ul>
              <li>
                <strong>Formulate: </strong>Create a testable hypothesis that
                predicts the relationship between your variables.
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
            <strong>
              During Stage 4: Experimentation you are expected to:
            </strong>
            <ul>
              <li>
                <strong>Plan: </strong>Design your experiment to test your
                hypothesis.
              </li>
              <li>
                <strong>Document: </strong>Record all your observations and
                results.
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
            data-bs-target="#panelsStayOpen-collapseFive"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFive"
          >
            <strong>Stage 5: Results and Conclusion</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFive"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            <strong>During Stage 5: Results you are expected to:</strong>
            <ul>
              <li>
                <strong>Analyze: </strong>Break down the data and try to
                understand trends.
              </li>
              <li>
                <strong>Interpret: </strong>Understand your results and compare
                them to your hypothesis.
              </li>
              <li>
                <strong>Conclude: </strong>Determine what conlcusions can be
                made based on your results and hypothesis.
              </li>
              <li>
                <strong>Publish: </strong>publish your results in a scientific
                paper so others can use your work in the future.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MicroworldDescription;
