import fs from "fs/promises";
import path from "path";

export async function createLog(data: string, dir: string, fileName: string) {
  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, `${fileName}.log`);
  await fs.appendFile(filePath, data, "utf8");
}
