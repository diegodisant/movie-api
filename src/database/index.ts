import { createConnection } from "typeorm";

const initDbHandler = async (): Promise<void> => {
  try {
    await createConnection();
    console.log("Database successfully initialized");
  } catch(error) {
    console.log(`Error: database failed in create connection ${(error as Error).message}`);
  }
};
