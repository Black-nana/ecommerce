import React, { ReactNode } from 'react';
import '../components/textGradient.css'

interface TextGradientProps {
  children: ReactNode;
  from?: string;
  via?: string;
  to?: string;
}

const TextGradient: React.FC<TextGradientProps> = ({ children, from = 'from-pink-500', via = 'via-green-700', to = 'to-blue-700' }) => {
 return (
    <span
      className={`text-2xl font-bold bg-gradient-to-r ${from} ${via} ${to} text-transparent bg-clip-text bg-300% animate-gradient text-5xl`}
    >
      {children}
    </span>
 );
};

export default TextGradient;
