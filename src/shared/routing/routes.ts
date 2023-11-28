import { CoursesPage } from '../../stacks/coursesStack/coursesPage/CoursesPage';
import { HomePage } from '../../stacks/homeStack/HomePage';
import { RoutinePage } from '../../stacks/routineStack/RoutinePage';
import { EventsPage } from '../../stacks/eventsStack/EventsPage';
import { ProfilePage } from '../../stacks/profileStack/profilePage/ProfilePage';
import { AuthPage } from '../../stacks/profileStack/authPage/AuthPage';
import { RegistrationPage } from '../../stacks/profileStack/registrationPage/RegistrationPage';
import IntentionsPage from '../../stacks/profileStack/intentionsPage/IntentionsPage';
import ProfileEvents from '../../stacks/profileStack/profileEvents/ProfileEvents';
import SettingsPage from '../../stacks/profileStack/settingsPage/SettingsPage';
import SupportPage from '../../stacks/profileStack/supportPage/SupportPage';
import SchedulePage from '../../stacks/profileStack/schedulePage/SchedulePage';
import PaymentPage from '../../stacks/profileStack/paymentPage/PaymentPage';
import PremiumPage from '../../stacks/profileStack/premiumPage/PremiumPage';
import { CoursePage } from '../../stacks/coursesStack/coursePage/CoursePage';
import { ComponentType } from 'react';

export const coursesRoutes: AppRoute[] = [
    { name: 'Courses', component: CoursesPage },
    { name: 'Course', component: CoursePage as ComponentType },
];

export const homeRoutes: AppRoute[] = [{ name: 'Home', component: HomePage }];
export const routineRoutes: AppRoute[] = [{ name: 'Routine', component: RoutinePage }];
export const eventsRoutes: AppRoute[] = [{ name: 'Events', component: EventsPage }];
export const profileRoutes: AppRoute[] = [
    { name: 'Profile', component: ProfilePage },
    { name: 'Intentions', component: IntentionsPage },
    { name: 'ProfileEvents', component: ProfileEvents },
    { name: 'Auth', component: AuthPage },
    { name: 'Registration', component: RegistrationPage },
    { name: 'Settings', component: SettingsPage },
    { name: 'Support', component: SupportPage },
    { name: 'Schedule', component: SchedulePage },
    { name: 'Payment', component: PaymentPage },
    { name: 'Premium', component: PremiumPage },
];
