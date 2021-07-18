import {Request, Response} from 'express'
interface IExistsProject {
  projects: any[];
  request: Request;
  response: Response, 
  next?
}
export function checksExistsProjects({projects, request, response, next}:IExistsProject) {
  const {id} = request.params
  const project = projects.find( (projeto) => projeto.id === id)
  if(!project){
  return response.status(404).json({error: 'Project not found'})
}
  request.project = project
  return next();
}