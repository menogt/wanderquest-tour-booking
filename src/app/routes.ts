import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './components/HomePage';
import { TourListingPage } from './components/TourListingPage';
import { TourDetailPage } from './components/TourDetailPage';
import { BookingSummaryPage } from './components/BookingSummaryPage';
import { CheckoutPage } from './components/CheckoutPage';
import { DestinationsPage } from './components/DestinationsPage';
import { ExperiencesPage } from './components/ExperiencesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { NotFoundPage } from './components/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'destinations', Component: DestinationsPage },
      { path: 'experiences', Component: ExperiencesPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'tours', Component: TourListingPage },
      { path: 'tours/:id', Component: TourDetailPage },
      { path: 'booking', Component: BookingSummaryPage },
      { path: 'checkout', Component: CheckoutPage },
    ],
  },
  { path: '*', Component: NotFoundPage },
]);
