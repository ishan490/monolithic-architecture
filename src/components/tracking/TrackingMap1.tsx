import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  Circle,
  Rectangle,
  useMap,
} from "react-leaflet";

import {
  OpenStreetMapProvider,
} from "leaflet-geosearch";

import "../../lib/leaflet";
import { riders } from "./data";

import MarkerClusterGroup from "react-leaflet-cluster";

import L from "leaflet";

import "../../styles/cluster.css";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-geosearch/dist/geosearch.css";

import RoutingMachine from "../maps/RoutingMachine";

type LatLngTuple = [number, number];

const provider = new OpenStreetMapProvider();

// Route Polyline
const routePositions: LatLngTuple[] = [
  [23.0225, 72.5714],
  [23.0325, 72.5814],
  [23.0425, 72.5914],
];

// Polygon Area
const polygonPositions: LatLngTuple[] = [
  [23.015, 72.56],
  [23.025, 72.58],
  [23.01, 72.6],
];

// Rectangle Bounds
const rectangleBounds: [LatLngTuple, LatLngTuple] = [
  [23.005, 72.55],
  [23.04, 72.61],
];

// Move map automatically
function ChangeMapView({
  center,
}: {
  center: LatLngTuple;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 14, {
      animate: true,
    });
  }, [center, map]);

  return null;
}

