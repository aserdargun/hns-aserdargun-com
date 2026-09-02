import { execFileSync, spawn } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, readlinkSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const runtimeDir = join(projectRoot, '.codex', 'runtime')
const stateFile = join(runtimeDir, 'preview.json')
const logFile = join(runtimeDir, 'preview.log')
const port = Number(process.env.HNS_PREVIEW_PORT ?? 4173)

function readState() {
  if (!existsSync(stateFile)) return null
  try { return JSON.parse(readFileSync(stateFile, 'utf8')) } catch { return null }
}

function isRunning(pid) {
  try { process.kill(pid, 0); return true } catch { return false }
}

function processCwd(pid) {
  try { return resolve(readlinkSync(`/proc/${pid}/cwd`)) } catch {
    try {
      const output = execFileSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' })
      const line = output.split('\n').find((value) => value.startsWith('n'))
      return line ? resolve(line.slice(1)) : null
    } catch { return null }
  }
}

function owned(state) {
  return state && Number.isInteger(state.pid) && state.cwd === projectRoot && isRunning(state.pid) && processCwd(state.pid) === projectRoot
}

function status() {
  const state = readState()
  if (!state || !owned(state)) {
    console.log('preview: stopped')
    return false
  }
  console.log(`preview: running | pid=${state.pid} url=http://127.0.0.1:${state.port}`)
  return true
}

async function start() {
  if (status()) return
  mkdirSync(runtimeDir, { recursive: true })
  const log = openSync(logFile, 'a')
  const child = spawn(process.execPath, [join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: projectRoot, detached: true, stdio: ['ignore', log, log],
  })
  child.unref(); closeSync(log)
  const state = { pid: child.pid, port, command: 'vite preview', cwd: projectRoot, startedAt: new Date().toISOString() }
  writeFileSync(stateFile, `${JSON.stringify(state, null, 2)}\n`)
  await new Promise((resolveWait) => setTimeout(resolveWait, 650))
  if (!owned(state)) throw new Error(`Preview failed to start. Inspect ${logFile}`)
  console.log(`preview: started | pid=${state.pid} url=http://127.0.0.1:${port}`)
}

async function stop() {
  const state = readState()
  if (!state) { console.log('preview: already stopped'); return }
  if (!owned(state)) throw new Error('Refusing to stop: runtime PID is not owned by this checkout')
  process.kill(state.pid, 'SIGTERM')
  for (let attempt = 0; attempt < 20 && isRunning(state.pid); attempt += 1) await new Promise((resolveWait) => setTimeout(resolveWait, 100))
  if (isRunning(state.pid)) throw new Error(`Preview PID ${state.pid} did not stop cleanly`)
  rmSync(stateFile, { force: true })
  console.log('preview: stopped')
}

const command = process.argv[2]
if (command === 'start') await start()
else if (command === 'status') status()
else if (command === 'stop') await stop()
else throw new Error('Usage: preview-control.mjs <start|status|stop>')
