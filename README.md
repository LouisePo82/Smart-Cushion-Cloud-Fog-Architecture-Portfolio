# Smart Cushion Cloud-Fog IoT System — Personal Project Note

This repository is my personal fork of our group project for the course **Cloud and Fog Computing in the Internet of Things**.

The project is a smart sitting system that connects edge sensing, local fog processing, cloud storage, and a user-facing dashboard/app. I keep this fork mainly as a record of my contribution and learning from the project.

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

Full technical implementation credit belongs to the team members who developed the web platform, companion app, edge node, fog node, AI engine, and AWS serverless cloud layer.

This fork does not claim ownership of the full source code. It is mainly used to show my role in the project and to keep the project visible in my academic portfolio.

## My Role

**Cloud-Fog Architecture & Dashboard Contributor**

At the beginning of the project, I joined the architecture discussion and helped align the fog-cloud-app logic.

My main contribution was not coding the final AWS cloud backend. Instead, I focused on the system design side, including:

* Fog-to-cloud output direction
* Cloud-to-app response logic
* Dashboard metric definition
* App/dashboard review
* Presentation and live demo preparation

During the technical implementation phase, I had health issues, so other team members completed the final cloud backend implementation. I still contributed through system review, dashboard feedback, and demo/presentation support.

## My Contribution Areas

### 1. Cloud-Fog-App Architecture Alignment

I helped discuss how the system should divide responsibilities across the fog, cloud, and app layers.

The main idea was:

* Fog handles real-time local processing and posture output
* Cloud stores data, performs light aggregation, and provides API responses
* App displays user-friendly information from the cloud API

A key point I supported was that the app should not query the database directly. The cloud should return clean and simple responses that are ready for the dashboard.

### 2. Fog Output and Data Flow Discussion

I helped align the simplified data flow from fog to cloud.

The discussion focused on three types of records:

* Summary records for each sitting session
* Event records for important user-facing events
* Low-frequency telemetry records when needed

This helped keep the project scope practical and suitable for a small course demo.

### 3. Cloud-to-App Output Design

I helped define what kind of information the cloud should return to the app, especially for:

* Dashboard summary
* Session history

The goal was to make the app easier to build and easier for users to understand.

### 4. Dashboard Metrics

I helped define the main dashboard metrics for users:

* Total sitting time
* Poor posture time
* Alert count
* Posture distribution

These metrics were selected because they are simple, easy to explain, and useful for showing sitting behavior.

### 5. App and Dashboard Review

I reviewed the app/dashboard flow and gave feedback on pages such as:

* My Coach
* My Insights
* My Sessions

My review focused on making the dashboard clearer, more supportive, and more connected to the wellness purpose of the smart cushion.

### 6. Presentation and Live Demo Support

I also helped prepare the final presentation and live demo story.

The demo flow connected:

* Live Monitor for real-time posture
* My Coach for daily guidance
* My Insights for weekly behavior
* My Sessions for session review

The final message was that this project is not only a smart cushion prototype, but a small cloud-fog wellness system that gives real-time support and long-term posture insight.

## Note

Some internal notes and specification drafts were used during the project, but they are not published in this repository. This README only summarizes my contribution at a high level.

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
