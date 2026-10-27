import React from 'react'
const Button = ({ myClass, children, as: Component = "button" }) => {
    return (
        <Component className={myClass}>{children}</Component>
    )
}

export default Button
