import { render } from "@testing-library/react";
import PostCard from "./PostCard";
import { MemoryRouter } from "react-router-dom";


test('PostCard structure', () => {
  const post = {
    title: "Post for test",
    author: {username: 'John Doe'},
    id: 'mockId12345',
    status: 'published',
    createdAt: new Date(1.5e12)
  }
  
  const postCard = render(
    <MemoryRouter>
      <PostCard {...post} />
    </MemoryRouter>
  );

  expect(postCard.container).toMatchSnapshot();
});
