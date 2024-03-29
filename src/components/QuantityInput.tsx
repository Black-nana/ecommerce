import React, { useState } from 'react';

interface QuantityInputProps {
  initialValue: number; // Initial value for the quantity input
  onChange: (quantity: number) => void; // Callback function to handle quantity change
}

const QuantityInput: React.FC<QuantityInputProps> = ({ initialValue, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button className="px-3 py-1 bg-gray-200" disabled={quantity === 1} onClick={handleDecrement}>-</button>
      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-16 mx-2 text-center"
      />
      <button className="px-3 py-1 bg-gray-200" onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityInput;
