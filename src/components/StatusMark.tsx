import type { ReactNode } from 'react'
import type { EvidenceKind, RadarState } from '../content/schema'

type Status = EvidenceKind | RadarState | 'supported' | 'partial' | 'unknown'

export function StatusMark({ status, children }: { status: Status; children: ReactNode }) {
  return <span className={`status-mark status-${status}`}><span className="status-dot" aria-hidden="true" />{children}</span>
}
