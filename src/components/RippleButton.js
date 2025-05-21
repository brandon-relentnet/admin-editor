import React, { useRef, useEffect } from "react";

const RippleButton = ({ children, className, onClick, ...props }) => {
  const buttonRef = useRef(null);

  const rippleEffect = (event) => {
    const btn = buttonRef.current;

    // Create ripple element
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    // Remove existing ripple if present
    const ripple = btn.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    // Add new ripple
    btn.appendChild(circle);

    // Call original onClick handler if provided
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`ripple-button ${className || ""}`}
      onClick={rippleEffect}
      {...props}
    >
      {children}
    </button>
  );
};

export default RippleButton;
