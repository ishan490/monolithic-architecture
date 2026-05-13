import { useEffect } from "react";
import { useMap } from "react-leaflet";

import * as L from "leaflet";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

type Props = {
  start: [number, number];
  end: [number, number];
};

export default function RoutingMachine({
  start,
  end,
}: Props) {
  const map = useMap();

  useEffect(() => {
    const routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],

      lineOptions: {
        styles: [
          {
            color: "#2563eb",
            weight: 6,
          },
        ],
      },

      routeWhileDragging: true,
      addWaypoints: false,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
}