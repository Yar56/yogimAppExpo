module.exports = {
    root: true,
    extends: ['expo', 'eslint:recommended'],
    // plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-console': 'off',
        'no-debugger': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'comma-dangle': 'off',
        camelcase: 'warn',
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
