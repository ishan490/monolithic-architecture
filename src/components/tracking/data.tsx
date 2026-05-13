export  const riders = [
  // Ahmedabad
  {
    id: 1,
    name: "Ahmedabad Rider 1",
    city: "Ahmedabad",
    lat: 23.0225,
    lng: 72.5714,
    status: "Delivering Food",
  },
  {
    id: 2,
    name: "Ahmedabad Rider 2",
    city: "Ahmedabad",
    lat: 23.0325,
    lng: 72.5814,
    status: "Parcel Pickup",
  },

  // Surat
  {
    id: 3,
    name: "Surat Rider 1",
    city: "Surat",
    lat: 21.1702,
    lng: 72.8311,
    status: "Delivering Parcel",
  },
  {
    id: 4,
    name: "Surat Rider 2",
    city: "Surat",
    lat: 21.1805,
    lng: 72.8422,
    status: "Online",
  },

  // Vadodara
  {
    id: 5,
    name: "Vadodara Rider 1",
    city: "Vadodara",
    lat: 22.3072,
    lng: 73.1812,
    status: "Returning to Hub",
  },
  {
    id: 6,
    name: "Vadodara Rider 2",
    city: "Vadodara",
    lat: 22.3175,
    lng: 73.1915,
    status: "Delivering Grocery",
  },

  // Rajkot
  {
    id: 7,
    name: "Rajkot Rider 1",
    city: "Rajkot",
    lat: 22.3039,
    lng: 70.8022,
    status: "Delivering Food",
  },
  {
    id: 8,
    name: "Rajkot Rider 2",
    city: "Rajkot",
    lat: 22.3142,
    lng: 70.8124,
    status: "At Restaurant",
  },

  // Bhavnagar
  {
    id: 9,
    name: "Bhavnagar Rider 1",
    city: "Bhavnagar",
    lat: 21.7645,
    lng: 72.1519,
    status: "Order Assigned",
  },
  {
    id: 10,
    name: "Bhavnagar Rider 2",
    city: "Bhavnagar",
    lat: 21.7745,
    lng: 72.1612,
    status: "Delivering Medicine",
  },

  // Jamnagar
  {
    id: 11,
    name: "Jamnagar Rider 1",
    city: "Jamnagar",
    lat: 22.4707,
    lng: 70.0577,
    status: "Idle",
  },
  {
    id: 12,
    name: "Jamnagar Rider 2",
    city: "Jamnagar",
    lat: 22.4801,
    lng: 70.0674,
    status: "Parcel Pickup",
  },

  // Gandhinagar
  {
    id: 13,
    name: "Gandhinagar Rider 1",
    city: "Gandhinagar",
    lat: 23.2156,
    lng: 72.6369,
    status: "Delivering Parcel",
  },
  {
    id: 14,
    name: "Gandhinagar Rider 2",
    city: "Gandhinagar",
    lat: 23.2252,
    lng: 72.6474,
    status: "Waiting for Pickup",
  },

  // Junagadh
  {
    id: 15,
    name: "Junagadh Rider 1",
    city: "Junagadh",
    lat: 21.5222,
    lng: 70.4579,
    status: "Online",
  },
  {
    id: 16,
    name: "Junagadh Rider 2",
    city: "Junagadh",
    lat: 21.5325,
    lng: 70.4681,
    status: "Delivering Food",
  },

  // Anand
  {
    id: 17,
    name: "Anand Rider 1",
    city: "Anand",
    lat: 22.5645,
    lng: 72.9289,
    status: "Reached Customer",
  },
  {
    id: 18,
    name: "Anand Rider 2",
    city: "Anand",
    lat: 22.5741,
    lng: 72.9391,
    status: "Returning to Warehouse",
  },

  // Morbi
  {
    id: 19,
    name: "Morbi Rider 1",
    city: "Morbi",
    lat: 22.8173,
    lng: 70.8377,
    status: "Delivering Grocery",
  },
  {
    id: 20,
    name: "Morbi Rider 2",
    city: "Morbi",
    lat: 22.8271,
    lng: 70.8474,
    status: "Offline",
  },

  // Nadiad
  {
    id: 21,
    name: "Nadiad Rider 1",
    city: "Nadiad",
    lat: 22.6916,
    lng: 72.8634,
    status: "Delivering Food",
  },
  {
    id: 22,
    name: "Nadiad Rider 2",
    city: "Nadiad",
    lat: 22.7015,
    lng: 72.8735,
    status: "Available",
  },
];

export const calculateDistance = (
  start: any,
  end: any
) => {
  const R = 6371;

  const dLat =
    ((end[0] - start[0]) * Math.PI) / 180;

  const dLon =
    ((end[1] - start[1]) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((start[0] * Math.PI) / 180) *
      Math.cos((end[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return (R * c).toFixed(2);
};