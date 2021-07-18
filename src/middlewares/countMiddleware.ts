import {Request, Response} from 'express'
interface ICount {
  count: number;
  request: Request;
  response: Response, 
}
export function middlewareCount({count, request, response}:ICount): number {
  count =  count + 1
  console.log ("Count",count);
  return count;
}