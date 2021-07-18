import { Router} from 'express'
import { checksExistsProjects } from '../middlewares/checkExistProject';
const projectsRoutes = Router();

interface Iprojects  {
  id: string;
  title: string;
  tasks: string[];
}
const projects: Iprojects []= []

projectsRoutes.post('/', (request, response) => {
  const {id, title} = request.body;
  const projectExists = projects.find( (project) => project.id ===  id)
  
  if(projectExists){
    return response.status(400).json({error: `This ID already exists.`})
  }
  
  const project: Iprojects= {
    id: !isNaN(id) ? id.toString(): id,
    title: !isNaN(title) ? title.toString(): title,
    tasks: []
  }

  projects.push(project)
  response.status(201).json(project)

})

projectsRoutes.get('/',(request, response) => {
  return response.json(projects)
});

projectsRoutes.post('/:id/tasks', (request, response, next) => checksExistsProjects({request:request, response:response, next:next, projects: projects}), (request, response) => {
  const {project} = request;
  const {title} = request.body;

  project.tasks.push(title)

  response.status(201).json({messgae: "Task created"})
});

projectsRoutes.put('/:id', (request, response, next) => checksExistsProjects({request:request, response:response, next:next, projects: projects}), (request, response) => {
  const {project} = request;
  const {title} = request.body;

  project.title = !isNaN(title) ? title.toString(): title;
  return response.json(project);
});

projectsRoutes.delete('/:id', (request, response, next) => checksExistsProjects({request:request, response:response, next:next, projects: projects}), (request, response) => {
  const {project} = request
  const projectIndex = projects.findIndex(projeto => projeto.id === project.id)

 projects.splice(projectIndex,1);

 return response.status(204).json();
});

export {projectsRoutes}