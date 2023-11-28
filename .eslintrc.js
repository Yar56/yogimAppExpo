module.exports = {
    root: true,
    extends: [
        'universe/native',
        // 'universe/shared/typescript-analysis'
        // '@react-native',
        // 'eslint:recommended',
        // 'plugin:react/recommended',
        // 'plugin:@typescript-eslint/recommended',
    ],
    // plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-console': 'off',
        'no-debugger': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
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
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx', '*.d.ts'],
    //         parserOptions: {
    //             project: './tsconfig.json',
    //         },
    //     },
    // ],
};
