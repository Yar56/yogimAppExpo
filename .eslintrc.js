module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'expo',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    ignorePatterns: ['src/shared/api/supaBase/dbModels.ts'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off',
        'no-debugger': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'comma-dangle': 'off',
        camelcase: 'off',
        curly: 'warn',
        'react/jsx-curly-brace-presence': [
            'warn',
            {
                props: 'never',
                children: 'never',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: [
                            // Use public API only
                            '@app/**',
                            '@stacks/*/**',
                            '@widgets/*/**',
                            '@features/*/**',
                            '@entities/*/**',
                            '@shared/*/*/**',
                        ],
                        message: 'Use the public API of the module instead of direct imports.',
                    },
                    {
                        group: [
                            // Use public API only
                            '../**/app',
                            '../**/stacks',
                            '../**/widgets',
                            '../**/features',
                            '../**/entities',
                            '../**/shared',
                        ],
                        message: 'Avoid using relative imports for these modules. Use @layer/',
                    },
                ],
            },
        ],
    },
};
