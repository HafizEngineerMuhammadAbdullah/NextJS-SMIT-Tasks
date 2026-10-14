TreeForm → handleSaveTree()
                  ↓
       Firebase push(ref, newTree)
                  ↓
          /trees/{uniqueId}
                  ↓
        Firebase onValue listener
                  ↓
             setTrees(...)
                  ↓
          Map markers update



Firebase Realtime Database
└── trees
    ├── -Oabc123
    │   ├── userName: "Abdullah"
    │   ├── treeName: "Neem"
    │   ├── lat: 24.871234
    │   ├── lng: 67.034567
    │   └── date: "2026-10-13T..."
    │
    └── -Oxyz456
        ├── userName: "Ali"
        ├── treeName: "Mango"
        ├── lat: 24.880000
        ├── lng: 67.020000
        └── date: "2026-10-13T..."