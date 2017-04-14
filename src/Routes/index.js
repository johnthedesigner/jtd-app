import HomeRoute from './Home'
import ProjectsRoutes from './Projects'

export const createRoutes = (store) => ({
  childRoutes: [
    ...ProjectsRoutes,
  ]
})
