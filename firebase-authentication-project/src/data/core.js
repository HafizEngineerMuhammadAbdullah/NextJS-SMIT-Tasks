import { LuLayoutDashboard, LuHistory } from "react-icons/lu";
import { FaMicrochip } from "react-icons/fa6";
import { TbCheck, TbPlug, TbBrandGoogleAnalytics, TbHelpHexagon, TbSettings, TbBell } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiTwotoneExperiment } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { TbTrendingUp, TbTrendingDown } from "react-icons/tb";
import { IoHardwareChipSharp, IoCheckmark } from "react-icons/io5";
// Now React won't recreate the array ever
// Tiny optimization
export const options = [
  {
    icon: TbCheck,
    backgroundColor: '#534AB7',
    color: '#ffffff',
    borderColor: '#534AB7',
    content: 'Create your account',
    contentColor: '#ffffff'
  },
  {
    backgroundColor: 'transparent',
    color: '#9595B6',
    borderColor: '#534AB7',
    content: 'Set up your workspace',
    contentColor: '#9595B6'
  },
  {
    backgroundColor: 'transparent',
    color: '#9595B6',
    borderColor: '#534AB7',
    content: 'Invite your team',
    contentColor: '#9595B6'
  }
];


//Initial formData
export const INITIAL_FORM_DATA_SIGNUP_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};


//Initial formData
export const INITIAL_FORM_DATA_SIGNIN_FORM = {
  email: "",
  password: ""
};


export const sidebarLinksOne = [
  {
    icon: LuLayoutDashboard,
    text: "Dashboard"
  },
  {
    icon: FaMicrochip,
    text: "Models"
  },
  {
    icon: TbPlug,
    text: "Integrations"
  },
  {
    icon: TbBrandGoogleAnalytics,
    text: "Analytics"
  }
];

export const sidebarLinksTwo = [
  {
    icon: AiTwotoneExperiment,
    text: "Experiments"
  },
  {
    icon: LuHistory,
    text: "History"
  },
  {
    icon: HiOutlineUsers,
    text: "Team"
  }
];


export const sidebarLinksThree = [
  {
    icon: TbSettings,
    text: "Settings"
  },
  {
    icon: TbHelpHexagon,
    text: "Help"
  }
];


export const primaryButtons = [
  {
    icon: IoMdSearch
  },
  {
    icon: TbBell
  },
  {
    icon: BsPlus
  }
];

export const cardData = [
  {
    icon: IoHardwareChipSharp,
    content: "Models connected",
    number: "9",
    trendingIcon: TbTrendingUp,
    footer: "3 this week"
  },
  {
    icon: CiLocationArrow1,
    content: "API calls today",
    number: "2,847",
    trendingIcon: TbTrendingUp,
    footer: "12% vs yesterday"
  },
  {
    icon: MdAccessTime,
    content: "Avg response",
    number: "340ms",
    trendingIcon: TbTrendingDown,
    footer: "8ms slower"
  },
  {
    icon: IoCheckmark,
    content: "Uptime",
    number: "99.9%",
    trendingIcon: TbTrendingUp,
    footer: " All systems go"
  }
];



export const notifications = [
  {
    id: "notif-1",
    title: "OpenAI GPT-4o connected",
    description: "Integration added via API key",
    timestamp: "2m ago",
    type: "integration", // Can be used to conditionally render the blue icon
  },
  {
    id: "notif-2",
    title: "Experiment #14 completed",
    description: "Gemini vs Claude comparison",
    timestamp: "18m ago",
    type: "success", // Can be used to conditionally render the green checkmark
  },
  {
    id: "notif-3",
    title: "Rate limit warning",
    description: "Anthropic Claude — 80% used",
    timestamp: "1h ago",
    type: "warning", // Can be used to conditionally render the yellow warning triangle
  },
  {
    id: "notif-4",
    title: "Team member invited",
    description: "ali@dev.pk joined workspace",
    timestamp: "3h ago",
    type: "invite", // Can be used to conditionally render the purple user invite icon
  }
];

// Data Array Structure
// for API Usage panel
export const apiUsageData = [
  { id: "api-1", provider: "OpenAI", current: 6240, max: 10000, color: "bg-blue-500" },
  { id: "api-2", provider: "Anthropic", current: 8100, max: 10000, color: "bg-amber-500" },
  { id: "api-3", provider: "Google Gemini", current: 3500, max: 10000, color: "bg-emerald-600" },
  { id: "api-4", provider: "Mistral", current: 1200, max: 10000, color: "bg-blue-600" },
  { id: "api-5", provider: "ElevenLabs", current: 4800, max: 10000, color: "bg-emerald-600" },
];



export const connectedModelsData = [
  {
    id: "model-1",
    name: "GPT-4o",
    provider: "OpenAI",
    type: "Chat",
    status: "connected", // true / green dot
    iconText: "G",
    brandBg: "bg-[#10a37f]" // OpenAI Teal
  },
  {
    id: "model-2",
    name: "Claude Sonnet",
    provider: "Anthropic",
    type: "Chat",
    status: "connected",
    iconText: "C",
    brandBg: "bg-[#d97706]" // Anthropic Amber/Orange
  },
  {
    id: "model-3",
    name: "Gemini Pro",
    provider: "Google",
    type: "Chat",
    status: "connected",
    iconText: "G",
    brandBg: "bg-[#1a73e8]" // Google Blue
  },
  {
    id: "model-4",
    name: "Mistral Large",
    provider: "Mistral",
    type: "Chat",
    status: "connected",
    iconText: "M",
    brandBg: "bg-[#111827]" // Dark Charcoal/Black
  },
  {
    id: "model-5",
    name: "Suno v4",
    provider: "Suno",
    type: "Audio",
    status: "connected",
    iconText: "S",
    brandBg: "bg-[#f97316]" // Suno Orange
  },
  {
    id: "model-6",
    name: "ElevenLabs",
    provider: "ElevenLabs",
    type: "Voice",
    status: "connected",
    iconText: "11",
    brandBg: "bg-[#4f46e5]" // Indigo
  },
  {
    id: "model-7",
    name: "Replit AI",
    provider: "Replit",
    type: "Code",
    status: "disconnected", // false / gray dot
    iconText: "R",
    brandBg: "bg-[#374151]" // Neutral Slate
  },
  {
    id: "model-8",
    name: "Perplexity",
    provider: "Perplexity",
    type: "Search",
    status: "disconnected",
    iconText: "Px",
    brandBg: "bg-[#0ea5e9]" // Sky Blue
  }
];


// export { options };