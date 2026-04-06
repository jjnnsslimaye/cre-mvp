'use client'
import { useState } from 'react'
import type { EnrichmentScore } from '@/lib/enrichment'

const LAYERS = [
  { key: 'ucc',       label: 'UCC Filings'    },
  { key: 'sunbiz',    label: 'Entity (Sunbiz)' },
  { key: 'skipTrace', label: 'Skip Trace'     },
  { key: 'geocoding', label: 'Geocoding'      },
] as const

export default function EnrichmentBadge({ score }: { score: EnrichmentScore }) {
  const [hovered, setHovered] = useState(false)

  const radius = 18
  const strokeWidth = 4
  const cx = 24
  const cy = 24
  const normalizedScore = score.total / 4  // 0 to 1

  // Arc goes from 180deg (left) to 0deg (right) — a semicircle
  // In SVG coords, we map this to the bottom half of a circle
  const startAngle = Math.PI        // 180deg — left
  const endAngle = 0                // 0deg — right
  const totalAngle = Math.PI        // 180deg sweep

  // Needle angle based on score
  const needleAngle = Math.PI - (normalizedScore * Math.PI)
  // 0 score = left, 4/4 = right

  // Arc path helper
  function polarToCartesian(angle: number) {
    return {
      x: cx + radius * Math.cos(angle),
      y: cy - radius * Math.sin(angle),
    }
  }

  const arcStart = polarToCartesian(Math.PI)   // left point
  const arcEnd = polarToCartesian(0)           // right point

  // Fill arc end point based on score
  const fillEnd = polarToCartesian(needleAngle)

  // Needle tip
  const needleTip = {
    x: cx + (radius - 2) * Math.cos(needleAngle),
    y: cy - (radius - 2) * Math.sin(needleAngle),
  }

  const gaugeColor = score.total === 4
    ? '#65CCE6'
    : score.total >= 2
      ? '#7cacdb'
      : '#94a3b8'

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'default'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        width="48"
        height="28"
        viewBox="0 0 48 28"
        style={{ overflow: 'visible', flexShrink: 0 }}
      >
        {/* Track arc — gray background semicircle */}
        <path
          d={`M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Fill arc — colored portion based on score */}
        {score.total > 0 && (
          <path
            d={`M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 0 1 ${fillEnd.x} ${fillEnd.y}`}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke={gaugeColor}
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle
          cx={cx}
          cy={cy}
          r={2}
          fill={gaugeColor}
        />
      </svg>

      {/* Hover tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1e293b',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '10px 14px',
          width: '200px',
          zIndex: 200,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          fontSize: '12px',
          lineHeight: '1.6',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontWeight: 700,
            marginBottom: '8px',
            color: '#65CCE6',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Enrichment Layers
          </div>
          {LAYERS.map(layer => (
            <div key={layer.key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <span style={{
                color: score[layer.key] ? '#65CCE6' : '#94a3b8',
                fontSize: '13px'
              }}>
                {score[layer.key] ? '✓' : '✗'}
              </span>
              <span style={{
                color: score[layer.key] ? '#ffffff' : '#94a3b8'
              }}>
                {layer.label}
              </span>
            </div>
          ))}
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            backgroundColor: '#1e293b',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          }} />
        </div>
      )}
    </div>
  )
}
