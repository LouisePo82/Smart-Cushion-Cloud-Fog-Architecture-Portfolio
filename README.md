# 🦦 Smart Cushion Cloud-Fog IoT Ecosystem

Welcome to the central repository for the **Smart Cushion Spinal Wellness System**. This project is built for the **NTUST Cloud-Fog Computing Course (114-2)**.

The Web platform acts as the **Centralized Ecosystem Portal**. From here, you can explore our complete multi-tier hardware-software ecosystem. Below is the directory linking all specialized sub-repositories and the structural architecture that binds them.

---

## 🌐 Centralized Repository Directory

To understand the full scope of our Cloud-Fog solution, explore the corresponding codebase for each layer of the architecture:

| Tier / Component | Repository Name | Description | Key Technologies |
| :--- | :--- | :--- | :--- |
| **💻 Front-End Showcase** | [smart-cushion-web](https://github.com/tonguyentanphuong/smart-cushion-web) | *This Repository*. Symmetrical neon-dark showcase & landing portal. | Astro, React, Framer Motion |
| **📱 Companion Web App** | [smart-cushion-app](https://github.com/MuoiVung/smart-cushion-app) | Interactive real-time posture telemetry dashboard & historical analysis client. | Next.js, React, Tailwind CSS |
| **🔌 Hardware Node** | [smart-cushion-edge](https://github.com/MuoiVung/smart-cushion-edge) | ESP32-S firmware for 8-channel FSR sensor acquisition and telemetry publishing. | ESP-IDF, C++, FreeRTOS, MQTT |
| **📡 Local Fog Node** | [smart-cushion-fog-node](https://github.com/MuoiVung/smart-cushion-fog-node) | Edge server performing real-time AI posture classification and local broker queue management. | Node.js, Mosquitto, PostgreSQL |
| **🧠 Deep Learning Engine** | [smart-cushion-AI](https://github.com/MuoiVung/smart-cushion-AI) | Training pipelines and weights for the 5-Posture Sitting Classification model. | PyTorch, NumPy, Scikit-Learn |
| **☁️ Serverless Cloud** | [smart-cushion-cloud](https://github.com/MuoiVung/smart-cushion-cloud) | AWS Serverless cluster handling persistent telemetry pipelines, analytics, and history API. | AWS IoT Core, Lambda, DynamoDB |

---

## 📐 System Architecture Diagram

Our solution utilizes an optimized **4-Tier Cloud-Fog Topology** to isolate heavy AI computing workloads on the edge, keeping cloud storage costs low while ensuring sub-second local sensory feedback loop:

```text
+------------------------------------------------------------------------------------+
|                             1. IoT Edge Hardware Node                              |
|   [FSR Matrix (8 Sensors)] --- (Analog Signals) ---> [ESP32 Microcontroller]      |
+------------------------------------------+-----------------------------------------+
                                           | 
                                           | Telemetry (Raw Weights) via MQTT
                                           v
+------------------------------------------------------------------------------------+
|                            2. Local Fog Node AI Broker                             |
|              +-------------------------------------------------------+             |
|              |               [MQTT Broker (Mosquitto)]               |             |
|              +---------------------------+---------------------------+             |
|                                          |                                         |
|                                          v                                         |
|              +-------------------------------------------------------+             |
|              |        [Spinal Posture Classifier (AI Engine)]        |             |
|              |         *Classifies into 5 seating postures*          |             |
|              +---------------------------+---------------------------+             |
|                                          |                                         |
|                     (If Bad Posture)     v     (Bridge Synchronization)            |
|       [Active Vibration Feedback] <------+-----> [Fog-to-Cloud Uploader]           |
+-----------------------------------------------------------+------------------------+
                                                            |
                                                            | AWS IoT Core (Secure MQTT)
                                                            v
+------------------------------------------------------------------------------------+
|                              3. Serverless AWS Cloud                               |
|   [AWS IoT Core Rules] ---> [AWS Lambda Services] ---> [Amazon DynamoDB (Store)]    |
+------------------------------------------+-----------------------------------------+
                                           |
                                           | REST APIs & Live WebSockets
                                           v
+------------------------------------------------------------------------------------+
|                       4. Astro Web Dashboard (This Repo)                           |
|      [React Live Monitor] <---> [Gamified Capybara Healthy Sitting Passport]       |
+------------------------------------------------------------------------------------+
```

---

## 🚀 Web App Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/tonguyentanphuong/smart-cushion-web.git
   cd smart-cushion-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server locally:
   ```bash
   npm run dev
   ```
4. Build for static production hosting:
   ```bash
   npm run build
   ```

---

## 🛠 Tech Stack (Web App)
- **Framework:** [Astro](https://astro.build/) (Static Site Generation with Island Architecture)
- **Interactive UI components:** [React](https://react.dev/) & [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Physical Animations:** [Framer Motion](https://www.framer.com/motion/) (Liquid spring interpolation)
- **Hosting:** [Vercel](https://vercel.com/)
