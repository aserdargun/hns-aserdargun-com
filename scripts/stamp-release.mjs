import { writeFile } from 'node:fs/promises'

const commit = process.env.GITHUB_SHA
const runId = process.env.GITHUB_RUN_ID

if (!commit || !/^[a-f0-9]{40}$/.test(commit)) {
  throw new Error('GITHUB_SHA must be a full Git commit SHA')
}

if (!runId || !/^\d+$/.test(runId)) {
  throw new Error('GITHUB_RUN_ID must be numeric')
}

await writeFile('dist/release.json', `${JSON.stringify({ commit, runId })}\n`, 'utf8')
