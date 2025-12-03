import { useState, useEffect } from "react";

interface ExerciseAnimationProps {
  image1: string;
  image2: string;
  alt: string;
  className?: string;
  interval?: number;
}

const ExerciseAnimation = ({ 
  image1, 
  image2, 
  alt, 
  className = "",
  interval = 1000 
}: ExerciseAnimationProps) => {
  const [showFirst, setShowFirst] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowFirst(prev => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={`relative ${className}`}>
      <img
        src={image2}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain bg-white transition-opacity duration-300 ${
          showFirst ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={image1}
        alt={alt}
        className={`w-full h-full object-contain bg-white transition-opacity duration-300 ${
          showFirst ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ExerciseAnimation;
