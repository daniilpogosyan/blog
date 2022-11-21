import { Link, Form } from 'react-router-dom';

import style from './ActionPanel.module.css';

export default function ActionPanel() {
  return (
    <div className={style['action-panel']}>
      <Link to='edit' className="button primary outline">Edit</Link>
      <Form method='delete' action='delete'>
        <button className="button danger outline">Delete</button>
      </Form>
    </div>
  )
  }