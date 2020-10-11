import React from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css';
import MyEditor from '../richTextEditor';

function VoxForm() {
  return (
    <div className="form-div">
      <Form>
        <Form.Group>
          <Form.Label>From:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>To:</Form.Label>
          <Form.Group>
            <Form.Check inline type="checkbox" label="Group 1" />
            <Form.Check inline type="checkbox" label="Group 2" />
            <Form.Check inline type="checkbox" label="Group 3" />
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Label>Subject:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Summary:</Form.Label>
          <MyEditor />
        </Form.Group>
      </Form>
    </div>
  );
}

export default VoxForm;
