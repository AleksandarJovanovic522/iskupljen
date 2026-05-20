import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'

const eslintConfig = [
    {
        ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts']
    },
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
        plugins: {
            '@next/next': nextPlugin
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }]
        }
    }
]

export default eslintConfig
