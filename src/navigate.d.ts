import { ComponentType } from 'react';
import { ParamListBase } from '@react-navigation/native';
import {
    ArticlesScreen,
    EventsScreen,
    HomeScreen,
    ProfileScreen,
    RoutineScreen,
} from './shared/routing/NavigationEntities';

declare global {
    interface RootStackParamList extends ParamListBase {
        // Auth: undefined;
        // Registration: undefined;

        // HomeTab
        [HomeScreen.HOME]: undefined;

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
        [ProfileScreen.Profile]: undefined;
        [ProfileScreen.PROFILE_SETTINGS]: undefined;
        [ProfileScreen.INTENTIONS]: undefined;
        [ProfileScreen.ProfileEvents]: undefined;
        [ProfileScreen.SUPPORT]: undefined;
        [ProfileScreen.SCHEDULE]: undefined;
        [ProfileScreen.PAYMENT]: undefined;
        [ProfileScreen.PREMIUM]: undefined;
    }

    interface AppRoute {
        title?: string;
        name: keyof RootStackParamList;
        component: ComponentType;
    }
}
