import chokidar from 'chokidar'
// import chokidar from 'chokidar3'
import { exec } from 'node:child_process'

console.log('start')
const watcher = chokidar.watch('./src/')

// uncomment for debugging to test if file watching actually works
// (it still works even with EBADF errors)
// watcher.on('all', (event, path) => {
//   if (event === 'add' || event === 'addDir') return
//   console.log('chokidar', event, path)
// })

console.log('watching')
await wait(2000)
// uncomment for debugging if needed
// console.log(watcher.getWatched())

console.log('executing ls')
await new Promise((resolve, reject) => {
  exec('ls', [], (error, stdout) => {
    if (error) {
      reject(error)
    } else {
      console.log('=== result ===')
      console.log(stdout.toString())
      console.log('=== result end ===')
      resolve()
    }
  })
})

console.log('closing watcher')
await watcher.close()
console.log('end')

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
