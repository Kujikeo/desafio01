import request from 'supertest'
import app from '../index'

describe("Task", () => {
  it("should create a new task", async () => {
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

    await request(app)
    .post(`/projects/${response.body.id}/tasks`)
    .send({
      title: 'Teste Task'
    });
    expect(201);

  })
})