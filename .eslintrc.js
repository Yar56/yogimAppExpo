module.exports = {
    root: true,
    extends: ['expo', 'eslint:recommended'],
    rules: {
        'no-console': 'off',
        'no-debugger': 'warn',
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
