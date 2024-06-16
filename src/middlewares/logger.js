const fs = require("fs").promises;
const path = require("path");

const ensureLogFileExists = async (filePath) => {
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, "", { flag: "a" });
  } catch (err) {
    console.error("Error ensuring log file exists:", err);
  }
};

const logRequest = async (req, res, next) => {
  const logFilePath = path.join(__dirname, "../../logs/requests.log");
  await ensureLogFileExists(logFilePath);

  const log = `${new Date().toISOString()} - ${req.method} ${
    req.originalUrl
  }\n`;
  try {
    await fs.appendFile(logFilePath, log);
  } catch (err) {
    console.error("Error logging request:", err);
  }
  next();
};

module.exports = logRequest;
