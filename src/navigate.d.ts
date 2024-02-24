import { ComponentType } from 'react';
import { ParamListBase } from '@react-navigation/native';
import CourseDetailsPage from './stacks/routineStack/CourseDetailsPage';
import { Lesson } from './shared/api/supaBase/models';

declare global {
    // namespace ReactNavigation {
    //   interface RootParamList extends RootStackParamList {}
    // }

    interface RootStackParamList extends ParamListBase {
        Auth: undefined;
        Registration: undefined;
        Home: undefined;
        Courses: undefined;
        Articles: undefined;
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
        Article: { articleId?: string };
        CourseDetailsPage: { details: string | null };
        Lesson: { courseId?: string; lessonId?: string };
    }

    interface AppRoute {
        title?: string;
        name: keyof RootStackParamList;
        component: ComponentType;
    }
}
