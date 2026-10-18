import React from 'react'
import RightPanel from "@/components/RightPanel";
import LeftPanel from "@/components/LeftPanel";


{/* Section3 is a component that displays the main content of the page, which includes a left panel with a map and a right panel with a form for users to submit their tree planting information. It also handles the state and logic for saving trees to Firebase and updating the map in real-time. */ }

const Section3 = ({trees, location,setLocation, formData, setFormData, handleSaveTree, saving }) => {
    return (
        < section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]" >

            {/* Map Div Element */}
            {/* Left Part/Panel -> Map */}
            <LeftPanel trees={trees} setLocation={setLocation} />

            {/* Right Part/Panel -> TreeForm + Bottom Most Right Part,Treat like a Right Sidebar */}
            {/* UserForm for Tree */}
            <RightPanel location={location} formData={formData} setFormData={setFormData} handleSaveTree={handleSaveTree} saving={saving} />
        </section >
    )
}

export default Section3
