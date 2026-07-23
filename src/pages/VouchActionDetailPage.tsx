import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { VOUCH_ACTIONS } from '../data/constants'
import { usePrototype } from '../context/prototype-context'

const ACTION_DESTINATIONS: Record<string, string> = {
  'mesh-exchange': '/mesh',
  'scarcity-signal': '/scarcity',
  'supplier-forest': '/discovery',
}

export function VouchActionDetailPage() {
  const { actionId } = useParams()
  const navigate = useNavigate()
  const action = VOUCH_ACTIONS.find((a) => a.id === actionId)
  const { startedActions, startAction } = usePrototype()
  const isStarted = actionId ? startedActions.includes(actionId) : false
  const destination = actionId ? ACTION_DESTINATIONS[actionId] : undefined

  if (!action) {
    return (
      <div className="screen">
        <p>Action not found.</p>
        <Button onClick={() => navigate('/vouch-actions')}>Back to list</Button>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">{action.title}</h1>
      <div className="card">
        <p style={{ margin: 0, lineHeight: 1.5 }}>{action.description}</p>
        <p style={{ margin: '16px 0 0', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          Starting this action records the trust-building path as in progress. This prototype
          does not verify completion or award real trust points.
        </p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Button
          fullWidth
          disabled={isStarted && !destination}
          onClick={() => {
            if (actionId) startAction(actionId)
            navigate(destination ?? '/vouch-actions')
          }}
        >
          {isStarted
            ? destination
              ? 'Continue action'
              : 'Already started'
            : 'Start action'}
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-actions')} style={{ marginTop: 8 }}>
          Back to list
        </Button>
      </div>
    </div>
  )
}
