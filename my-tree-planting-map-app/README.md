tree-planting-app/
│
├── app/
│   ├── page.jsx
│   └── globals.css
│
├── components/
│   ├── Map.jsx
│   ├── TreeForm.jsx
│   └── MapClickHandler.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
└── public/
    └── tree-marker.png

2. Install React Leaflet
npm install leaflet react-leaflet


Because Leaflet's CSS is required, add this in app/globals.css:
@import "leaflet/dist/leaflet.css";


8. How the complete application works
             USER
               │
               ▼
       Clicks on Map
               │
               ▼
      Leaflet gives
      latitude + longitude
               │
               ▼
        MapClickHandler
               │
               ▼
        React State
        setLocation()
               │
               ▼
          Show Form
               │
       ┌───────┴────────┐
       │                │
   User Name        Tree Name
       │                │
       └───────┬────────┘
               ▼
         Plant Tree
               │
               ▼
        Create Object
               │
               ▼
          setTrees()
               │
               ▼
       Custom Hook
       useLocalStorage
               │
               ▼
        localStorage
               │
               ▼
        Green Marker
               │
               ▼
          Click Marker
               │
               ▼
        Popup Details


# Project: Tree Planting Map

1. User clicks anywhere on the map.
2. Latitude and longitude are automatically captured.
3. A form appears with:
    - User Name
    - Tree Name
    - Latitude
    - Longitude
4. User clicks **Plant Tree**.
5. Tree data is saved in **localStorage**.
6. A green tree marker appears at that location.
7. Clicking the marker shows the s*aved tree detai*ls.
8. Refreshing the page keeps all previously planted trees.