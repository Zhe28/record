import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const debug = true;

export const getSidebarList = (directoryPath: string): string[] => {
  directoryPath = directoryPath.trim();
  let fileList = readdirSync(resolve(`./src${directoryPath}`));

  debug && console.log(`\x1B[35m处理文件夹`, resolve(`./src${directoryPath}`));

  // 对路径进行修正
  fileList.map((file, index) => {
    // 修正侧边栏的路径地址
    fileList[index] = `${directoryPath}/${file}`;
  });

  // 过滤某些不需要展示的路径
  fileList = fileList.filter((file) => {
    return !file.endsWith("images");
  });

  // 侧边栏排序
  fileList.sort((item1, item2): number => {
    // 检测是比较的文件是不是 readme.md
    if (item1.toLowerCase().endsWith("readme.md")) return -1;
    else if (item2.toLowerCase().endsWith("readme.md")) return 1;
    else return 0;
  });

  debug && console.log(`\x1B[33m ${directoryPath} 文件夹下的文件列表`, fileList);

  return fileList;
};
