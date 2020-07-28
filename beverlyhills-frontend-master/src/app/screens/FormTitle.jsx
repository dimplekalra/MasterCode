import React from "react";
import { Button, Input, Row, Label, FormGroup } from "reactstrap";

const FormTitle = (props) => {
  const {
    handleAdd,
    formTitle,
    formDescription,
    handleInputChange,
    handleDescription,
  } = props;
  return (
    <form action="" onSubmit={handleAdd}>
      <Row form>
        <div className="col">
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name=""
              onChange={handleInputChange}
              value={formTitle}
              placeholder="Add Title"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              className="description"
              type="textarea"
              id="description"
              name="Description"
              onChange={handleDescription}
              value={formDescription}
              placeholder="Add description"
            />
          </FormGroup>

          <Button color="primary" className="col-2">
            Add
          </Button>
        </div>
      </Row>
    </form>
  );
};

export default FormTitle;
