# Smart Cushion Cloud-Fog IoT System — Personal Portfolio Note

This repository is my personal fork/archive of our group project for the course **Cloud and Fog Computing in the Internet of Things**.

The original project is the **Smart Cushion Cloud-Fog IoT Ecosystem**, a smart sitting system that connects edge sensing, local fog processing, cloud storage/analytics, and a user-facing dashboard.

## Course Context

* Course: Cloud and Fog Computing in the Internet of Things
* Project type: Final group project
* Institution: National Taiwan University of Science and Technology
* Project topic: Smart Cushion Cloud-Fog IoT Ecosystem

## Source Code and Team Credit

This repository is forked from the original group project repository.

Original central repository:
https://github.com/tonguyentanphuong/smart-cushion-web

Project website:
https://smart-cushion-web.vercel.app

Companion app demo:
https://smart-cushion-app.vercel.app/live-monitor

Full technical implementation credit belongs to the team members who developed the web platform, companion app, edge node, fog node, AI engine, and AWS Serverless cloud layer.

This fork is kept as a transparent portfolio record of my contribution. It does not claim ownership of the full technical source code.

## My Role

**Cloud-Fog Architecture & Dashboard Contributor**

My contribution focused on architecture discussion, fog-cloud-app data alignment, dashboard metric definition, app/dashboard review, and final presentation/demo support.

Due to health issues during the technical implementation phase, I was not the main implementer of the AWS cloud backend. The final cloud implementation was completed by other team members.

## My Contribution Areas

### 1. Cloud-Fog-App Architecture Alignment

I helped align the main responsibility of each layer:

* Fog: real-time local processing, posture result generation, and telemetry/event/summary output
* Cloud: data storage, lightweight aggregation, AWS Lambda processing, and API response
* App: user-facing display layer that calls cloud APIs instead of querying the database directly

The main idea was to keep the app simple and let the cloud return clean, UI-ready responses.

### 2. Fog Output and Data Flow Alignment

I helped define the simplified fog-to-cloud output direction for team discussion, including:

* Summary records for each sitting session
* Event records for important user-facing events
* Low-frequency telemetry records when lightweight tracking is needed

This helped the team keep the data flow simple and aligned with the dashboard scope.

### 3. Cloud-to-App Output Design

I contributed to the cloud-to-app output direction for dashboard use cases, especially:

* Dashboard summary response
* Session history response

The goal was to make the cloud output easy for the app to display, instead of asking the app to process raw backend data.

### 4. Dashboard Metrics Definition

I helped define the main user-facing dashboard metrics:

* Total sitting time
* Poor posture time
* Alert count
* Posture distribution

The metric design focused on being easy to understand, easy to demo, and suitable for a small course project.

### 5. App UI and Dashboard Review

I reviewed and gave feedback on the app/dashboard flow, especially for:

* My Coach
* My Insights
* My Sessions

The review focused on making the dashboard clearer, more user-friendly, and more connected to the wellness goal of the smart cushion system.

### 6. Presentation and Live Demo Support

I helped refine the final presentation story and live demo flow.

The demo explanation connected the real-time Live Monitor, daily guidance in My Coach, weekly behavior in My Insights, and session review in My Sessions. I also helped shape the final message that the project is not only a smart cushion prototype, but a small cloud-fog wellness ecosystem.

## Note on Internal Documents

Some detailed specification notes and team alignment documents were prepared during the project, but they are not published in this repository. This README only summarizes my contribution at a portfolio level.

---

The original project README continues below.

---

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
| **🔌 Hardware Node** | [smart-cushion-edge](https://github.com/MuoiVung/smart-cushion-edge) | ESP32-S firmware for 9-channel FSR sensor acquisition and telemetry publishing. | ESP-IDF, C++, FreeRTOS, MQTT |
| **📡 Local Fog Node** | [smart-cushion-fog-node](https://github.com/MuoiVung/smart-cushion-fog-node) | Edge server performing real-time AI posture classification and local broker queue management. | Node.js, Mosquitto, PostgreSQL |
| **🧠 AI Engine** | [smart-cushion-AI](https://github.com/MuoiVung/smart-cushion-AI) | Training pipelines and weights for the 5-Posture Sitting Classification model. | PyTorch, NumPy, Scikit-Learn |
| **☁️ Serverless Cloud** | [smart-cushion-cloud](https://github.com/MuoiVung/smart-cushion-cloud) | AWS Serverless cluster handling persistent telemetry pipelines, analytics, and history API. | AWS IoT Core, Lambda, DynamoDB |

---

## 📐 System Architecture Diagram

Our solution utilizes an optimized **4-Tier Cloud-Fog Topology** to isolate heavy AI computing workloads on the edge, keeping cloud storage costs low while ensuring sub-second local sensory feedback loop:

```text
+------------------------------------------------------------------------------------+
|                             1. IoT Edge Hardware Node                              |
|   [FSR Matrix (9 Sensors)] --- (Analog Signals) ---> [ESP32 Microcontroller]      |
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
|                       4. Next.js Companion App Dashboard                           |
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
