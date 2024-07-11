import { ComponentType } from 'react';

import { ArticlePage, ArticlesPage } from '@/stacks/articlesStack';
import { AuthStartPage } from '@/stacks/authStack';
import { HomePage, MeditationPage } from '@/stacks/homeStack';
import { ProfilePage, ProfileSettings, ProfileArticlesPage } from '@/stacks/profileStack';
import { PopularCoursesPage, LessonPage, CourseDetailsPage, CoursePage, RoutinePage } from '@/stacks/routineStack';

import { ArticlesScreen, HomeScreen, ProfileScreen, RoutineScreen } from './NavigationEntities';

export const articlesRoutes: AppRoute[] = [
    { name: ArticlesScreen.ARTICLES, component: ArticlesPage, title: '' },
    { name: ArticlesScreen.ARTICLE, component: ArticlePage as ComponentType, title: '' },
];

export const homeRoutes: AppRoute[] = [
    { name: HomeScreen.HOME, component: HomePage, title: '' },
    { name: HomeScreen.MEDITATION, component: MeditationPage as ComponentType, title: '' },
];
export const routineRoutes: AppRoute[] = [
    { name: RoutineScreen.ROUTINE, component: RoutinePage },
    { name: RoutineScreen.POPULAR_COURSES, component: PopularCoursesPage },
    { name: RoutineScreen.COURSE, component: CoursePage as ComponentType, title: '' },
    { name: RoutineScreen.LESSON, component: LessonPage as ComponentType, title: '' },
    { name: RoutineScreen.COURSE_DETAILS_PAGE, component: CourseDetailsPage as ComponentType },
];

export const profileRoutes: AppRoute[] = [
    { name: ProfileScreen.PROFILE, component: ProfilePage, title: '' },
    { name: ProfileScreen.PROFILE_SETTINGS, component: ProfileSettings, title: '' },
    { name: ProfileScreen.PROFILE_ARTICLES, component: ProfileArticlesPage, title: '' },
];

export const authRoutes: AppRoute[] = [{ name: 'AuthStart', component: AuthStartPage, title: '' }];
