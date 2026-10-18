import React from 'react'
import TreeForm from "../components/TreeForm";

const RightPanel = ({ location, formData, setFormData, handleSaveTree, saving }) => {
    return (
        <aside className="space-y-5">
            {/* TreeForm for User */}
            <TreeForm
                location={location}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSaveTree}
                saving={saving}
            />

            {/* Bottom Right Part */}
            <div className="rounded-2xl bg-emerald-950 p-5 text-white shadow-sm hover:-translate-y-1.5 transition-transform">
                <p className="text-lg font-bold">Small action, lasting impact.</p>
                <p className="mt-2 text-sm leading-6 text-emerald-100">
                    Record your planting location and inspire others to
                    contribute to a greener community.
                </p>
                <div className="mt-4 text-3xl">🌱 🌿 🌳</div>
            </div>
        </aside>
    )
}

export default RightPanel
