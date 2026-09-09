// import React from 'react'

// const Button = ({children}) => {
//   return (
//        <button>
//           {children}
//        </button>
//   )
// }

// export default Button



import React from 'react'

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 active:scale-95 shadow-sm";
  
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 shadow-md",
    secondary: "bg-white/80 text-zinc-800 hover:bg-white border border-zinc-200 hover:border-zinc-300 backdrop-blur-sm",
    ghost: "text-zinc-600 hover:text-black hover:bg-zinc-100/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;