export default function TrackingMap() {
  // CURRENT LOCATION
  const [currentLocation, setCurrentLocation] =
    useState<LatLngTuple>([
      23.0225,
      72.5714,
    ]);

  // START & END ROUTE
  const [start, setStart] =
    useState<LatLngTuple>([
      23.0225,
      72.5714,
    ]);

  const [end, setEnd] =
    useState<LatLngTuple>([
      23.0325,
      72.5814,
    ]);

  // SEARCH INPUTS
  const [startText, setStartText] =
    useState("");

  const [endText, setEndText] =
    useState("");

  // MODAL
  const [openSearch, setOpenSearch] =
    useState(false);

  // GET USER LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: LatLngTuple = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setCurrentLocation(location);
        setStart(location);
      },
      (error) => {
        console.error(
          "Location error:",
          error
        );
      }
    );
  }, []);

  // SEARCH START
  const searchStart = async () => {
    if (!startText) return;

    const results =
      await provider.search({
        query: startText,
      });

    if (results.length > 0) {
      setStart([
        Number(results[0].y),
        Number(results[0].x),
      ]);
    }
  };

  // SEARCH END
  const searchEnd = async () => {
    if (!endText) return;

    const results =
      await provider.search({
        query: endText,
      });

    if (results.length > 0) {
      setEnd([
        Number(results[0].y),
        Number(results[0].x),
      ]);
    }
  };

  // CREATE ROUTE
  const handleCreateRoute =
    async () => {
      await searchStart();
      await searchEnd();

      setOpenSearch(false);
    };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* HEADER */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Advanced Tracking Map
          </h2>

          {/* OPEN SEARCH BUTTON */}
          <button
            onClick={() =>
              setOpenSearch(true)
            }
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-lg
              transition
              hover:scale-105
              hover:bg-blue-700
            "
          >
            Search Route
          </button>
        </div>
      </div>

      {/* MAP WRAPPER */}
      <div className="relative h-[700px] w-full overflow-hidden rounded-b-2xl">

        {/* SEARCH MODAL */}
        {openSearch && (
          <div
            className="
              absolute
              inset-0
              z-[2000]

              flex
              items-center
              justify-center

              bg-black/40
              backdrop-blur-sm
            "
          >
            <div
              className="
                w-[450px]
                rounded-3xl
                bg-white
                p-6
                shadow-2xl
                dark:bg-gray-900
              "
            >
              {/* MODAL HEADER */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Search Route
                </h2>

                <button
                  onClick={() =>
                    setOpenSearch(false)
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-lg
                    transition
                    hover:bg-gray-200
                    dark:bg-gray-800
                  "
                >
                  ✕
                </button>
              </div>

              {/* START LOCATION */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium">
                  Start Location
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={startText}
                    onChange={(e) =>
                      setStartText(
                        e.target.value
                      )
                    }
                    placeholder="Ahmedabad"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-300
                      px-4
                      py-4
                      outline-none
                      transition
                      focus:border-blue-500
                    "
                  />

                  <button
                    onClick={searchStart}
                    className="
                      rounded-2xl
                      bg-blue-500
                      px-5
                      text-white
                      transition
                      hover:bg-blue-600
                    "
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* DESTINATION */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  Destination
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={endText}
                    onChange={(e) =>
                      setEndText(
                        e.target.value
                      )
                    }
                    placeholder="Surat"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-300
                      px-4
                      py-4
                      outline-none
                      transition
                      focus:border-green-500
                    "
                  />

                  <button
                    onClick={searchEnd}
                    className="
                      rounded-2xl
                      bg-green-500
                      px-5
                      text-white
                      transition
                      hover:bg-green-600
                    "
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <button
                  onClick={
                    handleCreateRoute
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-blue-600
                    py-4
                    text-lg
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Create Route
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAP */}
        <MapContainer
          center={currentLocation}
          zoom={13}
          className="z-0 h-full w-full"

          // INTERACTIONS
          dragging
          inertia
          scrollWheelZoom
          doubleClickZoom
          touchZoom
          boxZoom
          keyboard
          zoomControl

          // ANIMATIONS
          zoomAnimation
          fadeAnimation
          markerZoomAnimation
        >
          {/* AUTO MOVE MAP */}
          <ChangeMapView center={start} />

          {/* TILE LAYER */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* ROUTING */}
          <RoutingMachine
            start={start}
            end={end}
          />

          {/* CURRENT LOCATION */}
          <Marker position={currentLocation}>
            <Popup>
              <div>
                <h4 className="font-semibold">
                  My Location
                </h4>

                <p>You are here</p>
              </div>
            </Popup>
          </Marker>

          {/* START MARKER */}
          <Marker position={start}>
            <Popup>
              <div>
                <h4 className="font-semibold">
                  Start Location
                </h4>

                <p>
                  {startText ||
                    "Selected Start"}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* END MARKER */}
          <Marker position={end}>
            <Popup>
              <div>
                <h4 className="font-semibold">
                  Destination
                </h4>

                <p>
                  {endText ||
                    "Selected Destination"}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* RIDER CLUSTER */}
          <MarkerClusterGroup
            chunkedLoading
            spiderfyOnMaxZoom
            showCoverageOnHover
            zoomToBoundsOnClick
            animate
            iconCreateFunction={(
              cluster: any
            ) => {
              return L.divIcon({
                html: `
                  <div>
                    ${cluster.getChildCount()}
                  </div>
                `,
                className:
                  "custom-cluster",
                iconSize: L.point(
                  40,
                  40,
                  true
                ),
              });
            }}
          >
            {riders.map((rider) => (
              <Marker
                key={rider.id}
                position={[
                  rider.lat,
                  rider.lng,
                ]}
              >
                <Popup>
                  <div>
                    <h4 className="font-semibold">
                      {rider.name}
                    </h4>

                    <p>
                      {rider.status}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {/* POLYLINE */}
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "blue",
              weight: 5,
            }}
          />

          {/* POLYGON */}
          <Polygon
            positions={
              polygonPositions
            }
            pathOptions={{
              color: "green",
            }}
          >
            <Popup>
              Delivery Zone
            </Popup>
          </Polygon>

          {/* CIRCLE */}
          <Circle
            center={currentLocation}
            radius={1000}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.2,
            }}
          >
            <Popup>
              1KM Radius
            </Popup>
          </Circle>

          {/* RECTANGLE */}
          <Rectangle
            bounds={rectangleBounds}
            pathOptions={{
              color: "purple",
            }}
          >
            <Popup>
              Restricted Area
            </Popup>
          </Rectangle>
        </MapContainer>
      </div>
    </div>
  );
}