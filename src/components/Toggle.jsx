import React from 'react';

export default function Toggle({ on, onChange }) {
  return (
    <div
      className={`toggle-switch${on ? ' on' : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={on}
    />
  );
}
