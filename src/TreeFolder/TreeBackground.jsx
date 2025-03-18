import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScientistSvg from "../assets/Scientist.svg";
import "../Styling/HelpContainer.css";

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
            effect tree growth.
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

function ReturnTreeBackgroundReasearch() {
  const Navigate = useNavigate();

  const goToTreeVariableIdentification = () => {
    Navigate("/TreeVariableIdentification");
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
            <h2>Soil pH</h2>
            <p>
              Soil pH measures how acidic or alkaline soil is, on a scale from
              0-14. Most trees prefer slightly acidic soil (pH 5.5-6.5). When pH
              is too high or too low, trees struggle to absorb nutrients even
              when they're present in the soil. Different tree species have
              evolved to thrive in specific pH ranges, so matching the right
              tree to your soil is important.
            </p>
          </div>
        );
      case "content2":
        return (
          <div className="content-section">
            <h2>Water Availability</h2>
            <p>
              Trees need water for photosynthesis (growth), nutrient transport,
              and cooling. Without enough water, trees close their leaf pores
              (stomata) to prevent water loss, which also stops carbon dioxide
              intake needed for growth. Too much water can suffocate roots by
              displacing oxygen in the soil. Trees have different water needs
              based on their native habitats.
            </p>
          </div>
        );
      case "content3":
        return (
          <div className="content-section">
            <h2>Sunlight Exposure</h2>
            <p>
              Sunlight provides the energy trees use for photosynthesis to
              create food. More sunlight typically means more potential growth,
              but each species has evolved for specific light conditions.
              'Shade-tolerant' trees can photosynthesize efficiently in low
              light, while 'sun-loving' trees need full exposure to reach their
              potential but may burn in intense sunlight.
            </p>
          </div>
        );
      case "content4":
        return (
          <div className="content-section">
            <h2>Temperature</h2>
            <p>
              Temperature affects the rate of photosynthesis and other metabolic
              processes in trees. Each species has an optimal temperature range
              for growth. Extremely high temperatures can damage leaf tissues
              and cause water stress, while freezing temperatures can damage
              cells by forming ice crystals. Seasonal temperature changes
              trigger important processes like dormancy and leaf drop.
            </p>
          </div>
        );
      case "content5":
        return (
          <div className="content-section">
            <h2>Nutrient Levels</h2>
            <p>
              Trees need macronutrients (nitrogen, phosphorus, potassium) and
              micronutrients (iron, zinc, etc.) for various functions. Nitrogen
              promotes leaf growth, phosphorus supports root development and
              energy transfer, and potassium helps with water regulation and
              disease resistance. Deficiencies show up as discolored leaves,
              stunted growth, or unusual patterns of dieback.
            </p>
          </div>
        );
      case "content6":
        return (
          <div className="content-section">
            <h2>Time of Day Watering Occurs</h2>
            <p>
              Morning watering gives trees time to absorb water before the day's
              heat causes evaporation. Evening watering can promote fungal
              growth as leaves stay wet overnight. Midday watering may waste
              water through evaporation. The timing affects how efficiently
              trees can use water and whether they develop certain diseases.
            </p>
          </div>
        );
      case "content7":
        return (
          <div className="content-section">
            <h2>Wind Exposure</h2>
            <p>
              Wind increases water loss from leaves through evaporation,
              potentially causing drought stress. Strong winds can damage
              branches and leaves directly. However, gentle wind movement
              strengthens stems through a process called thigmomorphogenesis.
              Trees in windy areas often develop more extensive root systems and
              shorter, stronger trunks.
            </p>
            <p>
              Trees grown in protected environments with little wind tend to
              develop weaker wood and may be more susceptible to breakage when
              eventually exposed to strong winds. Consistent wind from one
              direction can cause trees to grow asymmetrically, with more
              branches on the leeward side.
            </p>
          </div>
        );
      case "content8":
        return (
          <div className="content-section">
            <h2>Closeness to Roads & Noisy Areas</h2>
            <p>
              Roads affect trees through soil compaction, salt spray from winter
              road treatments, pollution from vehicles, and heat reflected from
              pavement. Noise itself doesn't directly affect tree growth, but
              areas with noise often have other urban stressors. Vibration from
              heavy traffic can compact soil and damage fine root hairs.
            </p>
            <p>
              Trees near roads often face multiple stresses simultaneously:
              limited root space, increased heat from pavement, exposure to
              pollutants, and physical damage from vehicles or maintenance
              equipment. These combined stresses typically result in shorter
              lifespans for roadside trees compared to those in more natural
              settings.
            </p>
          </div>
        );
      case "content9":
        return (
          <div className="content-section">
            <h2>Orientation of Tree</h2>
            <p>
              The direction a tree faces affects how much sunlight it receives
              throughout the day. In the Northern Hemisphere, south-facing trees
              get more direct sunlight than north-facing ones. East-facing trees
              receive morning sun but afternoon shade, while west-facing trees
              experience the opposite pattern. This affects temperature, water
              needs, and growth rates.
            </p>
            <p>
              Trees on south-facing slopes tend to experience warmer, drier
              conditions and may face more drought stress. North-facing slopes
              typically retain more moisture but receive less direct sunlight.
              These differences create microclimates that can significantly
              influence which tree species thrive in a particular location.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
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
            <h2>Welcome to your Background Research!</h2>
            <p>
              Here you will find information on the different factors that can
              affect tree growth.
            </p>

            <p>
              <strong>
                Use this information to identify the variables you want to
                explore in your experiment.
              </strong>
            </p>
            <button className="close-intro-button" onClick={handleIntro}>
              Start Researching
            </button>
          </div>
        </div>
      )}
      <HelpSection />
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActiveContent("content1")}>Soil pH</button>
        <button onClick={() => setActiveContent("content2")}>
          Water Availability
        </button>
        <button onClick={() => setActiveContent("content3")}>
          Sunlight Exposure
        </button>
        <button onClick={() => setActiveContent("content4")}>
          Temperature
        </button>
        <button onClick={() => setActiveContent("content5")}>
          Nutrient Levels
        </button>
        <button onClick={() => setActiveContent("content6")}>
          Time of Day Watering Occurs
        </button>
        <button onClick={() => setActiveContent("content7")}>
          Wind Exposure
        </button>
        <button onClick={() => setActiveContent("content8")}>
          Closeness to Roads & Noisy Areas
        </button>
        <button onClick={() => setActiveContent("content9")}>
          Tree Orientation
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
          onClick={goToTreeVariableIdentification}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ReturnTreeBackgroundReasearch;
