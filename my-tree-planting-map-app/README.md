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


                    Home
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
        Map                  TreeForm
          │                     │
   User clicks map       User enters name
          │                     │
          ↓                     ↓
   latitude/longitude    formData
          │                     │
          └──────────┬──────────┘
                     ↓
              handleSaveTree()
                     ↓
                newTree object
                     ↓
                  trees[]
                     ↓
              localStorage
                     ↓
              Map re-renders
                     ↓
                 🌳 Marker



BEFORE CLICK

┌──────────── MAP ────────────┐
│                             │
│                             │
└─────────────────────────────┘

┌──── FORM ───────────────────┐
│ Click anywhere on map       │
└─────────────────────────────┘


AFTER CLICK

┌──────────── MAP ────────────┐
│             📍              │
└─────────────────────────────┘

┌──── FORM ───────────────────┐
│ User Name: ______           │
│ Tree Name: ______           │
│ Lat: 24.871234              │
│ Lng: 67.034567              │
│                             │
│       🌳 Plant Tree         │
└─────────────────────────────┘


Next.js
   │
   ├── Server rendering
   │       ❌ Leaflet
   │
   └── Browser
           ✅ Leaflet



I’ll trace the hook itself and one place it’s used for the tree data, then explain the read/write flow in plain language with a small example.

Searched for text `useLocalStorage` (`**/my-tree-planting-map-app/src/**`), 4 results

Read 

The hook has two separate effects: one loads a value from storage, and the other persists React state back to storage. I’m checking the caller now so the explanation matches how `trees` is actually updated in this app.

Read , lines 1 to 120

Think of `localStorage` as a small dictionary in the browser:

```text
"trees" -> "[{...}, {...}]"
```

The key is `"trees"`; its value is the tree list, saved as JSON text. The list itself is an array of tree objects, not a set of localStorage keys.

In `useLocalStorage.jsx:7`, the hook receives the key and a fallback value. In `page.js:31`, that means `key = "trees"` and `initialValue = []`.

Here’s what each part does:

1. `useState(initialValue)` gives React a value to use, initially an empty array.
2. The first `useEffect` calls `localStorage.getItem(key)`. It runs when the component mounts and again if `key` changes. If data exists, `JSON.parse` turns the saved text back into JavaScript data and puts it into React state. The key is a dependency because changing it should load data from the new storage entry.
3. The second `useEffect` calls `localStorage.setItem(key, JSON.stringify(value))`. It runs on mount and whenever either `key` or `value` changes. The key is included so the current value is saved under the right entry if the key changes; the value is included so updates are saved. `JSON.stringify` is needed because localStorage stores strings.
4. `return [value, setValue]` gives the caller the same pair that `useState` gives: the current data and a way to update it. So `trees` reads the list, and `setTrees(...)` changes it. The hook handles saving that change behind the scenes.

For example, when `handleSaveTree` calls `setTrees([...trees, newTree])`, React updates `trees`; then the save effect writes the updated list to localStorage. On a later visit, the load effect reads it back.

One subtlety in this version: when `key` changes, both effects run. The save effect can briefly write the old React value under the new key before the load effect’s state update is applied. Usually the subsequent render saves the newly loaded value, but it’s a reason developers sometimes add a “loaded” flag or use a different initialization pattern to avoid writing before the read is complete.