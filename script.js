const fs = require('fs')
const path = require('path')

// 指定要遍历的文件夹路径
const folderPath = './'

// 用于存储文件名和相对路径的数组
const fileData = []

// 遍历文件夹并收集文件名和相对路径
function collectFileData(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isFile() && path.extname(file) === '.html') {
      // 如果是HTML文件，将文件名和相对路径添加到数组中
      fileData.push({
        fileName: file,
        relativePath: path.relative(folderPath, filePath),
      })
    } else if (stats.isDirectory()) {
      // 如果是子文件夹，递归遍历
      collectFileData(filePath)
    }
  })
}

// 开始遍历
collectFileData(folderPath)

// 生成Markdown文档内容

const markdownContent = fileData
  .map((item) => {
    const itemTitle = item.fileName?.split('.html')?.[0] || item.fileName
    return `* [${itemTitle}](https://laclys.github.io/css-practice-2023/${item.relativePath})`
  })
  .join('\n')

const dataLen = fileData?.length || 0

// 指定要写入的Markdown文件路径
const markdownFilePath = './README.md'
const indexPagePath = './index.md'

// 将Markdown内容写入文件

const title = `
  CSS Demo
  \n
  \n
`

const footer = dataLen
  ? `
  \n
  \n
  Total ${dataLen}  ✅
  \n
`
  : ''

fs.writeFileSync(markdownFilePath, title + markdownContent + footer, 'utf-8')
fs.writeFileSync(indexPagePath, markdownContent, 'utf-8')

console.log(`文件已生成: ${markdownFilePath}`)
