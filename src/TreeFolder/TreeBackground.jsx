import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/BackgroundResearch.css";

function ReturnTreeBackgroundReasearch() {
  const Navigate = useNavigate();

  const goToTreeVariableIdentification = () => {
    Navigate("/TreeVariableIdentification");
  };

  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div>
            <h2>Tree Types</h2>
            <p>
              In Ireland, spruce, oak, and birch trees are prominent species
              with important roles in the ecosystem and forestry.
            </p>

            <p>
              Spruce trees, particularly the Sitka spruce, are widely planted in
              Ireland and make up a large portion of the country’s commercial
              forests. Native to the west coast of North America, Sitka spruce
              thrives in Ireland's temperate climate, growing quickly in wet,
              acidic soils. It is prized for timber production, especially for
              construction and paper industries. However, large-scale
              plantations of spruce can lead to monocultures, which may reduce
              biodiversity.
            </p>

            <p>
              Oak trees, such as the native sessile oak, have been integral to
              Irish forests for thousands of years. Known for their durability
              and rich ecological value, oak trees support a wide range of
              wildlife, including birds, insects, and fungi. Oak wood is
              historically significant, being used in shipbuilding and
              furniture, and the tree’s longevity and resilience make it
              symbolic in Irish culture.
            </p>

            <p>
              Birch trees, particularly downy birch and silver birch, are native
              to Ireland and commonly found in woodlands and wetlands. Birch
              trees play a pioneering role in forest regeneration, helping
              establish woodland ecosystems. They grow quickly and provide
              habitat for various insects and birds. The birch’s light wood is
              also valued in craft and furniture making.
            </p>
          </div>
        );
      case "content2":
        return (
          <div>
            <h2>Soil Types</h2>
            <p>
              Spruce, oak, and birch trees each have distinct soil preferences,
              influencing where they thrive best.
            </p>

            <p>
              Spruce trees, particularly Sitka spruce, prefer acidic,
              well-drained soils. They are often found in upland and coastal
              regions where soils are nutrient-poor but retain moisture. In
              commercial forestry, Sitka spruce is grown on peatlands or
              podzolic soils, which are naturally acidic and suited to its rapid
              growth. However, they can also tolerate a range of soil types,
              from sandy loams to shallow soils overlying bedrock, provided the
              drainage is sufficient.
            </p>

            <p>
              Oak trees, especially the native sessile and pedunculate oaks,
              prefer deep, well-drained soils that are rich in nutrients. They
              thrive in loamy or clay soils that retain moisture but don’t
              become waterlogged. Sessile oak tends to grow in upland areas with
              acidic, shallow soils, while pedunculate oak favors lowland areas
              with deeper, richer soils, often along river valleys where
              alluvial deposits provide fertile ground.
            </p>

            <p>
              Birch trees, including downy and silver birch, are more adaptable
              to a variety of soils. They can grow in both nutrient-poor and
              rich soils but often establish themselves in wet, acidic
              conditions. Downy birch is more tolerant of waterlogged soils,
              thriving in boggy or poorly drained areas, while silver birch
              prefers lighter, sandy or well-drained soils. Both are pioneering
              species, often the first to colonize disturbed or degraded land.
            </p>
          </div>
        );
      case "content3":
        return (
          <div>
            <h2>Water Availability</h2>
            <p>
              Water availability plays a crucial role in the growth and health
              of spruce, oak, and birch trees, as each species has specific
              requirements.
            </p>

            <p>
              Spruce trees, especially Sitka spruce, prefer environments with
              high moisture availability. They are commonly found in regions
              with abundant rainfall and can tolerate wetter conditions better
              than many other tree species. Sitka spruce thrives in areas where
              the soil retains moisture but remains well-drained, as they do not
              do well in areas prone to waterlogging. While they need a
              consistent water supply, they can adapt to drier conditions
              temporarily, though prolonged drought can stress them.
            </p>

            <p>
              Oak trees, particularly sessile and pedunculate oaks, require
              moderate water availability. They prefer well-drained soils and
              can tolerate short periods of drought once established, but
              excessive moisture or waterlogged conditions can negatively affect
              their growth. Sessile oak, often found in upland areas, is more
              tolerant of lower water availability compared to pedunculate oak,
              which thrives in fertile, moisture-retaining lowland soils,
              especially near rivers and wetlands where water is plentiful.
            </p>

            <p>
              Birch trees, especially downy and silver birch, are highly
              adaptable in terms of water needs. Downy birch is more suited to
              wetter conditions, thriving in bogs, wetlands, and areas with poor
              drainage. Silver birch prefers well-drained soils but can tolerate
              both dry and moist conditions. Both species can quickly establish
              in a range of moisture environments, making them important pioneer
              species in forest regeneration.
            </p>
          </div>
        );
      case "content4":
        return (
          <div>
            <h2>Sunlight Exposure</h2>
            <p>
              Sunlight exposure is a key factor influencing the growth of
              spruce, oak, and birch trees, with each species having different
              light requirements.
            </p>

            <p>
              Spruce trees, such as Sitka spruce, thrive in partial to full
              sunlight, but they are also quite shade-tolerant in their early
              stages. This adaptability allows spruce seedlings to establish in
              shaded environments beneath a forest canopy. However, for optimal
              growth, mature spruce trees require full sunlight. In commercial
              forestry, they are often planted in open areas to maximize
              sunlight exposure and growth rates. In dense forests, they may
              dominate due to their ability to grow under shaded conditions
              before outcompeting other species for light.
            </p>

            <p>
              Oak trees, including sessile and pedunculate oaks, prefer full
              sunlight and tend to grow best in open environments. Oaks are
              light-demanding and are typically found in sunny, exposed areas
              such as woodlands, pastures, and along riverbanks. Young oaks can
              tolerate some shade, but as they grow, they need ample sunlight to
              reach their full height and potential. Sunlight is essential for
              their deep-rooted growth and production of strong, durable wood.
            </p>

            <p>
              Birch trees, particularly silver birch and downy birch, are
              pioneer species that favor full sunlight. They are fast-growing
              trees that thrive in open spaces with plenty of light, often
              colonizing disturbed or cleared land. Birch trees need ample
              sunlight for rapid growth, and they are less shade-tolerant than
              spruce or oak, making them more prominent in areas with abundant
              sunlight exposure.
            </p>
          </div>
        );
      case "content5":
        return (
          <div>
            <h2>Temperature</h2>
            <p>
              Spruce, a cold-adapted conifer species, thrives in cooler
              climates. Warmer temperatures can negatively impact their growth
              by increasing respiration rates, which can exceed the rate of
              photosynthesis, reducing net energy for growth. Additionally,
              higher temperatures can lead to drought stress, particularly in
              areas where water availability is limited, further stunting spruce
              growth.
            </p>

            <p>
              Birch trees, common in temperate and boreal regions, are
              moderately tolerant of warmer temperatures. However, excessive
              heat can disrupt their growth by reducing moisture availability
              and increasing susceptibility to diseases and pests. In warmer
              climates, birch trees may exhibit faster growth initially, but
              prolonged exposure to high temperatures can cause water stress and
              reduce their lifespan.
            </p>

            <p>
              Oak trees are more heat-tolerant than spruce and birch, thriving
              in both temperate and warmer regions. Higher temperatures can
              promote growth in oak trees, especially when coupled with
              sufficient water supply. However, extreme heat and drought
              conditions can lead to stress, reducing acorn production and
              slowing growth rates.
            </p>

            <p>
              In summary, while each species responds differently, temperature
              extremes—both high and low—can significantly affect their growth,
              often limiting their resilience and survival under climate change.
            </p>
          </div>
        );
      case "content6":
        return (
          <div>
            <h2>Nutrient Levels</h2>
            <p>
              Nutrient availability significantly affects the growth and
              development of spruce, birch, and oak trees, as these nutrients
              are essential for various physiological processes.
            </p>

            <p>
              Spruce trees require nutrient-rich soils, especially for nitrogen,
              to support their slow but steady growth. In nutrient-poor soils,
              spruce growth can be severely stunted, as these trees have a lower
              ability to adapt to nutrient deficiencies. However, they can
              tolerate acidic soils better than some other species. Increased
              nutrient levels, particularly nitrogen, can boost their growth,
              but excessive nutrients may make them more susceptible to diseases
              and pests.
            </p>

            <p>
              Birch trees are more adaptable to different soil conditions, but
              they grow best in nutrient-rich soils. Adequate levels of
              nitrogen, phosphorus, and potassium are crucial for their fast
              growth rate, especially in their early years. Birch trees often
              colonize disturbed soils and can manage in nutrient-poor
              environments, but without sufficient nutrients, they will exhibit
              reduced height, thinner canopies, and lower resistance to
              environmental stressors.
            </p>

            <p>
              Oaks are relatively hardy and can grow in both nutrient-rich and
              poorer soils. However, nutrient levels still influence their
              growth. In nutrient-rich environments, oak trees show robust
              growth, with larger canopies and greater acorn production. In
              nutrient-deficient soils, growth is slower, and oaks may
              prioritize root development over above-ground biomass to better
              access limited resources.
            </p>

            <p>
              Overall, adequate nutrient levels are essential for optimal growth
              across these species, influencing their health, vigor, and ability
              to cope with environmental stresses.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActiveContent("content1")}>Tree Types</button>
        <button onClick={() => setActiveContent("content2")}>Soil Types</button>
        <button onClick={() => setActiveContent("content3")}>
          Water Availability
        </button>
        <button onClick={() => setActiveContent("content4")}>
          Sunlight Exposure
        </button>
        <button onClick={() => setActiveContent("content5")}>
          Temperature
        </button>
        <button onClick={() => setActiveContent("content6")}>
          Nutrient Levels
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
      <div>
        <button onClick={goToTreeVariableIdentification}>Next</button>
      </div>
    </div>
  );
}

export default ReturnTreeBackgroundReasearch;
