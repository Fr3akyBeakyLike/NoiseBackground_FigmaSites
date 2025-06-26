# 🌀 Noise Background for Figma Sites

Animated noise background component for Figma Sites, built with React and powered by Figma’s AI-generated code.  
Add subtle texture and motion to your hero section without killing performance.

---

## ✨ Features

- Animated noise using `<canvas>`
- Fully customizable via sliders:
  - Intensity
  - Opacity
  - Animation speed
  - (Planned) Background color
- Fixed background, no pointer interference
- Clean Figma Sites integration via `defineProperties`

---

## 🚀 Installation

1. Copy the `NoiseBackground` component into your project
2. Place it at the root of your hero or background layer
3. Customize values via the Figma Sites properties panel

---

##⚠️ Known Issue
The backgroundColor prop is currently not applied correctly to the canvas fill.
If you know a way to fix this in React + <canvas>, please drop a comment or open an issue.
I'd love to enable dark mode themes soon.

---

##🧪 Live Example
👉 See it in action on [my portfolio site](https://www.notafr8studio.com)  
Check the hero section for animated background noise.

## 💻 Example usage

```tsx
<NoiseBackground
  noiseIntensity={20}
  animationSpeed={3}
  opacity={0.05}
  backgroundColor="white"
/>
---


