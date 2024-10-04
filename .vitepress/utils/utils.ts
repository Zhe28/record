import { Dirent, readdirSync } from "node:fs";

/**
 * todo: 获取文件夹内部所有的文件夹
 * @param path 文件夹的路径
 * @param filters 是否过滤其中的某些文件夹
 * @param text 是否只显示 text 文档， 默认 false
 */
function getFiles(path: string, filters?: string[], text = false): Dirent[] {
  let files: Dirent[] = readdirSync(path, { withFileTypes: true });

  // 确定目标是文件夹还是文件，然后按照屏蔽词屏蔽相关的文件
  files = files.filter((directory) => (text ? !directory.isDirectory() : directory.isDirectory()));
  filters &&
    filters.forEach((filter: string) => {
      files = files.filter((directory: Dirent) => {
        return !(directory.name === filter);
      });
    });

  // 由于文件按照约定是进行日期管理 ，因此直接用上数字排序
  files.sort(
    (first, second) => parseInt(first.name.split(".")[0]) - parseInt(second.name.split(".")[0]),
  );
  return files;
}

export { getFiles };
