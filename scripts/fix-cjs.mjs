import {
  readdir,
  rename,
  readFile,
  writeFile,
} from "fs/promises"

let files = await readdir("./dist/cjs")

for await (let file of files) {
  let filePath = `./dist/cjs/${file}`
  let content = await readFile(filePath, "utf-8")
  content = content.replace(
    /(?<=require\(".*)\.js(?!=")/g,
    ".cjs"
  )

  content = content.replace(
    /Promise\.resolve\(\)\.then\(\(\) => __importStar\(require\("(.*)"\)\)\)/g,
    `import("$1")`
  )

  await writeFile(filePath, content)
  await rename(filePath, filePath.replace(".js", ".cjs"))
}
