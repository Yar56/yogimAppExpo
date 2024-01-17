import { ComponentType } from 'react';

import { ArticlePage } from '../../stacks/articlesStack/articlePage/ArticlePage';
import { ArticlesPage } from '../../stacks/articlesStack/articlesPage/ArticlesPage';
import { EventsPage } from '../../stacks/eventsStack/EventsPage';
import { HomePage } from '../../stacks/homeStack/HomePage';
import { AuthPage } from '../../stacks/profileStack/authPage/AuthPage';
import IntentionsPage from '../../stacks/profileStack/intentionsPage/IntentionsPage';
import PaymentPage from '../../stacks/profileStack/paymentPage/PaymentPage';
import PremiumPage from '../../stacks/profileStack/premiumPage/PremiumPage';
import ProfileEvents from '../../stacks/profileStack/profileEvents/ProfileEvents';
import { ProfilePage } from '../../stacks/profileStack/profilePage/ProfilePage';
import { RegistrationPage } from '../../stacks/profileStack/registrationPage/RegistrationPage';
import SchedulePage from '../../stacks/profileStack/schedulePage/SchedulePage';
import SettingsPage from '../../stacks/profileStack/settingsPage/SettingsPage';
import SupportPage from '../../stacks/profileStack/supportPage/SupportPage';
import PurchasePage from '../../stacks/routineStack/PurchasePage';
import { RoutinePage } from '../../stacks/routineStack/routinePage/RoutinePage';

export const articlesRoutes: AppRoute[] = [
    { name: 'Articles', component: ArticlesPage, title: '' },
    { name: 'Article', component: ArticlePage as ComponentType, title: '' },
];

export const homeRoutes: AppRoute[] = [{ name: 'Home', component: HomePage, title: '' }];
export const routineRoutes: AppRoute[] = [
    { name: 'Routine', component: RoutinePage, title: '' },
    { name: 'Purchase', component: PurchasePage },
];
export const eventsRoutes: AppRoute[] = [{ name: 'Events', component: EventsPage, title: '' }];
export const profileRoutes: AppRoute[] = [
    { name: 'Profile', component: ProfilePage, title: '' },
    { name: 'Intentions', component: IntentionsPage, title: '' },
    { name: 'ProfileEvents', component: ProfileEvents, title: '' },
    { name: 'Auth', component: AuthPage, title: '' },
    { name: 'Registration', component: RegistrationPage, title: '' },
    { name: 'Settings', component: SettingsPage, title: '' },
    { name: 'Support', component: SupportPage, title: '' },
    { name: 'Schedule', component: SchedulePage, title: '' },
    { name: 'Payment', component: PaymentPage, title: '' },
    { name: 'Premium', component: PremiumPage, title: '' },
];
