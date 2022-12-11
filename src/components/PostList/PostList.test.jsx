import { render } from "@testing-library/react";
import PostList from "./index";
import { MemoryRouter } from "react-router-dom";

describe('different props exclusions', () => {
  const posts = [
    {
      title: "First test",
      author: {username: 'John Doe'},
      id: 'mockId1',
      status: 'published',
      createdAt: new Date(1.5e12)
    },
    {
      title: "Second test",
      author: {username: 'Johnathan Doe'},
      id: 'mockId2',
      status: 'archived',
      createdAt: new Date(1.5e12)
    },
    {
      title: "Third test",
      author: {username: 'James Doe'},
      id: 'mockId3',
      status: 'unpublished',
      createdAt: new Date(1.5e12)
    }
  ]

  test('author and status are excluded', () => {
    const postList = render(
      <MemoryRouter>
        <PostList posts={posts} excludedProps={['author', 'status']}/>
      </MemoryRouter>
    );

    const statuses = postList.queryAllByText(/(published|archived|unpublished)/);
    const authors = postList.queryAllByText(/Doe/);
    
    expect(statuses.length).toBe(0);
    expect(authors.length).toBe(0);
  });
  
  test('nothing is excluded', () => {
    const postList = render(
      <MemoryRouter>
        <PostList posts={posts} />
      </MemoryRouter>
    );

    const statuses = postList.queryAllByText(/(published|archived|unpublished)/);
    const authors = postList.queryAllByText(/Doe/);
    
    expect(statuses.length).toBe(posts.length);
    expect(authors.length).toBe(posts.length);
  });
});