"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cloud, 
  Sparkles, 
  ArrowRight, 
  Terminal,
  ShieldAlert,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";

// Types
interface AWSService {
  id: string;
  name: string;
  logo: string;
  color: string;
  glowColor: string;
  bgClass: string;
  borderClass: string;
  tagline: string;
  role: string;
  resources: string[];
  snippetTitle: string;
  snippet: string;
  image: string;
}

export const CloudEcosystem = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  
  // Drag to pan state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dragged, setDragged] = useState(false);

  // AWS Services Data
  const awsServices: AWSService[] = [
    {
      id: "iot",
      name: "AWS IoT Core",
      logo: "/aws_iot_logo.svg",
      color: "text-amber-400",
      glowColor: "rgba(245,158,11,0.4)",
      bgClass: "bg-amber-500/10",
      borderClass: "border-amber-500/30",
      tagline: "Ultra-low overhead secure MQTT message broker.",
      role: "Connects local Fog Nodes (e.g. 'fog-node-01') securely to the cloud via TLS-encrypted MQTT. It filters messages via IoT Rules to trigger specialized Lambda workflows asynchronously.",
      resources: [
        "Thing: fog-node-01",
        "Topic: cushion/+/summary (Session statistics)",
        "Topic: cushion/+/event (Alerts and anomalies)"
      ],
      snippetTitle: "IoT Rule SQL Query",
      snippet: `SELECT * FROM 'cushion/+/summary'\n\n-- Action: Invoke Lambda Function\n-- Target: SmartCushion-ProcessSummary`,
      image: "/AWS_IOT.png"
    },
    {
      id: "cloudformation",
      name: "AWS CloudFormation",
      logo: "/aws_cloudformation_logo.svg",
      color: "text-red-400",
      glowColor: "rgba(248,113,113,0.4)",
      bgClass: "bg-red-500/10",
      borderClass: "border-red-500/30",
      tagline: "Automate serverless infrastructure via declarative code.",
      role: "Deploys and governs our entire smart cushion architecture. By using SAM templates, CloudFormation spins up the DynamoDB tables, REST APIs, WebSocket routes, and Lambda functions with strict least-privilege IAM roles automatically.",
      resources: [
        "Stack: smart-cushion-cloud",
        "IAM Roles: LambdaExecutionRole, ApiGatewayPushDep",
        "Outputs: WebSocketURI, RestApiGatewayURL"
      ],
      snippetTitle: "CloudFormation Event Stack",
      snippet: `CREATE_COMPLETE  AWS::DynamoDB::Table  UsersTable\nCREATE_COMPLETE  AWS::Serverless::Function  GachaRoll\nCREATE_COMPLETE  AWS::ApiGateway::RestApi  ServerlessRestApi`,
      image: "/CloudFormation.png"
    },
    {
      id: "cloudwatch",
      name: "Amazon CloudWatch",
      logo: "/aws_cloudwatch_logo.svg",
      color: "text-emerald-400",
      glowColor: "rgba(52,211,153,0.4)",
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500/30",
      tagline: "Real-time log management, custom metrics, and alarm triggers.",
      role: "Collects system performance and runtime metrics. Monitors lambda cold-starts, captures application execution exceptions, tracks active user WebSocket connections, and triggers administrative alerts if anomaly detection limits are crossed.",
      resources: [
        "Log Group: /aws/lambda/SmartCushion-AddGems",
        "Metric Filter: GoodPostureRatio",
        "Alarm: HighLatencyThresholdAlert"
      ],
      snippetTitle: "CloudWatch Alarm Log",
      snippet: `[INFO] 2026-05-21 17:07:13 - Posture summary processed for peter_ntust\n[WARN] 2026-05-21 17:08:00 - Lambda execution duration exceeded 2000ms\n[INFO] 2026-05-21 17:08:15 - Active connection count: 24`,
      image: "/CloudWatch.png"
    },
    {
      id: "dynamodb",
      name: "Amazon DynamoDB",
      logo: "/aws_dynamodb_logo.svg",
      color: "text-cyan-400",
      glowColor: "rgba(34,211,238,0.4)",
      bgClass: "bg-cyan-500/10",
      borderClass: "border-cyan-500/30",
      tagline: "Fully managed NoSQL database with single-digit millisecond latency.",
      role: "Stores all project entities. Uses high-performance Partition Keys to handle parallel stream logging, keeping user profiles, sessions, and WebSocket links synchronized in real-time.",
      resources: [
        "smart-cushion-users (Account progress & gems)",
        "smart-cushion-sessions (Detailed posture logs)",
        "smart-cushion-daily-summary (Pre-calculated stats)",
        "smart-cushion-ws-connections (WebSocket mapping)"
      ],
      snippetTitle: "DynamoDB Item: smart-cushion-users",
      snippet: `{\n  "username": "peter_ntust",\n  "gems": 250,\n  "unlocked_items": ["capybara_gold", "desk_avatar_02"],\n  "streak_days": 5,\n  "last_active": "2026-05-21"\n}`,
      image: "/DynamoDB.png"
    },
    {
      id: "lambda",
      name: "AWS Lambda",
      logo: "/aws_lambda_logo.svg",
      color: "text-orange-500",
      glowColor: "rgba(249,115,22,0.4)",
      bgClass: "bg-orange-500/10",
      borderClass: "border-orange-500/30",
      tagline: "Serverless computing handling real-time APIs & background jobs.",
      role: "Executes business logic on-demand without server overhead. Manages user authentication, daily posture summaries, and runs our anti-cheat reward logic.",
      resources: [
        "SmartCushion-ProcessSummary (Stores MQTT reports)",
        "SmartCushion-AddGems (Postures-to-gems engine)",
        "SmartCushion-GachaRoll (Anti-cheat gacha logic)",
        "SmartCushion-GetDailySummary (Speedy API backing)"
      ],
      snippetTitle: "SmartCushion-AddGems Lambda",
      snippet: `def lambda_handler(event, context):\n    user = db.get_user(event['username'])\n    nup_duration = event['nup_duration']\n    \n    # Securely calculate gems: 1 min NUP = 5 Gems\n    earned_gems = int(nup_duration / 60) * 5\n    db.update_gems(user, earned_gems)\n    \n    return {"status": "success", "earned": earned_gems}`,
      image: "/Lambda.png"
    },
    {
      id: "apigateway",
      name: "AWS API Gateway",
      logo: "/aws_apigateway_logo.svg",
      color: "text-purple-400",
      glowColor: "rgba(168,85,247,0.4)",
      bgClass: "bg-purple-500/10",
      borderClass: "border-purple-500/30",
      tagline: "Secure endpoints routing REST & WebSocket communication.",
      role: "Acts as the portal to the cloud. Integrates directly with Astro web dashboards via REST API and acts as a stateful WebSocket proxy to relay live posture alerts from the physical cushion.",
      resources: [
        "REST API: /login, /sessions, /summary",
        "Progression & Reward Endpoints: /user/gems, /gacha/roll",
        "WebSocket Route: $connect, $disconnect, $default"
      ],
      snippetTitle: "API Route Integration Map",
      snippet: `POST /gacha/roll   -> Lambda: SmartCushion-GachaRoll\nGET  /summary      -> Lambda: SmartCushion-GetDailySummary\nWSS  /live         -> WebSocket Proxy API`,
      image: "/REST_API_Gateway.png"
    }
  ];

  const currentService = awsServices.find(s => s.id === selectedService) || awsServices[0];

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel === 0) return;
    setIsDragging(true);
    setDragged(false);
    
    // Calculate cursor positions relative to container
    const rect = containerRef.current?.getBoundingClientRect();
    const offsetLeft = rect ? rect.left + window.scrollX : 0;
    const offsetTop = rect ? rect.top + window.scrollY : 0;
    
    setStartX(e.pageX - offsetLeft);
    setStartY(e.pageY - offsetTop);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    setScrollTop(containerRef.current?.scrollTop || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const offsetLeft = rect.left + window.scrollX;
    const offsetTop = rect.top + window.scrollY;
    
    const x = e.pageX - offsetLeft;
    const y = e.pageY - offsetTop;
    const walkX = (x - startX) * 1.5; // Drag speed multiplier
    const walkY = (y - startY) * 1.5;
    
    if (Math.abs(x - startX) > 4 || Math.abs(y - startY) > 4) {
      setDragged(true);
    }
    
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const closeModal = () => {
    setZoomedImage(null);
    setZoomLevel(0);
    setIsDragging(false);
    setDragged(false);
  };

  return (
    <section className="min-h-[85vh] bg-black text-white relative py-12 md:py-20 flex flex-col justify-start overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Page Header */}
        <AnimatePresence initial={false}>
          {selectedService === null && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
              animate={{ 
                opacity: 1, 
                height: "auto", 
                marginBottom: "3rem",
                transition: {
                  height: { type: "spring", stiffness: 100, damping: 20 },
                  opacity: { duration: 0.3 }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                marginBottom: 0,
                transition: {
                  height: { type: "spring", stiffness: 100, damping: 20 },
                  opacity: { duration: 0.2 }
                }
              }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-widest uppercase mb-4">
                <Cloud className="w-3.5 h-3.5 animate-pulse" /> Cloud Integration Ecosystem
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                AWS Serverless & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 italic font-medium pr-2">IoT Infrastructure</span>
              </h1>
              <p className="text-neutral-400 text-base md:text-lg max-w-3xl mx-auto mt-4 leading-relaxed font-medium">
                How we process posture sensor logs, manage real-time WebSocket sessions, and synchronize sitting statistics with low latency.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AWS Resources Stack Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full flex flex-col gap-6"
        >
          {/* Centered Horizontal Logo Dock */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2.5 md:gap-3 p-2 bg-neutral-950/80 backdrop-blur-2xl border border-white/25 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] max-w-full overflow-x-auto md:overflow-visible scrollbar-none">
              {awsServices.map(service => {
                const isSelected = selectedService === service.id;
                const isHovered = hoveredService === service.id;
                
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`relative group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? "scale-105" 
                        : "bg-transparent border border-transparent hover:bg-white/10 hover:border-white/10 hover:scale-105"
                    }`}
                    style={{
                      outline: "none"
                    }}
                  >
                    {/* Tooltip Popup */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                          exit={{ opacity: 0, y: 6, scale: 0.9, x: "-50%" }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute -top-12 left-1/2 px-2.5 py-1.5 bg-neutral-950/95 backdrop-blur-md border border-white/15 rounded-lg text-[10px] font-bold text-white whitespace-nowrap shadow-2xl z-30 pointer-events-none"
                        >
                          {service.name}
                          {/* Small Pointer Arrow */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-950 border-b border-r border-white/10 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active Background Slide Motion */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 rounded-xl -z-10"
                        style={{
                          background: `linear-gradient(135deg, ${service.glowColor.replace('0.4', '0.25')} 0%, rgba(255, 255, 255, 0.15) 100%)`,
                          border: "2px solid rgba(255, 255, 255, 0.45)",
                          boxShadow: `0 0 25px 2px ${service.glowColor}, inset 0 1px 2px rgba(255, 255, 255, 0.4)`
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Animated Logo Container */}
                    <motion.div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center p-1.5 transition-all duration-300 ${
                        isSelected 
                          ? `${service.bgClass} ${service.borderClass} border-2 border-white/60 bg-white/20 shadow-md` 
                          : "opacity-70 group-hover:opacity-100"
                      }`}
                      style={{
                        boxShadow: isSelected ? `0 0 12px ${service.glowColor}` : "none"
                      }}
                      whileHover={{ 
                        y: -5,
                        scale: 1.15,
                        transition: { type: "spring", stiffness: 450, damping: 14 }
                      }}
                    >
                      <img 
                        src={service.logo} 
                        alt={service.name} 
                        className={`w-full h-full object-contain transition-all duration-300 ${
                          isSelected ? "brightness-100 scale-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "brightness-80 group-hover:brightness-100"
                        }`} 
                      />
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Details View (Spans Full 12 Columns, animates only when visible) */}
          <AnimatePresence mode="wait">
            {selectedService !== null && (
              <motion.div 
                key={selectedService}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col bg-neutral-950/80 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] pointer-events-none opacity-25 transition-all duration-700"
                  style={{
                    backgroundColor: currentService.glowColor
                  }}
                />
                
                {/* Inner Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
                  
                  {/* Left Column: Brand Header, Divider, Role & Deployments */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Brand Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${currentService.bgClass} ${currentService.borderClass} border flex items-center justify-center p-3`}>
                        <img 
                          src={currentService.logo} 
                          alt={currentService.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white">{currentService.name}</h2>
                        <p className="text-primary text-xs font-mono tracking-wider mt-0.5 uppercase">Serverless Infrastructure</p>
                      </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* Role Description */}
                    <div>
                      <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2.5">Core Purpose & Responsibility</h4>
                      <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-medium">
                        {currentService.role}
                      </p>
                    </div>

                    {/* Active Deployments */}
                    <div>
                      <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2.5">Active Deployments</h4>
                      <div className="flex flex-col gap-2">
                        {currentService.resources.map((res, index) => (
                          <div key={index} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-neutral-400 font-mono">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Screenshot & Snippet (Aligned top horizontally with Left column) */}
                  <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
                    {/* Console Screenshot */}
                    <div 
                      onClick={() => setZoomedImage(currentService.image)}
                      className="group relative cursor-zoom-in rounded-xl overflow-hidden border border-white/10 bg-neutral-900 aspect-video flex items-center justify-center transition-all duration-300 hover:border-primary/50"
                    >
                      <img 
                        src={currentService.image} 
                        alt={`${currentService.name} AWS Console`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Sleek Label Badge */}
                      <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                        Console Screenshot
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-[10px] text-neutral-200 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                          <span>Click to Zoom</span>
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-t border-x border-white/10 rounded-t-xl text-[10px] font-mono text-neutral-500">
                        <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> {currentService.snippetTitle}</span>
                        <span className="text-emerald-500 font-semibold uppercase tracking-wider text-[8px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">active</span>
                      </div>
                      <pre className="p-4 bg-black border border-white/10 rounded-b-xl overflow-x-auto text-[10px] md:text-xs font-mono text-neutral-300 leading-normal scrollbar-none whitespace-pre">
                        <code>{currentService.snippet}</code>
                      </pre>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Stats summary */}
        <div className="mt-16 md:mt-24 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">100% Free-Tier Compatible</span>
              <span className="text-neutral-500 text-xs">AWS serverless triggers cost $0/month under academic tier quotas.</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a 
              href="/dashboard" 
              className="flex items-center gap-2 text-xs md:text-sm font-semibold py-3 px-6 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              Live Posture Dashboard <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox / Zoom Modal Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-zoom-out"
            onClick={closeModal}
          >
            {/* Modal Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_70%)] pointer-events-none" />

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-lg font-bold"
              >
                &times;
              </button>
              
              {/* Image Scroll Wrapper */}
              <div className="relative group/modal">
                <div 
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`overflow-auto max-h-[72vh] w-full rounded-lg scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex transition-all ${
                    zoomLevel === 0 ? "justify-center items-center p-2" : "justify-start items-start p-1"
                  }`}
                  style={{
                    cursor: zoomLevel === 0 ? "zoom-in" : isDragging ? "grabbing" : "grab"
                  }}
                >
                  <img 
                    src={zoomedImage} 
                    alt="AWS Console Zoomed" 
                    onClick={(e) => {
                      if (dragged) {
                        e.stopPropagation();
                        return;
                      }
                      // Cycle zoom level: 0 -> 1 -> 2 -> 0
                      setZoomLevel((prev) => (prev + 1) % 3);
                    }}
                    className={`rounded-lg select-none ${
                      zoomLevel === 0 
                        ? "w-full h-auto max-h-[68vh] object-contain cursor-zoom-in" 
                        : zoomLevel === 1
                          ? "w-[180%] max-w-none max-h-none" 
                          : "w-[280%] max-w-none max-h-none"
                    }`}
                    style={{
                      transform: isDragging ? "scale(0.998)" : "scale(1)",
                      transition: isDragging ? "none" : "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease",
                      pointerEvents: "auto"
                    }}
                  />
                </div>

                {/* Floating Glassmorphic Zoom Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-950/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 flex items-center gap-4 shadow-2xl transition-all duration-300 opacity-90 hover:opacity-100 hover:border-white/25 z-20">
                  <button
                    onClick={() => {
                      if (zoomLevel > 0) setZoomLevel((prev) => prev - 1);
                    }}
                    disabled={zoomLevel === 0}
                    className="p-1 rounded-md text-neutral-400 hover:text-white disabled:opacity-40 disabled:hover:text-neutral-400 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  
                  <span className="text-[10px] font-mono font-bold text-neutral-300 min-w-[70px] text-center select-none">
                    {zoomLevel === 0 ? "Fit (100%)" : zoomLevel === 1 ? "1.8x Zoom" : "2.8x Zoom"}
                  </span>

                  <button
                    onClick={() => {
                      if (zoomLevel < 2) setZoomLevel((prev) => prev + 1);
                    }}
                    disabled={zoomLevel === 2}
                    className="p-1 rounded-md text-neutral-400 hover:text-white disabled:opacity-40 disabled:hover:text-neutral-400 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <div className="w-px h-3 bg-white/10" />

                  <button
                    onClick={() => setZoomLevel(0)}
                    disabled={zoomLevel === 0}
                    className="p-1 rounded-md text-neutral-400 hover:text-white disabled:opacity-40 disabled:hover:text-neutral-400 transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              {/* Label */}
              <div className="px-4 py-3 bg-neutral-900/50 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  {zoomLevel === 0 
                    ? "Fit Screen (Click image or use controls to Zoom In)" 
                    : zoomLevel === 1
                      ? "1.8x Zoom Active (Click again to zoom further; drag image to pan)" 
                      : "2.8x Super Zoom Active (Drag image to pan)"}
                </span>
                <span className="text-primary font-semibold uppercase tracking-wider text-[10px]">Academic Verification</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
