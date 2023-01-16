import React, { useState } from "react";

interface MyButtonProps {
	numberOfButtons: number;
}

const MyButtons: React.FC<MyButtonProps> = ({ numberOfButtons }) => {
  const [colors, setColors] = useState(Array(numberOfButtons).fill(false));

  function handleClick(index: number) {
    const newColors = [...colors];
    newColors[index] = !newColors[index];
    setColors(newColors);
  }

  return (
    <div>
      {colors.map((_, index) => (
        <button key={index} style={{ backgroundColor: colors[index] ? 'red' : 'blue' }} onClick={() => handleClick(index)}>
          Click me to change color
        </button>
      ))}
    </div>
  );
}

export default MyButtons;
