import React, { Component } from "react";
import axios from "axios";
import { MdEdit, MdAdd, MdDelete, MdCancel } from "react-icons/md";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import FormTitle from "./FormTitle";

const API_URL = "http://localhost:4040";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: {},
      isOpen: false,
      selectedSection: "ivdrips",
      InputTitle: "",
      currentSlug: "",
      formVisible: false,
      formTitle: "",
      formDescription: "",

      InputDescription: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      menus: props.data,
    };
  }

  componentDidMount() {
    this.fetchMenuItems();
  }

  addDescription = async (id) => {
    const { selectedSection } = this.state;

    await axios
      .get(`${API_URL}/${selectedSection}/${id}`)
      .then((result) => {
        this.setState({
          InputDescription: result.data.data.description,
        });
      })
      .catch((err) => console.log(err));
  };

  fetchMenuItems = () => {
    this.props.fetchMenu().catch((err) => {
      this.setState({
        menus: {},
        selectedSection: "",
      });
    });
  };

  handleSelection = (e) => {
    e.preventDefault();
    const section = e.target.getAttribute("data-id");
    this.setState({
      selectedSection: section,
    });
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const { formTitle, formDescription, selectedSection } = this.state;

    axios
      .post(`${API_URL}/${selectedSection}`, {
        title: formTitle,
        description: formDescription,
      })
      .then((result) => {
        this.setState(
          {
            formTitle: "",
            formDescription: "",
          },

          () => {
            this.fetchMenuItems();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEdit = async (e) => {
    e.preventDefault();
    const Item = this.state.menus[this.state.selectedSection].find(
      (item) => item.slug === this.state.currentSlug
    );
    const updatedId = Item._id;

    await axios
      .patch(`${API_URL}/${this.state.selectedSection}/${updatedId}`, {
        InputTitle: this.state.InputTitle,
        description: this.state.InputDescription,
      })
      .then((result) => {
        this.setState(
          {
            InputTitle: "",
          },
          () => {
            this.fetchMenuItems();
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  handleDelete = (e, currentSlug) => {
    e.preventDefault();
    const { selectedSection } = this.state;

    const Item = this.state.menus[selectedSection].find(
      (item) => item.slug === currentSlug
    );

    const updatedId = Item._id;

    axios
      .delete(`${API_URL}/${selectedSection}/${updatedId}`)
      .then((result) => {
        this.setState(
          {
            currentSlug: "",
            InputTitle: "",
            InputDescription: "",
          },
          () => {
            this.fetchMenuItems();
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  toggler = (e, slug) => {
    if (
      this.state.currentSlug === e.target.parentNode.getAttribute("data-id") &&
      this.state.isOpen
    ) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
    this.setState({
      currentSlug: slug,
    });
  };

  render() {
    const {
      menus,

      selectedSection,
      formTitle,
      formDescription,
      formVisible,
      currentSlug,
      isOpen,
      isEditable,
      InputTitle,
      InputDescription,
    } = this.state;
    const Titles = Object.keys(menus);
    const descriptions = menus[selectedSection] || [];

    return (
      <div className="admin">
        <div className="container">
          <div className="row">
            <div className="col-3 left-panel">
              {Titles.length ? (
                <ListGroup>
                  {Titles.map((title, index) => {
                    return (
                      <ListGroupItem
                        active={selectedSection === title ? true : false}
                        action
                        tag="button"
                        onClick={this.handleSelection}
                        key={`title-${index}`}
                        data-id={title}
                      >
                        {title}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              ) : null}
            </div>

            <div className="col-9 right-panel">
              {descriptions.length ? (
                <ListGroup>
                  {descriptions.map((desc, index) => {
                    return (
                      <ListGroupItem
                        action
                        className="clearfix "
                        key={`desc - ${index}`}
                      >
                        <div
                          className="title list-item-title"
                          data-id={desc.slug}
                          onClick={(e) => {
                            this.toggler(e, desc.slug);
                          }}
                        >
                          <h5>{desc.title}</h5>
                        </div>
                        <Collapse
                          isOpen={isOpen && desc.slug === currentSlug}
                          onEntering={(e) => this.addDescription(desc._id)}
                          onExiting={(e) =>
                            this.setState({
                              InputDescription: "",
                              isEditable: false,
                            })
                          }
                        >
                          {isEditable && desc.slug === currentSlug ? (
                            <>
                              <FormTitle
                                formTitle={InputTitle}
                                formDescription={InputDescription}
                                handleInputChange={(e) =>
                                  this.setState({
                                    InputTitle: e.target.value,
                                  })
                                }
                                handleDescription={(e) =>
                                  this.setState({
                                    InputDescription: e.target.value,
                                  })
                                }
                                handleAdd={this.handleEdit}
                              />
                            </>
                          ) : (
                            <>
                              <p>{InputDescription}</p>

                              <button
                                onClick={(e) => {
                                  this.setState({
                                    isEditable: true,
                                    InputTitle: desc.title,
                                    currentSlug: desc.slug,
                                  });
                                }}
                                color="warning"
                                className="btn btn-warning edit-btn"
                              >
                                <MdEdit className="icon" />
                              </button>
                            </>
                          )}

                          <button
                            onClick={(e) => this.handleDelete(e, desc.slug)}
                            color="danger"
                            className={`btn btn-danger delete-btn ${
                              isEditable ? "custom-delete" : ""
                            }`}
                          >
                            <MdDelete className="icon" />
                          </button>
                        </Collapse>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              ) : null}

              <button
                className="btn btn-secondary height add-btn"
                onClick={(e) => this.setState({ formVisible: !formVisible })}
              >
                {formVisible ? (
                  <MdCancel className="icon" />
                ) : (
                  <MdAdd className="icon" />
                )}
              </button>
              {formVisible ? (
                <FormTitle
                  formTitle={formTitle}
                  formDescription={formDescription}
                  handleInputChange={(e) =>
                    this.setState({
                      formTitle: e.target.value,
                    })
                  }
                  handleDescription={(e) =>
                    this.setState({
                      formDescription: e.target.value,
                    })
                  }
                  handleAdd={this.handleAdd}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
