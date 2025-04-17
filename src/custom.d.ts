import React from 'react'

declare module 'react' {
  interface IntrinsicElements {
    // Add properties here to ignore specific JSX element errors globally
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    // You can add more elements similarly if needed
  }
}
