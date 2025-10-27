import fs from "fs/promises";
import path from "path";

export async function createJSON<T>(data: T, dir: string, fileName: string) {
  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, `${fileName}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
