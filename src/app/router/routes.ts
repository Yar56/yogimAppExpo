import { ArticlePage, ArticlesPage } from '@/stacks/articlesStack';
import { AuthStartPage } from '@/stacks/authStack';
import { HomePage, MeditationPage } from '@/stacks/homeStack';
import { ProfileArticlesPage, ProfilePage, ProfileSettings } from '@/stacks/profileStack';
import { CourseDetailsPage, CoursePage, LessonPage, PopularCoursesPage, RoutinePage } from '@/stacks/routineStack';

import { ArticlesScreen, HomeScreen, ProfileScreen, RoutineScreen } from '@/shared/routing/NavigationEntities';

export const articlesRoutes: AppRoute[] = [
    { name: ArticlesScreen.ARTICLES, component: ArticlesPage },
    { name: ArticlesScreen.ARTICLE, component: ArticlePage },
];

export const homeRoutes: AppRoute[] = [
    { name: HomeScreen.HOME, component: HomePage },
    { name: HomeScreen.MEDITATION, component: MeditationPage },
];
export const routineRoutes: AppRoute[] = [
    { name: RoutineScreen.ROUTINE, component: RoutinePage },
    { name: RoutineScreen.POPULAR_COURSES, component: PopularCoursesPage },
    { name: RoutineScreen.COURSE, component: CoursePage },
    { name: RoutineScreen.LESSON, component: LessonPage },
    { name: RoutineScreen.COURSE_DETAILS_PAGE, component: CourseDetailsPage },
];

export const profileRoutes: AppRoute[] = [
    { name: ProfileScreen.PROFILE, component: ProfilePage },
    { name: ProfileScreen.PROFILE_SETTINGS, component: ProfileSettings },
    { name: ProfileScreen.PROFILE_ARTICLES, component: ProfileArticlesPage },
];

export const authRoutes: AppRoute[] = [{ name: 'AuthStart', component: AuthStartPage }];
