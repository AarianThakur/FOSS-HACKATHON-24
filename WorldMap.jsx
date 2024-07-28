import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import axios from "axios";
import moment from "moment-timezone";
import worldMap from "./world-50m.json"; // Make sure to have a world map TopoJSON file

const WorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = async (geo, event) => {
    const countryName = geo.properties.NAME;
    const centroid = geoCentroid(geo);
    const [lng, lat] = centroid;

    // You can use a timezone API to get the timezone for the coordinates
    // For simplicity, let's assume we have an endpoint that returns the timezone based on coordinates
    const timezone = await getTimezone(lat, lng);
    const currentTime = moment.tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    setTooltipContent(`${countryName}: ${currentTime}`);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const getTimezone = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=json&by=position&lat=${lat}&lng=${lng}`
      );
      return response.data.zoneName;
    } catch (error) {
      console.error("Error fetching timezone", error);
      return "UTC";
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <ComposableMap>
        <Geographies geography={worldMap}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseMove={(event) => handleMouseMove(geo, event)}
                onMouseLeave={handleMouseLeave}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: "absolute",
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
