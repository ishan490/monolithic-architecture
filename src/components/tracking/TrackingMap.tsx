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

import "../../lib/leaflet";
import { calculateDistance, riders } from "./data";

import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

import "../../styles/cluster.css";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import RoutingMachine from "../maps/RoutingMachine";

import MapSearch from "../maps/MapSearch";

type LatLngTuple = [number, number];

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
    map.setView(center, 14);
  }, [center, map]);

  return null;
}

export default function TrackingMap() {
  const [currentLocation, setCurrentLocation] =
    useState<LatLngTuple>([23.0225, 72.5714]);

  // Search Modal
  const [showSearchModal, setShowSearchModal] =
    useState(false);

  // Route State
  const [startLocation, setStartLocation] =
    useState<LatLngTuple | null>(null);

  const [endLocation, setEndLocation] =
    useState<LatLngTuple | null>(null);

  // Labels
  const [startLabel, setStartLabel] =
    useState("");

  const [endLabel, setEndLabel] =
    useState("");

  // Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: LatLngTuple = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setCurrentLocation(newLocation);
      },
      (error) => {
        console.error("Location error:", error);
      }
    );
  }, []);


  const routeDistance =
    startLocation && endLocation
      ? calculateDistance(
        startLocation,
        endLocation
      )
      : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Advanced Tracking Map
        </h2>

       <div className="flex items-center gap-3">
  {/* Search Route */}
  <button
    onClick={() =>
      setShowSearchModal(true)
    }
    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
  >
    Search Route
  </button>

  {/* Clear Route */}
  <button
    onClick={() => {
      setStartLocation(null);
      setEndLocation(null);

      setStartLabel("");
      setEndLabel("");
    }}
    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
  >
    Clear Route
  </button>
</div>
      </div>

      {/* Map Wrapper */}
      <div className="relative h-[700px] w-full overflow-hidden rounded-b-2xl">

        {/* SEARCH MODAL */}
        {showSearchModal && (
          <div className="absolute left-1/2 top-5 z-[9999] w-[450px] -translate-x-1/2 rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900">

            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Search Route
              </h2>

              <button
                onClick={() =>
                  setShowSearchModal(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-white"
              >
                ✕
              </button>
            </div>

            {/* Start */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Location
              </label>

              <MapSearch
                placeholder="Search start location..."
                onSelect={(
                  lat,
                  lng,
                  label
                ) => {
                  setStartLocation([
                    lat,
                    lng,
                  ]);

                  setStartLabel(label);
                }}
              />
            </div>

            {/* Destination */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Destination
              </label>

              <MapSearch
                placeholder="Search destination..."
                onSelect={(
                  lat,
                  lng,
                  label
                ) => {
                  setEndLocation([
                    lat,
                    lng,
                  ]);

                  setEndLabel(label);
                }}
              />
            </div>

            <div className="rounded-2xl bg-gray-100 p-4 text-sm dark:bg-gray-800">
              <p className="mb-2">
                <strong>From:</strong>{" "}
                {startLabel || "Not selected"}
              </p>

              <p className="mb-2">
                <strong>To:</strong>{" "}
                {endLabel || "Not selected"}
              </p>

              {/* Distance */}
              <div className="mt-4 rounded-xl bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                Distance:{" "}
                {routeDistance
                  ? `${routeDistance} KM`
                  : "--"}
              </div>
            </div>
          </div>
        )}

        {/* MAP */}
        <MapContainer
          center={currentLocation}
          zoom={13}
          className="z-0 h-full w-full"

          // Interactions
          dragging={true}
          inertia={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
          boxZoom={true}
          keyboard={true}
          zoomControl={true}

          // Animations
          zoomAnimation={true}
          fadeAnimation={true}
          markerZoomAnimation={true}
        >
          {/* Auto Move */}
          <ChangeMapView
            center={currentLocation}
          />

          {/* Tile Layer */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Routing */}
          {startLocation && endLocation && (
            <RoutingMachine
              start={startLocation}
              end={endLocation}
            />
          )}
          {/* Current Location */}
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

          {/* Marker Cluster */}
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
                  <div class="cluster-inner">
                    ${cluster.getChildCount()}
                  </div>
                `,
                className:
                  "custom-cluster",
                iconSize: L.point(
                  50,
                  50,
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
                draggable
                eventHandlers={{
                  click: () => {
                    console.log(
                      "Clicked:",
                      rider.name
                    );
                  },

                  dragend: (e) => {
                    console.log(
                      "Dragged:",
                      e.target.getLatLng()
                    );
                  },
                }}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <h4 className="mb-1 font-semibold">
                      {rider.name}
                    </h4>

                    <p className="text-sm text-gray-600">
                      {rider.status}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>

                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        Online
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {/* Polyline */}
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "blue",
              weight: 5,
            }}
          />

          {/* Polygon */}
          <Polygon
            positions={polygonPositions}
            pathOptions={{
              color: "green",
              fillOpacity: 0.3,
            }}
          >
            <Popup>
              Delivery Zone
            </Popup>
          </Polygon>

          {/* Circle */}
          <Circle
            center={currentLocation}
            radius={1000}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.2,
            }}
          >
            <Popup>1KM Radius</Popup>
          </Circle>

          {/* Rectangle */}
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