import { list, check, todo, home } from './Icons';

const menu = [
    {
        id: 1,
        title: 'All Tasks',
        icon: home,
        link: '/dashboard',
    },
    {
        id: 2,
        title: 'Important!',
        icon: list,
        link: '/dashboard/important',
    },
    {
        id: 3,
        title: 'Completed!',
        icon: check,
        link: '/dashboard/completed',
    },
    {
        id: 4,
        title: 'To do!',
        icon: todo,
        link: '/dashboard/incomplete',
    },
];

export default menu;
