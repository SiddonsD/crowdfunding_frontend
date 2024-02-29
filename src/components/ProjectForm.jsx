import React, { useState } from 'react';
import useAuth from "../hooks/use-auth.js";
import createProject from "../api/post-projects.js";

function ProjectForm() {
    const {auth, setAuth} = useAuth();
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        goal: 0,
        image: '',
        is_open: true,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setProjectData({
            ...projectData, 
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const formattedData = {
                    ...projectData,
                    goal: parseInt(projectData.goal, 10),
                };
                const response = await createProject(projectData, auth.token);
                console.log('Project created:', response);
                // setAuth((prevAuth) => ({...prevAuth, token: newToken}));
            } catch (error) {
                console.error('Failed to create project:', error); 
            }
        };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Project Title:</label>
                <input 
                type="text" 
                id="title" 
                placeholder="Project Title"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input 
                type="text" 
                id="description" 
                placeholder="Description"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="goal">Project Goal:</label>
                <input 
                type="number" 
                id="goal" 
                name="goal"
                placeholder="Project Goal"
                value={projectData.goal}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input 
                type="url" 
                id="image" 
                placeholder="Image"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="date_created">Date Created:</label>
                <input 
                type="date" 
                id="date_created" 
                checked={projectData.date_created}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="is_open">Is Active:</label>
                <input 
                type="checkbox" 
                id="is_open" 
                checked={projectData.is_open}
                onChange={handleChange}
                />
            </div>
            <button type="submit">Launch Project</button>
        </form>
    );
}

export default ProjectForm;
