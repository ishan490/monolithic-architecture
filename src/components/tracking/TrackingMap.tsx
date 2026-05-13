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

type LatLngTuple = [number, number];

const riders = [
  {
    id: 1,
    name: "Rider 1",
    lat: 23.0225,
    lng: 72.5714,
    status: "Delivering Food",
  },
  {
    id: 2,
    name: "Rider 2",
    lat: 23.0325,
    lng: 72.5814,
    status: "Parcel Pickup",
  },
];

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
function ChangeMapView({ center }: { center: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);

  return null;
}

export default function TrackingMap() {
  const [currentLocation, setCurrentLocation] =
    useState<LatLngTuple>([23.0225, 72.5714]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.error("Location error:", error);
      }
    );
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold">
          Advanced Tracking Map
        </h2>
      </div>

      <div className="h-[700px] w-full overflow-hidden rounded-b-2xl">
        <MapContainer
          center={currentLocation}
          zoom={13}
          className="h-full w-full z-0"

          // Interactions
          dragging={true}
          inertia={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
          boxZoom={true}
          keyboard={true}
          zoomControl={true}
          maxZoom={Infinity}

          // Animations
          zoomAnimation={true}
          fadeAnimation={true}
          markerZoomAnimation={true}
        >
          <ChangeMapView center={currentLocation} />

          {/* Tile Layer */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Current Location Marker */}
          <Marker position={currentLocation}>
            <Popup>
              <div>
                <h4 className="font-semibold">My Location</h4>
                <p>You are here</p>
              </div>
            </Popup>
          </Marker>

          {/* Rider Markers */}
          {riders.map((rider) => (
            <Marker
              key={rider.id}
              position={[rider.lat, rider.lng]}
            >
              <Popup>
                <div>
                  <h4 className="font-semibold">
                    {rider.name}
                  </h4>

                  <p>{rider.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Polyline Route */}
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "blue",
              weight: 5,
            }}
          />

          {/* Polygon Area */}
          <Polygon
            positions={polygonPositions}
            pathOptions={{
              color: "green",
            }}
          >
            <Popup>Delivery Zone</Popup>
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
            <Popup>Restricted Area</Popup>
          </Rectangle>
        </MapContainer>
      </div>
    </div>
  );
}