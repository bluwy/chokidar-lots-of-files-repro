import fs from 'fs'
import path from 'path'

// NOTE: Copilot wrote this code for me. Prompt:
// Generate a script that allows generating thousands of files and files inside
// directories given parameters, including the number of files to generate and the
// directory depth. The number of files will be equally distributed in each number of directories

// Update variables here
const baseDir = './src'
const numFiles = 5000
const dirDepth = 2

fs.rmSync(baseDir, { recursive: true, force: true })
generateFiles(baseDir, numFiles, dirDepth)

function generateFiles(baseDir, numFiles, dirDepth) {
  if (dirDepth < 1) {
    throw new Error('Directory depth must be at least 1')
  }

  const filesPerDir = Math.ceil(numFiles / Math.pow(10, dirDepth - 1))
  createDirectoriesAndFiles(baseDir, dirDepth, filesPerDir, numFiles)
}

function createDirectoriesAndFiles(
  currentDir,
  depth,
  filesPerDir,
  remainingFiles
) {
  if (depth === 0) {
    for (
      let i = 0;
      i < filesPerDir && remainingFiles > 0;
      i++, remainingFiles--
    ) {
      const filePath = path.join(currentDir, `file${remainingFiles}.txt`)
      fs.writeFileSync(filePath, 'Hello, World!')
    }
    return
  }

  for (let i = 0; i < 10 && remainingFiles > 0; i++) {
    const newDir = path.join(currentDir, `dir${i}`)
    fs.mkdirSync(newDir, { recursive: true })
    const filesInThisDir = Math.min(filesPerDir, remainingFiles)
    createDirectoriesAndFiles(newDir, depth - 1, filesPerDir, remainingFiles)
    remainingFiles -= filesInThisDir
  }
}
