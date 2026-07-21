import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import styles from './TrustCardPage.module.css'

export function TrustCardPage() {
  const navigate = useNavigate()
  const [shareStatus, setShareStatus] = useState('')

  const handleShare = async () => {
    const shareText = 'MSME Owner — Certified Network Tier'
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Voucher Trust Card', text: shareText })
        setShareStatus('Trust Card shared.')
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        setShareStatus('Trust Card details copied to clipboard.')
      } else {
        setShareStatus('Sharing is unavailable in this browser.')
      }
    } catch {
      setShareStatus('Sharing cancelled.')
    }
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Trust Card</h1>

      <div className={`card card--dashed ${styles.card}`}>
        <div className={styles.qr} aria-hidden="true" />
        <div className={styles.divider} />
        <p className={styles.name}>MSME Owner</p>
        <div className={styles.divider} />
      </div>

      <div className={styles.footer}>
        {shareStatus && <p role="status" className={styles.status}>{shareStatus}</p>}
        <Button fullWidth onClick={handleShare}>
          Share Card
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-score')}>
          Back
        </Button>
      </div>
    </div>
  )
}
