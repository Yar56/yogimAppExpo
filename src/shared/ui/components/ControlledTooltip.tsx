import React, { PropsWithChildren } from 'react';
import { Tooltip, TooltipProps } from '@rneui/themed';
import { useAppTheme } from '../../../app/providers/MaterialThemeProvider';

const ControlledTooltip: React.FC<TooltipProps & PropsWithChildren> = (props) => {
    const theme = useAppTheme();

    const [open, setOpen] = React.useState(false);
    return (
        <Tooltip
            overlayColor="rgba(0, 0, 0, 0.6)"
            visible={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            backgroundColor={theme.colors.colorLevel3}
            {...props}
        />
    );
};
export default ControlledTooltip;
