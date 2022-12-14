import author1 from '../../../assets/icons/author1.png';
import author2 from '../../../assets/icons/author2.png';
import author3 from '../../../assets/icons/author3.png';

const teamMembers = [
  {
    id: 2,
    name: 'Vlad Kapitan',
    ghLink: 'https://github.com/qrvck',
    imgSrc: author1,
    role: 'Frontend',
    contribution: ['Dictionary', 'Word card', 'Pagination', 'Main page', 'API wrappers'],
  },
  {
    id: 1,
    name: 'Yan Malashonak',
    ghLink: 'https://github.com/malashonock',
    imgSrc: author2,
    role: 'Team Lead, frontend, backend',
    contribution: [
      'Project setup',
      'Navigation menu',
      'React Router setup',
      'Mini-games',
      'Backend enhancement',
    ],
  },
  {
    id: 3,
    name: 'Sergey Chelnakov',
    ghLink: 'https://github.com/stanlys',
    imgSrc: author3,
    role: 'Frontend',
    contribution: [
      'Authentication',
      'React Redux setup',
      'Main page',
      'Statistics page',
      'API wrappers',
    ],
  },
];

export default teamMembers;
