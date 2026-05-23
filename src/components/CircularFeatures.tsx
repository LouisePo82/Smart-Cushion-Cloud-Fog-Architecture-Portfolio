"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Brain, Cpu, Smartphone, Cloud, Bell, Battery, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Rotate3d, Fingerprint } from "lucide-react";
import { Vortex } from "./ui/Vortex";

const products = [
  { id: "black", name: "Mysterious Black", color: "#050505", image: "/cushion-black.png" },
  { id: "blue", name: "Electric Blue", color: "#3b82f6", image: "/cushion-blue.png" },
  { id: "slate", name: "Slate Gray", color: "#64748b", image: "/cushion-slate.png" },
];

// Interactive 3D Cushion Canvas Component
interface Cushion3DProps {
  productId: string;
  color: string;
  glowColor: string;
}

const Cushion3D: React.FC<Cushion3DProps> = ({ productId, color, glowColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Rotation State
  const rotationRef = useRef({
    angleX: -0.6, // Pitch (tilt)
    angleY: 0.5,  // Yaw (spin)
    targetAngleX: -0.6,
    targetAngleY: 0.5,
    isDragging: false,
    startX: 0,
    startY: 0,
    pulseTime: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // 1. Generate 3D Mesh Grid for Ergonomic Cushion
    const NX = 13;
    const NY = 13;
    const vertices: { x: number; y: number; z: number; isTop: boolean }[] = [];
    
    // Ergonomic height formula matching physical contoured cushion shape
    const getErgonomicHeight = (x: number, y: number) => {
      const dThighL = Math.pow(x + 1.6, 2) + Math.pow(y + 0.6, 2);
      const dThighR = Math.pow(x - 1.6, 2) + Math.pow(y + 0.6, 2);
      const dTailbone = Math.pow(x, 2) + Math.pow(y - 2.8, 2);
      const dDivider = Math.pow(x, 2) + Math.pow(y + 3.0, 2);

      let z = 0.55;
      z -= 0.32 * Math.exp(-dThighL / 1.8);  // Left thigh depression scoop
      z -= 0.32 * Math.exp(-dThighR / 1.8);  // Right thigh depression scoop
      z -= 0.40 * Math.exp(-dTailbone / 1.0); // Coccyx/Tailbone cutout relief
      z += 0.16 * Math.exp(-dDivider / 1.5);  // Thigh divider center hump
      z += 0.04 * y;                          // Gentle forward slope

      return z;
    };

    // Generate Top Mesh Grid (z = getErgonomicHeight(x, y))
    for (let i = 0; i < NX; i++) {
      for (let j = 0; j < NY; j++) {
        const x = -3.2 + 6.4 * (i / (NX - 1));
        const y = -3.2 + 6.4 * (j / (NY - 1));
        const z = getErgonomicHeight(x, y);
        vertices.push({ x, y, z, isTop: true });
      }
    }

    // Generate Bottom Mesh Grid (z = -0.55 flat base)
    const baseOffset = NX * NY;
    for (let i = 0; i < NX; i++) {
      for (let j = 0; j < NY; j++) {
        const x = -3.2 + 6.4 * (i / (NX - 1));
        const y = -3.2 + 6.4 * (j / (NY - 1));
        vertices.push({ x, y, z: -0.55, isTop: false });
      }
    }

    // 2. Generate Face Connections (Quad Polygons)
    const faces: { indices: number[]; isTop: boolean; isSide: boolean }[] = [];

    // Top Surface Faces
    for (let i = 0; i < NX - 1; i++) {
      for (let j = 0; j < NY - 1; j++) {
        const v0 = i * NY + j;
        const v1 = (i + 1) * NY + j;
        const v2 = (i + 1) * NY + (j + 1);
        const v3 = i * NY + (j + 1);
        faces.push({ indices: [v0, v1, v2, v3], isTop: true, isSide: false });
      }
    }

    // Bottom Base Faces (Reverse Winding for Normal direction)
    for (let i = 0; i < NX - 1; i++) {
      for (let j = 0; j < NY - 1; j++) {
        const v0 = baseOffset + i * NY + j;
        const v1 = baseOffset + i * NY + (j + 1);
        const v2 = baseOffset + (i + 1) * NY + (j + 1);
        const v3 = baseOffset + (i + 1) * NY + j;
        faces.push({ indices: [v0, v1, v2, v3], isTop: false, isSide: false });
      }
    }

    // Side Perimeter Faces (Connect boundary edges)
    // Front Boundary (j = 0)
    for (let i = 0; i < NX - 1; i++) {
      const vTop = i * NY + 0;
      const vTopNext = (i + 1) * NY + 0;
      const vBot = baseOffset + i * NY + 0;
      const vBotNext = baseOffset + (i + 1) * NY + 0;
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }
    // Right Boundary (i = NX - 1)
    for (let j = 0; j < NY - 1; j++) {
      const vTop = (NX - 1) * NY + j;
      const vTopNext = (NX - 1) * NY + (j + 1);
      const vBot = baseOffset + (NX - 1) * NY + j;
      const vBotNext = baseOffset + (NX - 1) * NY + (j + 1);
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }
    // Back Boundary (j = NY - 1)
    for (let i = NX - 1; i > 0; i--) {
      const vTop = i * NY + (NY - 1);
      const vTopNext = (i - 1) * NY + (NY - 1);
      const vBot = baseOffset + i * NY + (NY - 1);
      const vBotNext = baseOffset + (i - 1) * NY + (NY - 1);
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }
    // Left Boundary (i = 0)
    for (let j = NY - 1; j > 0; j--) {
      const vTop = 0 * NY + j;
      const vTopNext = 0 * NY + (j - 1);
      const vBot = baseOffset + 0 * NY + j;
      const vBotNext = baseOffset + 0 * NY + (j - 1);
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }

    // 3. Arrangement of 9 Smart Pressure Sensors (FSRs)
    const sensorOffsets = [-1.6, 0, 1.6];
    const sensors: { x: number; y: number; z: number }[] = [];
    for (const sx of sensorOffsets) {
      for (const sy of sensorOffsets) {
        // Place sensors slightly floating above the contoured top surface
        const sz = getErgonomicHeight(sx, sy) + 0.08;
        sensors.push({ x: sx, y: sy, z: sz });
      }
    }

    // 4. Position of Blue LED STATUS Light on the right side
    const statusLed = { x: 3.2, y: -0.6, z: -0.15 };

    // 3D Point Rotation Helper
    const rotate = (x: number, y: number, z: number, angleX: number, angleY: number) => {
      // Rotate around X-axis (Pitch / Tilt)
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotate around Y-axis (Yaw / Spin)
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x2 = x * cosY - z1 * sinY;
      const z2 = x * sinY + z1 * cosY;

      return { x: x2, y: y1, z: z2 };
    };

    // Canvas Resize Handler
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || 500) * window.devicePixelRatio;
      canvas.height = (rect?.height || 500) * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    resize();
    window.addEventListener("resize", resize);

    // 5. Core 60FPS Loop
    const render = () => {
      const state = rotationRef.current;
      
      // Auto Spin slowly when user is not dragging
      if (!state.isDragging) {
        state.targetAngleY += 0.005;
      }
      
      // Dynamic Momentum LERP Smooth interpolation
      state.angleX += (state.targetAngleX - state.angleX) * 0.12;
      state.angleY += (state.targetAngleY - state.angleY) * 0.12;
      state.pulseTime += 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      // Dynamically calculate camera scale depending on viewport size
      const baseScale = Math.min(canvas.width, canvas.height) * 0.1;
      const D = 14; // Camera Viewport Distance

      // 5a. Rotate and Project all Vertices to Screen space
      const projected = vertices.map(v => {
        const r = rotate(v.x, v.y, v.z, state.angleX, state.angleY);
        const scale = (D * baseScale) / (D + r.z); // Perspective projection scale
        return {
          rx: r.x,
          ry: r.y,
          rz: r.z,
          sx: cx + r.x * scale,
          sy: cy + r.y * scale,
        };
      });

      // 5b. Face Projection and Flat Shading calculations
      const faceData = faces.map(face => {
        const vPoints = face.indices.map(idx => projected[idx]);
        const rotPoints = face.indices.map(idx => {
          const v = vertices[idx];
          return rotate(v.x, v.y, v.z, state.angleX, state.angleY);
        });

        // Depth Sorting metric: average z position
        let avgZ = 0;
        vPoints.forEach(p => { avgZ += p.rz; });
        avgZ /= vPoints.length;

        // 3D Normal Vector Cross Product (Face flat shading calculation)
        const u = {
          x: rotPoints[1].x - rotPoints[0].x,
          y: rotPoints[1].y - rotPoints[0].y,
          z: rotPoints[1].z - rotPoints[0].z,
        };
        const v = {
          x: rotPoints[2].x - rotPoints[0].x,
          y: rotPoints[2].y - rotPoints[0].y,
          z: rotPoints[2].z - rotPoints[0].z,
        };
        const nx = u.y * v.z - u.z * v.y;
        const ny = u.z * v.x - u.x * v.z;
        const nz = u.x * v.y - u.y * v.x;
        const len = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
        const normal = { x: nx/len, y: ny/len, z: nz/len };

        // Virtual light coming from top-front-right normalized
        const light = { x: 0.5, y: 0.8, z: -0.45 };
        const dot = normal.x * light.x + normal.y * light.y + normal.z * light.z;
        
        // Two-sided shading multiplier to keep wireframe fully visible and shaded
        const brightness = 0.35 + 0.65 * Math.abs(dot);

        return {
          vPoints,
          avgZ,
          brightness,
          isTop: face.isTop,
          isSide: face.isSide,
        };
      });

      // 5c. Painter's Algorithm Depth Sort: draw back faces first
      faceData.sort((a, b) => b.avgZ - a.avgZ);

      // 5d. Draw all Quad polygons
      faceData.forEach(face => {
        ctx.beginPath();
        ctx.moveTo(face.vPoints[0].sx, face.vPoints[0].sy);
        for (let i = 1; i < face.vPoints.length; i++) {
          ctx.lineTo(face.vPoints[i].sx, face.vPoints[i].sy);
        }
        ctx.closePath();

        // Shaded Solid fill colors matching selected products
        let fillColor = "";
        let strokeColor = "";
        
        const br = face.brightness;

        if (productId === "black") {
          // Sleek glowing charcoal dark-cyber feel
          fillColor = `rgba(${Math.round(18 * br + 8)}, ${Math.round(18 * br + 8)}, ${Math.round(20 * br + 10)}, 0.96)`;
          strokeColor = face.isTop 
            ? `rgba(249, 115, 22, ${0.12 + 0.18 * br})` // Orange mesh wire lines
            : `rgba(255, 255, 255, 0.05)`;
        } else if (productId === "blue") {
          // Rich electric deep blue shaded surfaces
          fillColor = `rgba(${Math.round(15 * br + 10)}, ${Math.round(50 * br + 20)}, ${Math.round(210 * br + 45)}, 0.90)`;
          strokeColor = `rgba(59, 130, 246, ${0.15 + 0.22 * br})`;
        } else {
          // Premium cool metallic Slate Gray
          fillColor = `rgba(${Math.round(55 * br + 15)}, ${Math.round(65 * br + 18)}, ${Math.round(80 * br + 22)}, 0.92)`;
          strokeColor = `rgba(148, 163, 184, ${0.15 + 0.20 * br})`;
        }

        ctx.fillStyle = fillColor;
        ctx.fill();

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.0 * window.devicePixelRatio;
        ctx.stroke();
      });

      // 5e. Render 9 Glowing Smart Sensor nodes on top of the cushion
      sensors.forEach((s, idx) => {
        const r = rotate(s.x, s.y, s.z, state.angleX, state.angleY);
        const scale = (D * baseScale) / (D + r.z);
        const sx = cx + r.x * scale;
        const sy = cy + r.y * scale;

        // Draw ONLY if the sensor is on a front-facing surface (rz < 0)
        if (r.z < 0) {
          // Radial glow coordinates
          const rad = 7 + 4 * Math.sin(state.pulseTime * 4.5 + idx * 1.5);
          
          // Glow Background Circle
          ctx.beginPath();
          ctx.arc(sx, sy, rad * window.devicePixelRatio, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            sx, sy, 0, 
            sx, sy, rad * window.devicePixelRatio
          );
          
          if (productId === "black") {
            grad.addColorStop(0, "rgba(249, 115, 22, 0.65)"); // Orange sensor cores
            grad.addColorStop(1, "rgba(249, 115, 22, 0)");
          } else if (productId === "blue") {
            grad.addColorStop(0, "rgba(34, 211, 238, 0.65)"); // Cyber Cyan sensors for contrast
            grad.addColorStop(1, "rgba(34, 211, 238, 0)");
          } else {
            grad.addColorStop(0, "rgba(16, 185, 129, 0.65)"); // Emerald Green sensors
            grad.addColorStop(1, "rgba(16, 185, 129, 0)");
          }
          
          ctx.fillStyle = grad;
          ctx.fill();

          // Small Central Solid LED Core
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2 * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fillStyle = productId === "black" ? "#f97316" : productId === "blue" ? "#22d3ee" : "#10b981";
          ctx.shadowBlur = 12 * window.devicePixelRatio;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
          
          // Reset shadow blur
          ctx.shadowBlur = 0;
        }
      });

      // 5f. Render Glowing Electric Blue LED STATUS Light on the side
      const rStatus = rotate(statusLed.x, statusLed.y, statusLed.z, state.angleX, state.angleY);
      const scaleStatus = (D * baseScale) / (D + rStatus.z);
      const sxStatus = cx + rStatus.x * scaleStatus;
      const syStatus = cy + rStatus.y * scaleStatus;

      // Render only if facing towards the camera (rz < 0)
      if (rStatus.z < 0) {
        // Small blue LED indicator
        const statusPulse = 2 + 1.2 * Math.sin(state.pulseTime * 6);
        ctx.beginPath();
        ctx.arc(sxStatus, syStatus, statusPulse * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8"; // Bright sky blue led
        ctx.shadowBlur = 8 * window.devicePixelRatio;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        // Small monospace "STATUS" text next to the LED, aligning exactly with the photo!
        ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
        ctx.font = `${Math.round(7.5 * window.devicePixelRatio)}px monospace`;
        ctx.fillText("STATUS", sxStatus + 6 * window.devicePixelRatio, syStatus + 2.5 * window.devicePixelRatio);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [productId, color, glowColor]);

  // Drag-to-Rotate Mouse Coordinate Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const state = rotationRef.current;
    state.isDragging = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const state = rotationRef.current;
    if (!state.isDragging) return;
    
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    state.targetAngleY += dx * 0.0075; // Adjust rotation speed
    state.targetAngleX = Math.max(-1.4, Math.min(0.2, state.targetAngleX + dy * 0.0075)); // Pitch limits

    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseUp = () => {
    rotationRef.current.isDragging = false;
  };

  // Mobile Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    const state = rotationRef.current;
    state.isDragging = true;
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const state = rotationRef.current;
    if (!state.isDragging) return;
    
    // Prevent mobile pull-to-refresh or page scrolling while rotating 3D model
    if (e.cancelable) e.preventDefault();

    const dx = e.touches[0].clientX - state.startX;
    const dy = e.touches[0].clientY - state.startY;

    state.targetAngleY += dx * 0.009;
    state.targetAngleX = Math.max(-1.4, Math.min(0.2, state.targetAngleX + dy * 0.009));

    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none flex items-center justify-center">
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full block touch-none"
      />
    </div>
  );
};

const features = [
  {
    title: "5-Posture Recognition",
    description: "Our advanced AI analyzes data from a high-precision 3x3 sensor matrix to accurately identify 5 distinct sitting postures.",
    icon: Brain,
    image: "/feat_posture_recognition.png",
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  {
    title: "Embedded Fog Computing",
    description: "Localized data processing ensures zero latency and maximum privacy for your sensitive health data.",
    icon: Cpu,
    image: "/feat_fog_computing.png",
    color: "text-cyan-500",
    glow: "rgba(6, 182, 212, 0.5)"
  },
  {
    title: "Real-time App Feedback",
    description: "Receive instant posture corrections and long-term health trends directly through our dedicated mobile application.",
    icon: Smartphone,
    image: "/feat_app_feedback.gif",
    color: "text-indigo-500",
    glow: "rgba(99, 102, 241, 0.5)"
  },
  {
    title: "Cloud Integration",
    description: "Built on a serverless AWS stack using IoT Core, Lambda (Python), API Gateway, and Amazon DynamoDB for real-time WebSocket sync and historical session storage.",
    icon: Cloud,
    image: "/feat_cloud_sync.png",
    color: "text-purple-500",
    glow: "rgba(168, 85, 247, 0.5)"
  },
  {
    title: "Smart Vibrations",
    description: "Subtle haptic feedback alerts you immediately when your posture needs adjustment without distraction.",
    icon: Bell,
    image: "/feat_smart_vibration.png",
    color: "text-orange-500",
    glow: "rgba(249, 115, 22, 0.5)"
  },
  {
    title: "Capybara Data Journey",
    description: "Observe your real-time posture through your virtual Capybara companion. A healthy spine keeps your buddy happy and thriving!",
    icon: Sparkles,
    image: "/feat_capy_journey.png",
    color: "text-emerald-500",
    glow: "rgba(160, 185, 129, 0.5)"
  },
];

export const CircularFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = Array.from({ length: 12 });
  const itemsCount = sections.length; 
  const denominator = itemsCount - 1;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * denominator);
    if (index !== activeSlide) setActiveSlide(index);
  });

  const angleStep = 40; 
  const totalRotation = angleStep * (features.length - 1);

  const rotation = useTransform(
    smoothProgress, 
    [4 / denominator, 9 / denominator], 
    [0, -totalRotation]
  );

  const vortexOpacity = useTransform(
    smoothProgress,
    [0, 1 / denominator, 3 / denominator, 10 / denominator, 1],
    [1, 0, 0.2, 0.2, 1]
  );

  const navigateTo = (index: number) => {
    const targetIndex = Math.max(0, Math.min(itemsCount - 1, index));
    const containerTop = containerRef.current?.offsetTop || 0;
    window.scrollTo({
      top: containerTop + (targetIndex * window.innerHeight),
      behavior: 'smooth'
    });
  };

  // Logical content slides → their peak section index
  // 0=Intro(0), 1=DesignDNA(2), 2=Feat0(4), 3=Feat1(5), ..., 8=Feat5(9), 9=CTA(10)
  const snapPoints = [0, 2, 4, 5, 6, 7, 8, 9, 10, 11];
  const [logicalSlide, setLogicalSlide] = React.useState(0);

  // Keep logicalSlide in sync with activeSlide
  React.useEffect(() => {
    const nearest = snapPoints.reduce((prev, curr, idx) =>
      Math.abs(curr - activeSlide) < Math.abs(snapPoints[prev] - activeSlide) ? idx : prev
    , 0);
    setLogicalSlide(nearest);
  }, [activeSlide]);

  const isScrolling = useRef(false);

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      
      e.preventDefault();
      
      if (isScrolling.current) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextLogical = logicalSlide + direction;
      
      if (nextLogical >= 0 && nextLogical < snapPoints.length) {
        isScrolling.current = true;
        navigateTo(snapPoints[nextLogical]);
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [logicalSlide]);

  return (
    <div ref={containerRef} className="relative h-[1200vh] bg-black scroll-smooth">
      {/* Real Snap Points for both Desktop & Mobile */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {sections.map((_, i) => (
          <div key={i} className="h-screen w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        
        {/* Background Vortex */}
        <motion.div 
          style={{ opacity: vortexOpacity }}
          className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        >
           <Vortex 
              backgroundColor="black"
              className="w-full h-full"
              containerClassName="w-full h-full"
              particleCount={200}
              rangeY={800}
           />
        </motion.div>

        {/* Left Side: Circular UI */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [3.5 / denominator, 4 / denominator, 9 / denominator, 9.5 / denominator], [0, 1, 1, 0]),
            x: useTransform(smoothProgress, [3.5 / denominator, 4 / denominator, 9 / denominator, 9.5 / denominator], [-100, 0, 0, -100]),
            pointerEvents: "none"
          }}
          className="hidden lg:flex absolute left-[-19vw] w-[38vw] h-[38vw] items-center justify-center z-10"
        >
          <div className="absolute inset-[-2px] rounded-full border border-primary/30 blur-[2px] opacity-50" />
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-full h-full rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center shadow-[inset_0_0_50px_rgba(var(--primary),0.1)]"
          >
            {features.map((feature, index) => {
              const angle = index * angleStep;
              const activePoint = (index + 4) / denominator; 
              const glowRange = 0.02;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(19vw) rotate(-${angle}deg)`,
                  }}
                >
                  <motion.div 
                    style={{
                      scale: useTransform(smoothProgress, 
                        [activePoint - glowRange, activePoint, activePoint + glowRange], 
                        [0.8, 1.3, 0.8]
                      ),
                      borderColor: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["rgba(255,255,255,0.1)", "var(--primary)", "rgba(255,255,255,0.1)"]
                      ),
                      boxShadow: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 30px ${feature.glow}`, "0px 0px 0px rgba(0,0,0,0)"]
                      )
                    }}
                    className={`p-5 rounded-full bg-neutral-900 border-2 transition-colors ${feature.color}`}
                  >
                    <feature.icon size={28} />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          <div className="absolute right-[-20px] w-20 h-[3px] bg-gradient-to-l from-primary to-transparent z-20 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        </motion.div>

        <div className="relative w-full h-full">
          {/* 0. Intro Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.5 / denominator, 1 / denominator], [1, 1, 0]),
              y: useTransform(smoothProgress, [0, 0.5 / denominator, 1 / denominator], [0, 0, -50]),
              pointerEvents: useTransform(smoothProgress, [0, 0.5 / denominator, 1 / denominator], ["auto", "auto", "none"])
            }}
            className="absolute inset-0 z-50 flex items-center justify-center text-center px-6"
          >
            <div className="relative z-10 max-w-4xl">
               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-2xl md:text-5xl font-bold text-white leading-relaxed"
               >
                 Our technology is <span className="text-primary font-extrabold italic">more than just hardware.</span> <br className="hidden md:block"/>
                 It's a comprehensive ecosystem designed to improve your health.
               </motion.p>
            </div>
          </motion.div>

          {/* 1-3. Design DNA Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [1 / denominator, 1.5 / denominator, 3 / denominator, 3.5 / denominator], [0, 1, 1, 0]),
              y: useTransform(smoothProgress, [1 / denominator, 1.5 / denominator, 3 / denominator, 3.5 / denominator], [50, 0, 0, -50]),
              pointerEvents: useTransform(smoothProgress, [1 / denominator, 1.5 / denominator, 3 / denominator, 3.5 / denominator], ["none", "auto", "auto", "none"])
            }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 lg:px-32"
          >
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
              <div className="flex flex-col items-center gap-6 lg:gap-10">
                <div className="w-[45vh] h-[45vh] lg:w-[60vh] lg:h-[60vh] rounded-[2.5rem] lg:rounded-[4rem] bg-neutral-950/85 border-2 border-white/10 p-4 flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.05)] relative group">
                  <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[4rem] border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Holographic background mesh grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-[2.5rem] lg:rounded-[4rem]" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedProduct.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full h-full flex items-center justify-center relative overflow-hidden"
                    >
                      <Cushion3D 
                        productId={selectedProduct.id}
                        color={selectedProduct.color}
                        glowColor={
                          selectedProduct.id === "black" 
                            ? "rgba(249,115,22,0.8)" 
                            : selectedProduct.id === "blue" 
                              ? "rgba(59,130,246,0.9)" 
                              : "rgba(148,163,184,0.9)"
                        }
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Hologram Floating Badges inside the frame */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[8px] font-mono text-neutral-400 uppercase tracking-widest pointer-events-none">
                    <Rotate3d className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: '6s' }} />
                    <span>3D Mesh</span>
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[8px] font-mono text-neutral-400 uppercase tracking-widest pointer-events-none">
                    <Fingerprint className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>Drag to spin</span>
                  </div>
                </div>
                
                <div className="flex gap-4 lg:gap-6 p-4 lg:p-5 rounded-2xl lg:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 transition-all cursor-pointer ${
                        selectedProduct.id === p.id ? "border-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.6)]" : "border-white/20"
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:absolute lg:right-0 text-center lg:text-right max-w-lg">
                <span className="inline-flex items-center gap-2 text-primary text-[10px] lg:text-sm font-mono uppercase tracking-[0.3em] mb-4">
                  <Sparkles size={14} /> The Masterpiece
                </span>
                <h2 className="text-4xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  Design <br/><span className="text-primary italic font-black">DNA</span>
                </h2>
                <p className="text-sm lg:text-2xl text-neutral-400 leading-relaxed font-medium">
                  A perfect blend of aesthetic elegance and technological power.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4-9. Features Slides */}
          {features.map((feature, index) => {
            const activePoint = (index + 4) / denominator; 
            const range = 0.03; 

            const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
            const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [30, 0, -30]);
            const scale = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0.95, 1, 0.95]);

            return (
              <motion.div
                key={index}
                style={{ 
                  opacity, 
                  y,
                  scale,
                  pointerEvents: useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], ["none", "auto", "none"])
                }}
                className="absolute inset-0 flex flex-col justify-center px-6 lg:pl-[28vw] lg:pr-12 text-center lg:text-left"
              >
                <div className="flex flex-col items-center lg:items-start w-full max-w-6xl">
                   <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 lg:hidden ${feature.color}`}>
                      <feature.icon size={40} />
                   </div>
                   <span className={`text-xs lg:text-sm font-mono mb-6 ${feature.color} uppercase tracking-widest`}>TECH / 0{index + 1}</span>
                   
                   <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-center w-full">
                       <div className="flex-1">
                           <h3 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter">
                             {feature.title}
                           </h3>
                           <p className="text-lg lg:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
                             {feature.description}
                           </p>
                       </div>
                       
                       <div className="flex-1 w-full max-w-lg hidden md:block">
                           <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md p-2 shadow-2xl">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none" />
                              <img 
                                src={feature.image} 
                                alt={feature.title} 
                                className="w-full h-full object-cover rounded-2xl shadow-inner transition-transform duration-700 hover:scale-105" 
                              />
                           </div>
                       </div>
                   </div>
                </div>
              </motion.div>
            );
          })}

          {/* 10-11. Final CTA Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [9.5 / denominator, 10 / denominator, 1], [0, 1, 1]),
              scale: useTransform(smoothProgress, [9.5 / denominator, 10 / denominator], [0.9, 1]),
              pointerEvents: useTransform(smoothProgress, [9.5 / denominator, 10 / denominator, 1], ["none", "auto", "auto"])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
          >
            <div className="absolute inset-0 -z-10">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" 
                    style={{ transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(2)' }}
               />
               <motion.div 
                 animate={{
                   scale: [1, 1.2, 1],
                   opacity: [0.1, 0.3, 0.1],
                   x: [-50, 50, -50],
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[150px] rounded-full"
               />
            </div>

            <h2 className="text-5xl lg:text-9xl font-bold text-white mb-10 lg:mb-16 tracking-tighter relative z-10">
              See how it <br/>
              <span className="text-primary italic font-black">all connects.</span>
            </h2>
            <a href="/architecture" className="px-10 py-5 lg:px-16 lg:py-8 bg-primary text-neutral-950 rounded-full font-bold text-xl lg:text-3xl hover:scale-105 hover:bg-primary/90 transition-all flex items-center gap-4 shadow-2xl shadow-primary/40 relative z-20">
              Explore Architecture <ArrowRight size={28} />
            </a>
          </motion.div>
        </div>

        {/* Navigation Arrows - Kept for accessibility */}
        <div className="flex lg:hidden absolute bottom-8 left-0 w-full justify-between px-6 z-[100] pointer-events-none">
          <button 
            onClick={() => navigateTo(activeSlide - 1)}
            className={`p-4 rounded-full bg-black/80 border border-white/20 text-white pointer-events-auto active:scale-90 transition-all backdrop-blur-lg ${activeSlide === 0 ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={() => navigateTo(activeSlide + 1)}
            className={`p-4 rounded-full bg-primary text-white pointer-events-auto active:scale-90 transition-all shadow-2xl shadow-primary/40 ${activeSlide === denominator ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === denominator}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
