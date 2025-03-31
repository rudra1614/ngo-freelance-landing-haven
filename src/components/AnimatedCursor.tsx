
import React, { useEffect, useState } from 'react';

interface SparkleProps {
  position: { x: number; y: number };
  color: string;
  size: number;
  key: number;
}

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor has moved enough to create sparkles
      const distance = Math.sqrt(
        Math.pow(e.clientX - prevPosition.x, 2) + 
        Math.pow(e.clientY - prevPosition.y, 2)
      );
      
      if (distance > 5) {
        createSparkle(e.clientX, e.clientY);
        setPrevPosition({ x: e.clientX, y: e.clientY });
      }
      
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      setLinkHovered(
        hoveredElement instanceof HTMLAnchorElement || 
        hoveredElement instanceof HTMLButtonElement ||
        hoveredElement?.closest('button') !== null ||
        hoveredElement?.closest('a') !== null
      );
    };

    const createSparkle = (x: number, y: number) => {
      const colors = [
        '#9b87f5', '#7E69AB', '#D946EF', '#F97316', 
        '#33C3F0', '#8B5CF6', '#1EAEDB', '#E5DEFF', 
        '#FFDEE2', '#FDE1D3', '#D3E4FD'
      ];
      
      const newSparkles = [...sparkles];
      
      // Add 1-3 new sparkles
      const sparkleCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < sparkleCount; i++) {
        const randomOffset = {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20
        };
        
        newSparkles.push({
          position: { 
            x: x + randomOffset.x, 
            y: y + randomOffset.y 
          },
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          key: Date.now() + i
        });
      }
      
      // Limit number of sparkles to prevent performance issues
      if (newSparkles.length > 50) {
        newSparkles.splice(0, newSparkles.length - 50);
      }
      
      setSparkles(newSparkles);
    };

    const onMouseDown = () => {
      setClicked(true);
      // Create extra sparkles on click
      createSparkle(position.x, position.y);
      createSparkle(position.x, position.y);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Remove sparkles that are older than 1 second
    const cleanupSparkles = () => {
      setSparkles(prevSparkles => 
        prevSparkles.filter(sparkle => {
          return Date.now() - sparkle.key < 1000;
        })
      );
    };

    const sparkleInterval = setInterval(cleanupSparkles, 300);

    addEventListeners();
    return () => {
      removeEventListeners();
      clearInterval(sparkleInterval);
    };
  }, [position, sparkles, prevPosition]);

  const cursorClasses = `
    fixed pointer-events-none z-50 transition-transform duration-150 ease-out
    mix-blend-difference will-change-transform
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-75' : ''}
    ${linkHovered ? 'scale-150' : ''}
  `;

  // Render sparkles component
  const Sparkles = () => (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.key}
          className="fixed pointer-events-none z-40 rounded-full animate-fade-out"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${sparkle.position.x}px, ${sparkle.position.y}px)`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size / 2}px ${sparkle.color}`,
            opacity: 1,
            animation: 'fade-out 1s forwards',
          }}
        />
      ))}
    </>
  );

  // Hide on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <Sparkles />
      <div
        className={`${cursorClasses} h-4 w-4 rounded-full bg-white left-0 top-0`}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      />
      <div
        className={`${cursorClasses} h-10 w-10 rounded-full border border-white left-0 top-0`}
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      />
    </>
  );
};

export default AnimatedCursor;
