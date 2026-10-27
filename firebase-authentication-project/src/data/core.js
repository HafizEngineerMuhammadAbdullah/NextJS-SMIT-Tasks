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



// export { options };