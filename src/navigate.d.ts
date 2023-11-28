import { ComponentType } from 'react';
import { ParamListBase } from '@react-navigation/native';

declare global {
    // namespace ReactNavigation {
    //   interface RootParamList extends RootStackParamList {}
    // }

    interface RootStackParamList extends ParamListBase {
        Auth: undefined;
        Registration: undefined;
        Home: undefined;
        Courses: undefined;
        Routine: undefined;
        Events: undefined;
        Profile: undefined;
        Intentions: undefined;
        ProfileEvents: undefined;
        Settings: undefined;
        Support: undefined;
        Schedule: undefined;
        Payment: undefined;
        Premium: undefined;
        Course: { courseId?: string };
    }

    interface AppRoute {
        title?: string;
        name: keyof RootStackParamList;
        component: ComponentType;
    }
}
