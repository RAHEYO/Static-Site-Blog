import path from "path";
import fs from "fs";
import matter from "gray-matter";

export const readFolder = (folderPath: string) => {
    const dirPath: string = path.join(process.cwd(), folderPath);

    return { files: fs.readdirSync(dirPath), dirPath };
}

export const generateGrayMatter = ({ files, dirPath }: { files: string[], dirPath: string }) => files.map(fileName => {
    const filePath = path.join(dirPath, fileName);
    const file: string  = fs.readFileSync(filePath, { encoding: "utf-8" });

    const grayMatter = matter(file);
    return grayMatter;
});
