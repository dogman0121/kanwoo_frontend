declare global {
  interface RequestInit {
    duplex?: 'half' | 'full' | string; // 'half' is the only current valid value
  }
}

export {}