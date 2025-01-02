import { readdirSync } from "fs";
import { Server } from "http";
import { resolve } from "path";
import { Server as SocketServer } from "socket.io";
import { SessionManager } from "./modules/session-manager";
import { parse } from "cookie";

export class Websocket {
  public io!: SocketServer;
  public events = new Map();
  public session = new SessionManager();
  public async init(server: Server) {
    this.io = new SocketServer(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    const dir = resolve(__dirname, "ws-events");
    const files = readdirSync(dir);
    for (const file of files) {
      const Event = require(`./ws-events/${file}`).default;
      try {
        const event = new Event();
        this.events.set(event.on, event);
      } catch (error) {
        console.error("Error on event: ", file);
      }
    }

    this.io.use((socket, next) => {
      try {
        const cookies = socket.handshake.headers.cookie;
        const token = parse(cookies!)["access_token"];
        socket.data.userId = deps.WSGuard.decodeToken(token!);
        console.log("on middleware: ", token, socket.data.userId, socket.id);
        next();
      } catch (error) {
        console.log("Error: ", error);
        next(new Error("Not authorized"));
      }
    });

    this.io.on("connection", async (client) => {
      const user = client.data.userId;
      let cnt = 0;
      while (cnt >= 0) {
        try {
          cnt++;
          if (cnt >= 10) {
            client.disconnect();
            return;
          }
          const group = await deps.GroupMembers.getByUserId(user);
          console.log(
            "Joined: ",
            group.map((x) => x.group!.toString())
          );
          group.forEach((member) => {
            client.join(member.group!.toString());
          });
          client.join(user);
          cnt = -1;
        } catch {}
      }
      client.on("disconnect", async () => {
        console.log("Disconnect: ", client.id);
      });
      for (const event of this.events.values()) {
        client.on(event.on, async (data: any) => {
          try {
            const actions = await event.invoke(this, client, data);
            for (const action of actions) {
              this.handle(action);
            }
          } catch (error: any) {
            console.log(error);
            client.emit("error", { message: error.message });
          }
        });
      }
    });

    console.log("Connected to websocket.");
  }

  public handle(action: any) {
    this.io.to(action.to).emit(action.emit, action.data);
  }
}
