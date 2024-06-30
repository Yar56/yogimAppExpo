module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['expo', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
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
    },
};
