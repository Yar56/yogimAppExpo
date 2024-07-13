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
                            '@/app/*/*/**',
                            '@/stacks/*/**',
                            '@/widgets/*/**',
                            '@/features/*/**',
                            '@/entities/*/**',
                            '@/shared/*/*/**',
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
                        message: 'Avoid using relative imports for these modules. Use @/layer/',
                    },
                ],
            },
        ],
        'import/order': [
            'warn',
            {
                alphabetize: { order: 'asc', caseInsensitive: true },
                'newlines-between': 'always',
                pathGroups: [
                    {
                        pattern: '@/app/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@/stacks/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@/widgets/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@/features/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@/entities/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@/shared/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type', 'object', 'unknown'],
            },
        ],
        'import/no-restricted-paths': [
            'error',
            {
                zones: [
                    // stacks
                    {
                        target: 'src/stacks',
                        from: 'src/app',
                    },
                    // Cross import
                    {
                        target: 'src/stacks/*/**/*',
                        from: 'src/stacks/*/index.ts',
                    },

                    // widgets
                    {
                        target: 'src/widgets',
                        from: 'src/app',
                    },
                    {
                        target: 'src/widgets',
                        from: 'src/stacks',
                    },
                    // Cross import
                    {
                        target: 'src/widgets/*/**/*',
                        from: 'src/widgets/*/index.ts',
                    },

                    // features
                    {
                        target: 'src/features',
                        from: 'src/app',
                    },
                    {
                        target: 'src/features',
                        from: 'src/stacks',
                    },
                    {
                        target: 'src/features',
                        from: 'src/widgets',
                    },
                    // Cross import
                    {
                        target: 'src/features/*/**/*',
                        from: 'src/features/*/index.ts',
                    },

                    // entities
                    {
                        target: 'src/entities',
                        from: 'src/app',
                    },
                    {
                        target: 'src/entities',
                        from: 'src/stacks',
                    },
                    {
                        target: 'src/entities',
                        from: 'src/widgets',
                    },
                    {
                        target: 'src/entities',
                        from: 'src/features',
                    },
                    // Cross import
                    {
                        target: 'src/entities/*/**/*',
                        from: 'src/entities/*/index.ts',
                    },

                    // shared
                    {
                        target: 'src/shared',
                        from: 'src/app',
                    },
                    {
                        target: 'src/shared',
                        from: 'src/stacks',
                    },
                    {
                        target: 'src/shared',
                        from: 'src/widgets',
                    },
                    {
                        target: 'src/shared',
                        from: 'src/features',
                    },
                    {
                        target: 'src/shared',
                        from: 'src/entities',
                    },
                ],
            },
        ],
    },
};
