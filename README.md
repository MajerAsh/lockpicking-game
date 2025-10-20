# 🔐 Lockpicking Game (Phaser 3)

A simple **Phaser 3** lock-picking game where you can click and drag **pins** on a **pin-tumbler lock** to set them and open the lock.  
Built as a fun project for learning game dev and simulating lock mechanics visually.

---

## 🎮 Features

- 2D lock rendered in Phaser
- Interactive **pin dragging** with mouse
- **Torque mechanic** (hold `SPACE` to apply tension)
- Pins **set** in place when tension is applied and height is correct
- Simple win condition when all pins are set
- Modular, beginner-friendly structure (`/src/scenes/GameScene.js`)

## 🧱 Project Structure

lockpicking-game/
│
├── index.html
├── package.json
├── README.md
├── src/
│ ├── main.js
│ ├── scenes/
│ │ └── GameScene.js
│ └── assets/
│ ├── lockbody.png
│ ├── pin.png
│ ├── spring.png
│ └── set-click.wav

---

## ⚙️ Setup & Development

### 1. Install dependencies

```bash
npm install
```
