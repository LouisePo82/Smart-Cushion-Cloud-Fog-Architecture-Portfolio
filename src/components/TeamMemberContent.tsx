import React from 'react';

export const PhuongContent = () => (
  <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
    <p>
      Phuong laid the foundation for the Smart Cushion hardware system. With extensive experience in microcontrollers, he directly designed and optimized the pressure sensor modules.
    </p>
    <h4 className="font-bold text-black dark:text-white">Core Responsibilities:</h4>
    <ul className="list-disc pl-5 space-y-2">
      <li>PCB circuit design and FSR force sensor integration.</li>
      <li>ESP32 Firmware programming for stable MQTT data transmission.</li>
      <li>Implementing Edge signal filters to minimize data noise.</li>
    </ul>
  </div>
);

export const NamContent = () => (
  <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
    <p>
      Nam takes on the role of bridging the physical and digital worlds through the Fog Computing layer.
    </p>
    <h4 className="font-bold text-black dark:text-white">Core Responsibilities:</h4>
    <ul className="list-disc pl-5 space-y-2">
      <li>Building the central Fog Node to collect data from multiple Edge devices.</li>
      <li>Developing lightweight AI algorithms running directly on the Fog Node for posture recognition.</li>
      <li>Integrating the haptic vibration feedback system for users.</li>
    </ul>
  </div>
);

export const ThiContent = () => (
  <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
    <p>
      Thi manages the massive data flow from devices to the cloud and visualizes it intuitively.
    </p>
    <h4 className="font-bold text-black dark:text-white">Core Responsibilities:</h4>
    <ul className="list-disc pl-5 space-y-2">
      <li>Designing the Cloud Backend architecture on AWS/Vercel.</li>
      <li>Developing real-time monitoring dashboards for businesses and individuals.</li>
      <li>Managing security and integrity of user health data.</li>
    </ul>
  </div>
);

export const VuContent = () => (
  <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
    <p>
      Vu focuses on creating the best possible user experience on mobile devices.
    </p>
    <h4 className="font-bold text-black dark:text-white">Core Responsibilities:</h4>
    <ul className="list-disc pl-5 space-y-2">
      <li>Designing the Mobile App interface with a modern, user-friendly style.</li>
      <li>Integrating real-time heatmaps for posture visualization.</li>
      <li>Developing smart push notification systems for user reminders.</li>
    </ul>
  </div>
);
