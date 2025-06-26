import { defineProperties } from "figma:react";
import { useState, useEffect, useRef } from "react";

export default function NoiseBackground({
  noiseIntensity = 20,
  animationSpeed = 3,
  opacity = 0.05,
  backgroundColor = "white"
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  const frameCountRef = useRef(0);

  // Set initial dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial setup
    updateDimensions();

    // Handle resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate and animate noise
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create noise data
    const createNoiseData = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      const intensity = Math.max(5, Math.min(50, noiseIntensity));
      
      for (let i = 0; i < data.length; i += 4) {
        // Generate noise value
        const noise = Math.floor(Math.random() * intensity);
        
        // Set RGB values (same for grayscale)
        const value = 255 - noise;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255;   // Alpha (fully opaque)
      }
      
      return imageData;
    };

    // Animation loop
    const animate = () => {
      frameCountRef.current += 1;
      
      // Only update noise every few frames based on animation speed
      // Lower speed = less frequent updates
      const updateFrequency = Math.max(1, Math.floor(16 / animationSpeed));
      
      if (frameCountRef.current % updateFrequency === 0) {
        // Draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw noise with specified opacity
        ctx.globalAlpha = opacity;
        ctx.putImageData(createNoiseData(), 0, 0);
        ctx.globalAlpha = 1.0;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, noiseIntensity, animationSpeed, opacity, backgroundColor]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}

defineProperties(NoiseBackground, {
  noiseIntensity: {
    label: "Noise Intensity",
    type: "number",
    control: "slider",
    min: 5,
    max: 50,
    step: 1,
    defaultValue: 20
  },
  animationSpeed: {
    label: "Animation Speed",
    type: "number",
    control: "slider",
    min: 1,
    max: 10,
    step: 0.5,
    defaultValue: 3
  },
  opacity: {
    label: "Noise Opacity",
    type: "number",
    control: "slider",
    min: 0.01,
    max: 0.2,
    step: 0.01,
    defaultValue: 0.05
  },
  backgroundColor: {
    label: "Background Color",
    type: "string",
    defaultValue: "white"
  }
});
