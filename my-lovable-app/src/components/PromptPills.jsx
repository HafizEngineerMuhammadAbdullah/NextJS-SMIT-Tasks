"use client"
// Add this below <Input /> in Hero.jsx
const PRESET_PROMPTS = [
  "📊 Analytics Dashboard",
  "🚀 SaaS Landing Page",
  "💼 Internal CRM Tool",
  "📱 E-commerce Store"
]

const PromptPills = ({ onSelect }) => (
  <div className="flex flex-wrap justify-center gap-2 max-w-xl px-4 mt-2">
    {PRESET_PROMPTS.map((label) => (
      <button
        key={label}
        onClick={() => onSelect(label)}
        className="text-xs font-medium bg-white/60 hover:bg-white text-zinc-600 border border-zinc-200/80 rounded-full px-3 py-1.5 transition-all shadow-xs hover:border-zinc-300 cursor-pointer"
      >
        {label}
      </button>
    ))}
  </div>
)


export default PromptPills;