import { readdir } from "fs/promises";
import { basename, parse, join, sep } from "path";
import { cwd } from "process";

export const canonical = "it";

export function getLanguageFromFileName(fileName: string) {
  return fileName
    .replace(basename(fileName), "")
    .replace(join(cwd(), "src", "content", "/").replaceAll(sep, "/"), "")
    .replace("/", "");
}

export function getUrlFromFileName(fileName: string) {
  let name = parse(fileName).name;
  if (name == "index") name = "";
  return "/" + name;
}

export async function getLanguagesList() {
  const languages: string[] = (
    await readdir("src/content", { withFileTypes: true })
  )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return languages;
}

const registry = {
  "/mactardiouf": {fr: "/mactardiouf"},
  "/cooperativa": {fr: "/coperatif"},
  "/chi-siamo": { fr: "/a-props-de-nous" },
  "/progetti": { fr: "/projets" },
};

export function translateUrl(url: string, lang: string): string {
  const urlOk = (url.startsWith("/") ? "" : "/") + url;
  if (urlOk == "/" || lang == canonical) return urlOk;
  
  return registry[urlOk][lang];
}
