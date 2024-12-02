import express, { Express } from "express";
import applyErrorHandling from "./functions/apply-error-handling";
import applyMiddleware from "./functions/apply-middleware";
import applyRoutes from "./functions/apply-routes";
import { Foods } from "../data/foods";

export const app: Express = express();

export class REST {
  constructor() {
    const prefix = "";

    applyMiddleware(app);
    applyRoutes(app, prefix);
    applyErrorHandling(app);

    const port = process.env.PORT || 5000;
    const server = app.listen(port, async () => {
      console.log("Server is running on port " + port);
      await deps.Websocket.init(server);
    });
  }
}
