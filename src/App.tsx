import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";

import {
  lazy,
  Suspense,
} from "react";

import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";

// Lazy Pages
const SignIn = lazy(
  () => import("./pages/AuthPages/SignIn")
);

const SignUp = lazy(
  () => import("./pages/AuthPages/SignUp")
);

const NotFound = lazy(
  () => import("./pages/OtherPage/NotFound")
);

const UserProfiles = lazy(
  () => import("./pages/UserProfiles")
);

const Videos = lazy(
  () => import("./pages/UiElements/Videos")
);

const Images = lazy(
  () => import("./pages/UiElements/Images")
);

const Alerts = lazy(
  () => import("./pages/UiElements/Alerts")
);

const Badges = lazy(
  () => import("./pages/UiElements/Badges")
);

const Avatars = lazy(
  () => import("./pages/UiElements/Avatars")
);

const Buttons = lazy(
  () => import("./pages/UiElements/Buttons")
);

const LineChart = lazy(
  () => import("./pages/Charts/LineChart")
);

const BarChart = lazy(
  () => import("./pages/Charts/BarChart")
);

const Calendar = lazy(
  () => import("./pages/Calendar")
);

const BasicTables = lazy(
  () => import("./pages/Tables/BasicTables")
);

const FormElements = lazy(
  () => import("./pages/Forms/FormElements")
);

const Blank = lazy(
  () => import("./pages/Blank")
);

const Home = lazy(
  () => import("./pages/Dashboard/Home")
);


function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/dashboard"
                  element={<Home />}
                />

                <Route
                  path="/profile"
                  element={<UserProfiles />}
                />

                <Route
                  path="/calendar"
                  element={<Calendar />}
                />

                <Route
                  path="/blank"
                  element={<Blank />}
                />

                <Route
                  path="/form-elements"
                  element={<FormElements />}
                />

                <Route
                  path="/basic-tables"
                  element={<BasicTables />}
                />

                <Route
                  path="/alerts"
                  element={<Alerts />}
                />

                <Route
                  path="/avatars"
                  element={<Avatars />}
                />

                <Route
                  path="/badge"
                  element={<Badges />}
                />

                <Route
                  path="/buttons"
                  element={<Buttons />}
                />

                <Route
                  path="/images"
                  element={<Images />}
                />

                <Route
                  path="/videos"
                  element={<Videos />}
                />

                <Route
                  path="/line-chart"
                  element={<LineChart />}
                />

                <Route
                  path="/bar-chart"
                  element={<BarChart />}
                />
              </Route>
            </Route>

            <Route element={<PublicRoute />}>
              <Route
                path="/signin"
                element={<SignIn />}
              />

              <Route
                path="/signup"
                element={<SignUp />}
              />
            </Route>

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}