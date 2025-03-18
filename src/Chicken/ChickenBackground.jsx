import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/BackgroundResearch.css";
import "../Styling/HelpContainer.css";
import ScientistSvg from "../assets/Scientist.svg";

function HelpSection() {
  return (
    <div className="help-container">
      <div className="help-icon" title="Need help?">
        ?
      </div>
      <div className="help-popup">
        <div className="help-popup-content">
          <img
            src={ScientistSvg}
            alt="Friendly scientist"
            className="scientist-image-small"
          />
          <h3>Background Research Section</h3>
          <p>
            Here you will find information on the different factors that can
            effect the amount of eggs chickens lay.
          </p>
          <p>
            <strong>
              Use this information to identify the variables you want to explore
              in your experiment.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function ReturnChickenBackgroundResearch() {
  const Navigate = useNavigate();

  const goToChickenVariableIdentification = () => {
    Navigate("/ChickenVariableIdentification");
  };

  const [activeContent, setActiveContent] = useState("content1");
  const [showIntro, setShowIntro] = useState(true);
  const handleIntro = () => {
    setShowIntro(false);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div className="content-section">
            <h2>Presence of Music</h2>
            <p>
              The presence or absence of music can effect chickens' stress
              levels and behavior. Research suggests that auditory stimulation
              can influence poultry physiology, potentially effecting egg
              production. Chickens exposed to calming sounds may have lower
              stress hormones compared to those in noisy or silent environments.
            </p>
            <p>
              Studies have shown that some types of auditory stimulation can
              reduce pecking behavior and aggression among chickens, potentially
              leading to better welfare conditions and more consistent egg
              laying patterns.
            </p>
          </div>
        );
      case "content2":
        return (
          <div className="content-section">
            <h2>Type Of Music</h2>
            <p>
              Different music genres may impact chickens in various ways based
              on their tempo, frequency, and patterns. Classical music with
              steady rhythms tends to have calming effects, while fast-paced or
              erratic music might cause stress. The complexity of sounds in
              different music types may stimulate different behavioral and
              physiological responses in chickens.
            </p>
            <p>
              Some research suggests that chickens respond positively to music
              with similar rhythmic patterns to their natural calls, while harsh
              or unpredictable sounds may cause them to become more alert or
              anxious, potentially affecting their laying behavior.
            </p>
          </div>
        );
      case "content3":
        return (
          <div className="content-section">
            <h2>Volume Level</h2>
            <p>
              The volume at which music is played significantly impacts
              chickens' responses. Excessively loud music (above 80 decibels)
              can cause stress and disrupt normal behaviors, while moderate
              volumes may provide beneficial stimulation. Chickens have
              sensitive hearing and can detect a wide range of frequencies,
              making them responsive to subtle sound variations.
            </p>
            <p>
              Constant exposure to loud noises can lead to physiological stress
              responses in chickens, including increased heart rate and stress
              hormone production, potentially reducing egg-laying efficiency and
              egg quality over time.
            </p>
          </div>
        );
      case "content4":
        return (
          <div className="content-section">
            <h2>Duration Of Music Exposure</h2>
            <p>
              How long chickens are exposed to music each day may affect their
              adaptation and response. Brief exposures might not show
              significant effects, while extended periods allow chickens to
              adjust to the auditory environment. Too much continuous
              stimulation without quiet periods could potentially cause stress
              or habituation where chickens no longer respond to the music.
            </p>
            <p>
              Research suggests that consistent timing of music exposure, such
              as playing music at the same times daily, may be more beneficial
              than random or inconsistent exposure, as it establishes a
              predictable routine that can reduce stress in the flock.
            </p>
          </div>
        );
      case "content5":
        return (
          <div className="content-section">
            <h2>Breed Of Chickens</h2>
            <p>
              Different chicken breeds have varying temperaments, stress
              responses, and baseline egg production levels. Heritage breeds may
              react differently to environmental stimuli compared to commercial
              laying breeds specifically developed for high egg production. Some
              breeds are naturally more nervous or calm, which could influence
              how they respond to auditory stimulation.
            </p>
            <p>
              Commercial layers like Leghorns and ISA Browns are bred for
              consistent egg production and may be less affected by
              environmental variables, while heritage breeds might show more
              pronounced behavioral changes in response to music or other
              stimuli.
            </p>
          </div>
        );
      case "content6":
        return (
          <div className="content-section">
            <h2>Environmental Conditions</h2>
            <p>
              Temperature, lighting, humidity, and housing conditions all
              significantly impact egg production, potentially masking or
              enhancing music's effects. Chickens perform best in comfortable
              temperatures (65-75°F) with 14-16 hours of light daily. Stressful
              environmental conditions could make chickens more or less
              responsive to auditory stimulation depending on their overall
              stress levels.
            </p>
            <p>
              Overcrowded housing can cause stress that might override any
              positive effects from music, while spacious, well-ventilated coops
              allow chickens to express natural behaviors and may enhance their
              receptiveness to environmental enrichment like music.
            </p>
          </div>
        );
      case "content7":
        return (
          <div className="content-section">
            <h2>Diet and Nutrition</h2>
            <p>
              Proper nutrition forms the foundation for egg production
              regardless of other variables. Laying hens require 16-18% protein
              feed with adequate calcium (3.5-4%) for eggshell formation.
              Nutritional deficiencies can override any potential benefits from
              music or other environmental enrichments, as egg production is
              primarily dependent on adequate nutritional resources.
            </p>
            <p>
              Well-nourished chickens may be more responsive to environmental
              enrichment like music because they're not experiencing the stress
              of nutritional deficiencies, allowing them to allocate energy to
              normal behaviors and potentially increased egg production.
            </p>
          </div>
        );
      case "content8":
        return (
          <div className="content-section">
            <h2>Stress Levels</h2>
            <p>
              Chickens under stress typically reduce egg production as their
              bodies prioritize survival over reproduction. Stressors include
              predator threats, handling, new flock members, or environmental
              changes. Music could potentially reduce stress by masking
              startling noises or creating a consistent auditory environment,
              though individual responses vary based on temperament and past
              experiences.
            </p>
            <p>
              Chronic stress causes increased corticosterone (stress hormone)
              levels in chickens, which can suppress reproductive functions.
              Measuring these hormones in blood samples can provide objective
              data on whether music is actually reducing physiological stress in
              hens, beyond just observing behavioral changes.
            </p>
          </div>
        );
      case "content9":
        return (
          <div className="content-section">
            <h2>Age Of Chickens</h2>
            <p>
              A hen's age significantly influences her egg production capacity
              and sensitivity to environmental factors. Young pullets just
              beginning to lay (18-22 weeks) are establishing patterns that
              might be more malleable to influence, while peak-production hens
              (25-35 weeks) naturally lay at their genetic maximum. Older hens
              (beyond 72 weeks) produce fewer eggs and may show different
              responses to environmental enrichment.
            </p>
            <p>
              Aging hens experience normal physiological changes that gradually
              reduce egg production regardless of environmental conditions. This
              natural decline means that any effects of music might be more
              noticeable in younger birds with greater productive potential than
              in older hens already experiencing age-related decreases.
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="main-container">
      <HelpSection />
      {/* Introduction modal overlay */}
      {showIntro && (
        <div className="intro-modal-overlay">
          <div className="intro-modal">
            <div className="scientist-container">
              <img
                src={ScientistSvg}
                alt="Friendly scientist"
                className="scientist-image"
              />
            </div>
            <h2>Welcome back to your Background Research Section!</h2>
            <p>
              Here you will find information on the different factors that can
              affect the amount of eggs chickens lay.
            </p>

            <p>
              <strong>
                Use this information to identify the variables you want to
                explore in your experiment.
              </strong>
            </p>
            <button className="close-intro-button" onClick={handleIntro}>
              Start Experimenting
            </button>
          </div>
        </div>
      )}
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActiveContent("content1")}>
          Presence of Music
        </button>
        <button onClick={() => setActiveContent("content2")}>
          Type Of Music
        </button>
        <button onClick={() => setActiveContent("content3")}>
          Volume Level
        </button>
        <button onClick={() => setActiveContent("content4")}>
          Duration Of Music Exposure
        </button>
        <button onClick={() => setActiveContent("content5")}>
          Breed Of Chicken
        </button>
        <button onClick={() => setActiveContent("content6")}>
          Environmental Conditions
        </button>
        <button onClick={() => setActiveContent("content7")}>
          Diet and Nutrition
        </button>
        <button onClick={() => setActiveContent("content8")}>
          Stress Levels
        </button>
        <button onClick={() => setActiveContent("content9")}>
          Age Of Chickens
        </button>
      </div>

      {/* Content */}
      <div className="content">{renderContent()}</div>

      {/* Text Editor */}
      <div className="text-editor">
        <h3>Notes</h3>
        <textarea
          id="editor"
          placeholder="Write or paste your notes here..."
        ></textarea>
      </div>
      <div className="navigation-buttons">
        <button
          onClick={goToChickenVariableIdentification}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ReturnChickenBackgroundResearch;
