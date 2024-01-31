import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import { Home, action as homeAction } from '../pages/Home'
import { Repos, loader as reposLoader } from '../pages/Repos'
import { Issues, loader as issuesLoader } from '../pages/Issues'
import { Issue, loader as issueLoader } from '../pages/Issue'
import UserLayout from '../layouts/UserLayout'
import { ResourceError } from '../pages/ResourceError'
import { Error } from '../pages/Error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        action: homeAction,
      },
    ],
  },
  {
    path: '/:username',
    element: <UserLayout />,
    errorElement: <ResourceError />,
    children: [
      {
        path: '/:username/repos',
        element: <Repos />,
        loader: reposLoader,
      },
      {
        path: '/:username/:repoName/issues',
        element: <Issues />,
        loader: issuesLoader,
      },
      {
        path: '/:username/:repoName/issues/:issueNumber',
        element: <Issue />,
        loader: issueLoader,
      },
      {
        path: '',
        element: <Error />,
      },
    ],
  },
])
