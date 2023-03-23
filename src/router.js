import {createRouter, createWebHistory} from 'vue-router';
import TeamsList from "./pages/TeamsList";
import UsersList from "./pages/UsersList";
import TeamMembers from "./components/teams/TeamMembers";
import NotFound from "./pages/NotFound";
import TeamsFooter from "./pages/TeamsFooter";
import UsersFooter from "./pages/UsersFooter";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/teams'},
        {
            name: 'teams',
            path: '/teams',
            meta: { needsAuth: true },
            components: {
                default: TeamsList,
                footer: TeamsFooter,
            },
            children: [
                {
                    name: 'team-members',
                    path: ':teamId',
                    component: TeamMembers,
                    props: true,
                },
            ],
        },
        {
            path: '/users',
            components: {
                default: UsersList,
                footer: UsersFooter,
            },
            beforeEnter(to, from, next) {
                console.log('users beforeEnter');
                console.log(to, from);
                next();
            }
        },
        // {
        //     path: '/teams/:teamId',
        //     component: TeamMembers,
        //     props: true,
        // },
        {
            path: '/:notFound(.*)',
            component: NotFound
        },
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                left: 0,
                top: 0
            };
        }

    },
});

router.beforeEach(function (to, from, next) {
    console.log('Global beforeEach');
    console.log(to, from);
    next();
});

router.afterEach(function (to, from) {
    //sending analytics data
    console.log('Global afterEach');
    console.log(to, from);
});

export default router;
