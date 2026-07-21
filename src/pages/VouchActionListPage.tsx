import { useNavigate } from 'react-router-dom'
import { VOUCH_ACTIONS } from '../data/constants'
import { usePrototype } from '../context/prototype-context'
import styles from './VouchActionListPage.module.css'

export function VouchActionListPage() {
  const navigate = useNavigate()
  const { startedActions, startAction } = usePrototype()

  const handleAction = (id: string) => {
    startAction(id)
    if (id === 'mesh-exchange') {
      navigate('/mesh')
    } else if (id === 'scarcity-signal') {
      navigate('/scarcity')
    } else if (id === 'supplier-forest') {
      navigate('/discovery')
    } else {
      navigate(`/vouch-actions/${id}`)
    }
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Vouch Action List</h1>
      <p className={styles.subtitle}>
        Legitimate actions to build trust. You cannot formally request a vouch from others.
      </p>
      <p className={styles.progress} role="status">
        {startedActions.length} of {VOUCH_ACTIONS.length} trust-building paths started
      </p>

      <ul className={styles.list}>
        {VOUCH_ACTIONS.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => handleAction(action.id)}
            >
              <span className={styles.icon} aria-hidden="true">
                ◻
              </span>
              <span className={styles.content}>
                <span className={styles.title}>{action.title}</span>
                {startedActions.includes(action.id) && (
                  <span className={styles.status}>Started</span>
                )}
                <span className={styles.description}>{action.description}</span>
              </span>
              <span className={styles.chevron} aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
