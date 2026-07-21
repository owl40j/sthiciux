import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GATE_REQUIRED_SCORE,
  SCORE_PRESETS,
  type ScorePreset,
} from '../data/constants'
import { PrototypeContext, type SimulatedOutcome } from './prototype-context'

const STORAGE_KEY = 'voucher-prototype-preset'
const OUTCOME_STORAGE_KEY = 'voucher-prototype-outcome'

function readPreset(): ScorePreset {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'restricted' || stored === 'limited' || stored === 'full') {
    return stored
  }
  return 'restricted'
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [scorePreset, setScorePresetState] = useState<ScorePreset>(readPreset)
  const [meshExchangeCompleted, setMeshExchangeCompleted] = useState(false)
  const [vouchSubmitted, setVouchSubmitted] = useState(false)
  const [simulatedOutcome, setSimulatedOutcomeState] = useState<SimulatedOutcome>(() =>
    localStorage.getItem(OUTCOME_STORAGE_KEY) === 'decline' ? 'decline' : 'accept',
  )

  const setScorePreset = useCallback((preset: ScorePreset) => {
    setScorePresetState(preset)
    localStorage.setItem(STORAGE_KEY, preset)
  }, [])

  const setSimulatedOutcome = useCallback((outcome: SimulatedOutcome) => {
    setSimulatedOutcomeState(outcome)
    localStorage.setItem(OUTCOME_STORAGE_KEY, outcome)
  }, [])

  const value = useMemo(
    () => ({
      vouchScore: SCORE_PRESETS[scorePreset].score,
      scorePreset,
      setScorePreset,
      gateRequiredScore: GATE_REQUIRED_SCORE,
      meshExchangeCompleted,
      setMeshExchangeCompleted,
      vouchSubmitted,
      setVouchSubmitted,
      simulatedOutcome,
      setSimulatedOutcome,
    }),
    [
      scorePreset,
      setScorePreset,
      meshExchangeCompleted,
      vouchSubmitted,
      simulatedOutcome,
      setSimulatedOutcome,
    ],
  )

  return (
    <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>
  )
}
