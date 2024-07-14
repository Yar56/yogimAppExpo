import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FunctionComponent } from 'react';

import {
    ArticlesScreen,
    EventsScreen,
    HomeScreen,
    ProfileScreen,
    RoutineScreen,
} from '@/shared/routing/NavigationEntities';

declare global {
    interface RootStackParamList extends ParamListBase {
        // HomeTab
        [HomeScreen.HOME]: undefined;
        [HomeScreen.MEDITATION]: { meditationId: string };

        // ArticleTab
        [ArticlesScreen.ARTICLE]: { articleId?: string };
        [ArticlesScreen.ARTICLES]: undefined;

        // RoutineTab
        [RoutineScreen.ROUTINE]: undefined;
        [RoutineScreen.POPULAR_COURSES]: undefined;
        [RoutineScreen.COURSE]: { courseId?: string };
        [RoutineScreen.LESSON]: { courseId?: string; lessonId?: string };
        [RoutineScreen.COURSE_DETAILS_PAGE]: { details?: string | null };

        // EventsTab
        [EventsScreen.EVENTS]: undefined;

        // ProfileTab
        [ProfileScreen.PROFILE]: undefined;
        [ProfileScreen.PROFILE_SETTINGS]: undefined;
        [ProfileScreen.PROFILE_ARTICLES]: undefined;
    }

    interface PageProps extends NativeStackScreenProps<RootStackParamList, keyof RootStackParamList> {}
    interface AppRoute {
        name: keyof RootStackParamList;
        component: FunctionComponent;
    }
    interface StackScreenProps {
        screenRoutes: AppRoute[];
    }
}
