import { Form } from 'react-router-dom';

export default function DeletePostForm() {
  return (
    <Form method='delete' action='delete'>
      <button>Delete</button>
    </Form>
  )
}
