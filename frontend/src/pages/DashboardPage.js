import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner, Alert, Card, Container, Navbar, Form, Row, Col } from 'react-bootstrap';
import api from '../api';
import '../styles/DashboardPage.css';

const DashboardPage = ({ darkMode, toggleDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({ type: '', text: '' });
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [taskToEdit, setTaskToEdit] = useState(null); // Task to edit
  const [editTitle, setEditTitle] = useState(''); // Edited title
  const [editDescription, setEditDescription] = useState(''); // Edited description
  const navigate = useNavigate();

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error.response?.data?.message || error.message);
        navigate('/login');
      }
    };

    fetchTasks();
  }, [navigate]);

  // Handle task creation
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/tasks', { title, description });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create task', error.response?.data?.message || error.message);
    }
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    setIsDeleting(true);
    setDeleteMessage({ type: '', text: '' });

    try {
      await api.delete(`/tasks/${taskToDelete}`);
      setTasks(tasks.filter((task) => task._id !== taskToDelete));
      setDeleteMessage({ type: 'success', text: 'Task deleted successfully!' });
    } catch (error) {
      console.error('Failed to delete task', error.response?.data?.message || error.message);
      setDeleteMessage({ type: 'error', text: 'Failed to delete task. Please try again.' });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setTaskToDelete(null);

      setTimeout(() => {
        setDeleteMessage({ type: '', text: '' });
      }, 3000);
    }
  };

  // Handle task editing
  const handleEditTask = (task) => {
    setTaskToEdit(task); // Set the task to edit
    setEditTitle(task.title); // Set the initial title
    setEditDescription(task.description); // Set the initial description
    setShowEditModal(true); // Show the edit modal
  };

  const confirmEditTask = async () => {
    try {
      const response = await api.put(`/tasks/${taskToEdit._id}`, {
        title: editTitle,
        description: editDescription,
      });
      setTasks(tasks.map((t) => (t._id === taskToEdit._id ? response.data : t))); // Update the task in the list
      setShowEditModal(false); // Hide the edit modal
    } catch (error) {
      console.error('Failed to update task', error.response?.data?.message || error.message);
    }
  };

  // Handle task completion toggling
  const handleToggleComplete = async (task) => {
    try {
      const response = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? response.data : t))); // Update the task in the list
    } catch (error) {
      console.error('Failed to update task', error.response?.data?.message || error.message);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand>Task Manager</Navbar.Brand>
          <div>
            <Button variant="outline-secondary" onClick={toggleDarkMode} className="me-2">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <h1 className="text-center mb-4">Dashboard</h1>

        {/* Task Creation Form */}
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleCreateTask}>
              <Row>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Col>
                <Col md={2}>
                  <Button variant="primary" type="submit" className="w-100">
                    Add Task
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Success/Error Message */}
        {deleteMessage.text && (
          <Alert variant={deleteMessage.type === 'success' ? 'success' : 'danger'} className="mt-3">
            {deleteMessage.text}
          </Alert>
        )}

        {/* Task List */}
        <Row>
          {tasks.map((task) => (
            <Col key={task._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text>
                    Status: {task.completed ? 'Completed' : 'Not Completed'}
                  </Card.Text>
                  <Button
                    variant={task.completed ? 'warning' : 'success'}
                    onClick={() => handleToggleComplete(task)}
                    className="me-2"
                  >
                    {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                  </Button>
                  <Button variant="info" onClick={() => handleEditTask(task)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteTask} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEditTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardPage;