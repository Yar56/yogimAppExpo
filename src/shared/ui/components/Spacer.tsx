import { FunctionComponent } from 'react';
import { View } from 'react-native';

interface SpacerProps {
    horizontal?: boolean;
    size?: number;
}
export const Spacer: FunctionComponent<SpacerProps> = ({ horizontal: isHorizontal, size }) => {
    const defaultValue = 'auto';

    return (
        <View
            style={{
                width: isHorizontal ? size : defaultValue,
                height: !isHorizontal ? size : defaultValue,
            }}
        />
    );
};
