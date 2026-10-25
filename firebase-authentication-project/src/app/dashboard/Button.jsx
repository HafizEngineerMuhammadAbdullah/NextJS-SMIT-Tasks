import React from 'react'
const Button = ({ myClass, children, key, as: Component = "button" }) => {
    return (
        <Component key={key} className={myClass}>{children}</Component>
    )
}

export default Button
