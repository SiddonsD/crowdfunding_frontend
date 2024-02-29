import React, { useState } from 'react';
import useAuth from "../hooks/use-auth.js";
import createProject from "../api/post-projects.js";

function ProjectForm() {
    const auth = useAuth();
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        goal: '',
        is_open: true,
    })

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target
        setProjectData({
            ...projectData, 
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await createProject(projectData, auth.token);
                console.log('Project created:', response);
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
                type="text" 
                id="goal" 
                placeholder="Project Goal"
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
