import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // или 'node', в зависимости от вашего проекта
  
  // Если у вас было свойство runner, настроенное массивом, например:
  // runner: ['some-runner', { options }], 
  // В новых версиях Jest это недопустимо. Перенесите настройки в соответствующие плагины/трансформеры,
  // либо оставьте просто строковое имя, если плагин это поддерживает:
  // runner: 'jest-runner', 

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  
  // Добавьте остальные ваши личные настройки проекта ниже (массивы сетапов, маппинг путей и т.д.)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
