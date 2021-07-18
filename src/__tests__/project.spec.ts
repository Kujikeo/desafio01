import request from 'supertest'
import app from '../index'

describe("Project", () => {
  it("should create a new project", async () => {
    const response = await request(app)
    .post('/projects')
    .send({
      id: '1',
      title: 'Nodejs'
    });
    expect(201);

    expect(response.body).toMatchObject({
      id: '1',
      title: 'Nodejs',
      tasks: []
    });
  }),
  it("should not be able to create a new project when id already exists", async () => {
  await request(app)
    .post('/projects')
    .send({
      id: '2',
      title: 'Nodejs'
    });

  const response = await request(app)
  .post('/projects')
  .send({
    id: '2',
    title: 'Nodejs'
  }).expect(400);

  expect(response.body.error).toBeTruthy();
  }),
  it("should be able to list all project's", async () => {
    const projectResponse = await request(app)
      .post('/projects')
      .send({
        id: '3',
        title: 'Nodejs 04'
      });
      await request(app)
      .get('/projects').expect(200);
  }),
  it("should be able to update a project", async () => {
    const projectResponse = await request(app)
      .post('/projects')
      .send({
        id: '4',
        title: 'Nodejs 05'
      });

      await request(app)
      .put(`/projects/${projectResponse.body.id}`)
      .send({
        title: 'Nodejs 07'
      }).expect(200)
  }),
  it("should be able to delete a project", async () => {
    const projectResponse = await request(app)
      .post('/projects')
      .send({
        id: '5',
        title: 'Nodejs 06'
      });

      await request(app)
      .delete(`/projects/${projectResponse.body.id}`)
      .send({
        title: 'Nodejs 07'
      }).expect(204)
  })
})