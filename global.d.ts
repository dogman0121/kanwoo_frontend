declare global {
  interface RequestInit {
    duplex?: 'half' | 'full' | string; // 'half' is the only current valid value
  }
}

declare global {
  interface Window {
    YaAuthSuggest: any; // или более точный тип
  }
}

export {}