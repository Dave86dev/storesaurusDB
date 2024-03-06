import app from "./app"; 
import { initDbConnection } from "./db"; 
import appConfig from "../config";

const PORT = appConfig.port;

const startServer = async () => {
  try {
    await initDbConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
