'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

// Individual learning node component
const LearningNode = ({ topic, position, index, onNodeClick, isConnected }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onNodeClick?.(topic, index);
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ${
        isClicked ? 'scale-125' : 'hover:scale-110'
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={handleClick}
    >
      {/* Pulsing glow effect */}
      <div className="absolute inset-0 animate-pulse">
        <div 
          className="w-16 h-16 rounded-full opacity-30 blur-md"
          style={{
            background: `radial-gradient(circle, var(--color-gradient-blue), var(--color-gradient-purple))`,
            animation: 'pulse 2s infinite, glow 3s ease-in-out infinite alternate',
          }}
        />
      </div>
      
      {/* Main node */}
      <div 
        className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-sm transition-all duration-300 ${
          isClicked ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
        }`}
        style={{
          boxShadow: '0 0 20px rgba(96, 175, 249, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Star icon inside node */}
        <div className="text-white text-xl">✦</div>
      </div>
      
      {/* Topic label */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium text-center whitespace-nowrap px-2 py-1 bg-black/40 rounded-lg backdrop-blur-sm">
        {topic}
      </div>
    </div>
  );
};

// Connection line between nodes
const ConnectionLine = ({ start, end, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const length = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
  
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

  return (
    <div
      className="absolute origin-left"
      style={{
        left: `${start.x}%`,
        top: `${start.y}%`,
        width: `${length}%`,
        height: '2px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%',
      }}
    >
      <div 
        className={`h-full bg-gradient-to-r from-blue-400 via-purple-400 to-transparent transition-all duration-1000 ${
          isVisible ? 'opacity-60 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, var(--color-gradient-blue), var(--color-gradient-purple), transparent)',
          boxShadow: '0 0 10px rgba(96, 175, 249, 0.6)',
          animation: 'connectionPulse 3s ease-in-out infinite',
        }}
      />
    </div>
  );
};

// Animated background stars
const StarField = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 3,
      }));
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Main Learning Universe component
const LearningUniverse = ({ 
  categories = ['Indian History', 'Fashion', 'Technology', 'AI'],
  onTopicClick,
  className = ''
}) => {
  const [nodePositions, setNodePositions] = useState([]);
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);

  // Generate dynamic positions for nodes
  useEffect(() => {
    const generatePositions = () => {
      const positions = [];
      const centerX = 50;
      const centerY = 45; // Slightly higher to accommodate title
      const radius = 25; // Radius for circular arrangement
      
      if (categories.length === 1) {
        positions.push({ x: centerX, y: centerY });
      } else if (categories.length === 2) {
        positions.push(
          { x: centerX - 20, y: centerY },
          { x: centerX + 20, y: centerY }
        );
      } else if (categories.length === 3) {
        positions.push(
          { x: centerX, y: centerY - 15 },
          { x: centerX - 20, y: centerY + 10 },
          { x: centerX + 20, y: centerY + 10 }
        );
      } else {
        // For 4 or more items, use circular arrangement
        categories.forEach((_, index) => {
          const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          positions.push({ x, y });
        });
      }
      
      setNodePositions(positions);
    };

    generatePositions();
  }, [categories]);

  // Generate connections between nodes
  useEffect(() => {
    if (nodePositions.length < 2) return;
    
    const newConnections = [];
    
    // Create a constellation pattern - connect each node to 1-2 nearby nodes
    nodePositions.forEach((position, index) => {
      const nextIndex = (index + 1) % nodePositions.length;
      newConnections.push({
        start: position,
        end: nodePositions[nextIndex],
        delay: index * 500,
      });
      
      // For larger constellations, add some cross connections
      if (nodePositions.length > 3 && index < nodePositions.length - 2) {
        const crossIndex = (index + 2) % nodePositions.length;
        newConnections.push({
          start: position,
          end: nodePositions[crossIndex],
          delay: (index + nodePositions.length) * 500,
        });
      }
    });
    
    setConnections(newConnections);
  }, [nodePositions]);

  const handleNodeClick = (topic, index) => {
    onTopicClick?.(topic, index);
  };

  return (
    <div className={`relative w-full h-screen bg-black overflow-hidden ${className}`}>
      {/* Custom animations styles */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes connectionPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
      
      {/* Background starfield */}
      <StarField />
      
      {/* Main title */}
      <div className="relative z-10 text-center pt-8 px-4 fade-in-up">
        <h1 className="text-4xl font-bold text-white mb-2">
          My Learning Universe
        </h1>
      </div>
      
      {/* Constellation container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full mb-4"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        {/* Connection lines */}
        {connections.map((connection, index) => (
          <ConnectionLine
            key={`connection-${index}`}
            start={connection.start}
            end={connection.end}
            delay={connection.delay}
          />
        ))}
        
        {/* Learning nodes */}
        {categories.map((topic, index) => (
          nodePositions[index] && (
            <LearningNode
              key={`node-${index}`}
              topic={topic}
              position={nodePositions[index]}
              index={index}
              onNodeClick={handleNodeClick}
              isConnected={connections.some(
                conn => conn.start === nodePositions[index] || conn.end === nodePositions[index]
              )}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default LearningUniverse;