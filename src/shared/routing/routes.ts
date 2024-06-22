import { ComponentType } from 'react';

import { ArticlesScreen, HomeScreen, ProfileScreen, RoutineScreen } from './NavigationEntities';
import { ArticlePage } from '../../stacks/articlesStack/articlePage/ArticlePage';
import { ArticlesPage } from '../../stacks/articlesStack/articlesPage/ArticlesPage';
import AuthStartPage from '../../stacks/authStack/authStartPage/AuthStartPage';
import { EventsPage } from '../../stacks/eventsStack/EventsPage';
import { HomePage } from '../../stacks/homeStack/homePage/HomePage';
import MeditationPage from '../../stacks/homeStack/meditationPage/MeditationPage';
import { ProfilePage } from '../../stacks/profileStack/profilePage/ProfilePage';
import ProfileSettings from '../../stacks/profileStack/profileSettings/ProfileSettings';
import CourseDetailsPage from '../../stacks/routineStack/CourseDetailsPage';
import PurchasePage from '../../stacks/routineStack/PurchasePage';
import { CoursePage } from '../../stacks/routineStack/coursePage/CoursePage';
import LessonPage from '../../stacks/routineStack/lessonPage/LessonPage';
import PopularCoursesPage from '../../stacks/routineStack/popularCoursesPage/PopularCoursesPage';
import { RoutinePage } from '../../stacks/routineStack/routinePage/RoutinePage';
import ProfileArticlesPage from '../../stacks/profileStack/profileArticlesPage/ProfileArticlesPage';

export const articlesRoutes: AppRoute[] = [
    { name: ArticlesScreen.ARTICLES, component: ArticlesPage, title: '' },
    { name: ArticlesScreen.ARTICLE, component: ArticlePage as ComponentType, title: '' },
];

export const homeRoutes: AppRoute[] = [
    { name: HomeScreen.HOME, component: HomePage, title: '' },
    { name: HomeScreen.MEDITATION, component: MeditationPage, title: '' },
];
export const routineRoutes: AppRoute[] = [
    { name: RoutineScreen.ROUTINE, component: RoutinePage },
    { name: RoutineScreen.POPULAR_COURSES, component: PopularCoursesPage },
    { name: RoutineScreen.COURSE, component: CoursePage as ComponentType, title: '' },
    { name: RoutineScreen.LESSON, component: LessonPage as ComponentType, title: '' },
    { name: RoutineScreen.COURSE_DETAILS_PAGE, component: CourseDetailsPage as ComponentType },
    { name: RoutineScreen.PURCHASE, component: PurchasePage },
];
export const eventsRoutes: AppRoute[] = [{ name: 'Events', component: EventsPage, title: '' }];
export const profileRoutes: AppRoute[] = [
    { name: ProfileScreen.PROFILE, component: ProfilePage, title: '' },
    { name: ProfileScreen.PROFILE_SETTINGS, component: ProfileSettings, title: '' },
    { name: ProfileScreen.PROFILE_ARTICLES, component: ProfileArticlesPage, title: '' },
];

export const authRoutes: AppRoute[] = [{ name: 'AuthStart', component: AuthStartPage, title: '' }];
