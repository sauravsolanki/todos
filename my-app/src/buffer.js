import { Button } from "react-bootstrap";

<Container fluid>
    <Form onSubmit={e => {
        e.preventDefault();
        if (buttonClick == 1) {
            let newtask = { title: title, duedate: duedate, label: label, status: status };
            if (props.type == "New") {
                props.addTodo(newtask);
            } else {
                props.updateTodo(props.index, newtask);
            }

        } else {
            props.deleteTodo(props.index)
        }
    }}>
        <Row>
            <Col xs={3}>
                <Form.Group controlId="form.task">
                    <Form.Label>Task: </Form.Label>
                    <Form.Control placeholder="enter a new task ... " value={title} type="text" onChange={(e) => { setTitle(e.target.value) }} />
                </Form.Group>
            </Col>

            <Col xs={3}>
                <Form.Group controlId="form.duedate">
                    <Form.Label>Task: </Form.Label>
                    <Form.Control placeholder="DueDate" onChange={(e) => { setDuedate(e.target.value) }} type="date" value={duedate} />
                </Form.Group>
            </Col>

            <Col xs={3}>
                <Form.Group controlId="form.label">
                    <Form.Label>Label</Form.Label>
                    <Form.Control as="select" value={label}
                        onChange={e => {
                            setLabel("" + e.target.value);
                        }}>
                        {labelList.map(label => (
                            <option key={label.id} value={label.name}>
                                {label.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Col>

            <Col xs={3}>
                <Form.Group controlId="form.status">
                    <Form.Label>status</Form.Label>
                    <Form.Control as="select" value={status}
                        onChange={e => {
                            setStatus(e.target.value)
                        }}>
                        {statusList.map(status => (
                            <option key={status.id} value={status.name}>
                                {status.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Col>

            <Col>
            <Row>
            <Button variant="primary" size="sm" id="add_or_update" className="addBtnStyle" onClick={() => { setButtonClick(1) }}>
            {props.type}
            </Button>
            </Row>

            <Row>
                {props.type == "Update" ?
          <Button variant="primary" size="sm" id="delete" className="addDeleteStyle" onClick={() => { setButtonClick(2) }}> Delete </Button> : <></>}
            </Row>
            </Col>
        </Row>

    </Form>
</Container>





