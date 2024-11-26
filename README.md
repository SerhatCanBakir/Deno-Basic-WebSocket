
# WebSocket Module

A simple WebSocket project with both client and server modules. It provides an event-based structure to make WebSocket communication easy.

## 🚀 Features
- **Event-based Structure:** Manage events with `on` and `emit`.
- **WebSocket Server:** Supports multiple clients.
- **WebSocket Client:** Easily connects to the server.
- **Room Management:** Send messages to specific groups (rooms).

---

## 📂 Project Structure
```
WebSocketModule/
├── src/
│   ├── EventEmitter.ts       # Event management
│   ├── SimpleWebSocket.ts    # Basic WebSocket client
│   ├── RoomManager.ts        # Room management
│   ├── WebSocketServer.ts    # WebSocket server
│   └── SocketClient.ts       # WebSocket client
├── test/
│   └── EventEmitter.test.ts  # Tests for EventEmitter
└── .git/                     # Git files
```

---

## 🛠 How to Install
1. Clone this project:
   ```bash
   git clone <repository_url>
   cd WebSocketModule
   ```

2. Import the module into your project:
   ```typescript
   import { WebSocketServer } from "./src/WebSocketServer.ts";
   import { SocketClient } from "./src/SocketClient.ts";
   ```

---

## 📖 Usage Example

### WebSocket Server
```typescript
import { WebSocketServer } from "./src/WebSocketServer.ts";

const server = new WebSocketServer(8080);

server.on("connection", (client) => {
  console.log("A new client connected:", client.id);

  client.on("message", (data) => {
    console.log("Message from client:", data);
    client.send("Hello, client!");
  });

  client.on("disconnect", () => {
    console.log("Client disconnected:", client.id);
  });
});

console.log("WebSocket server running on ws://localhost:8080");
```

### WebSocket Client
```typescript
import { SocketClient } from "./src/SocketClient.ts";

const client = new SocketClient("ws://localhost:8080");

client.on("open", () => {
  console.log("Connected to the server!");
  client.send("Hello, server!");
});

client.on("message", (data) => {
  console.log("Message from server:", data);
});

client.on("close", () => {
  console.log("Disconnected from the server.");
});
```

---

## To-Do
- [ ] Add encryption for secure messages.
- [ ] Implement automatic reconnection.
- [ ] Add more tests and examples.

---

## License
This project is licensed under the MIT License.
