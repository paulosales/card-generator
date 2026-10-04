import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor" viewBox="0 0 32 32">
      <path d="M16.004 3C9.377 3 4 8.373 4 14.996c0 2.33.653 4.507 1.787 6.364L4 29l7.823-1.748A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12.004C28 8.373 22.627 3 16.004 3Zm6.98 17.08c-.294.826-1.46 1.515-2.414 1.714-.642.133-1.48.238-4.298-.924-3.605-1.49-5.927-5.147-6.108-5.385-.179-.238-1.46-1.944-1.46-3.706 0-1.762.924-2.627 1.252-2.985.294-.317.78-.46 1.246-.46.15 0 .285.008.407.014.356.015.536.036.77.598.294.71.996 2.473 1.08 2.653.086.18.144.391.028.628-.108.244-.166.36-.33.548-.165.19-.337.332-.502.535-.151.179-.316.374-.136.69.18.31.8 1.321 1.72 2.14 1.182 1.053 2.166 1.388 2.482 1.546.316.158.503.136.69-.08.237-.272.526-.714.82-1.15.207-.306.47-.343.78-.227.316.11 1.98.933 2.32 1.102.338.17.564.252.645.396.082.143.082.826-.212 1.653Z" />
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.9 2H22l-7.2 8.26L23 22h-6.6l-5.17-6.78L5.3 22H2.2l7.7-8.84L1.5 2h6.76l4.67 6.2L18.9 2Zm-1.16 18.17h1.72L7.36 3.73H5.52l12.22 16.44Z" />
    </svg>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.68.64.7 1.03 1.59 1.03 2.69 0 3.85-2.35 4.7-4.58 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.5c0-.86.24-1.44 1.47-1.44h1.57V4.42A21 21 0 0 0 14.3 4.3c-2.26 0-3.8 1.38-3.8 3.9v2.24H7.94v2.96h2.56V21h3Z" />
    </svg>
  )
}
