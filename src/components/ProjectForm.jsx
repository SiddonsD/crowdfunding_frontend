import React, { useState } from 'react';
import useAuth from "../hooks/use-auth.js";
import createProject from "../api/post-projects.js";

function ProjectForm() {
    const {auth} = useAuth();
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        goal: 0,
        image: '',
        end_date:'',
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

                const now = new Date();
                if (!formattedData.start_date) {
                    formattedData.start_date = now.toISOString();
                    let endDate = new Date(now);
                    endDate.setDate(endDate.getDate() + 90);
                    formattedData.end_date = endDate.toISOString();
                } else {
                    let startDate = new Date (formattedData.start_date);
                    if (startDate < now || startDate > new Date(now.setDate(now.getDate() + 45))) {
                        console.error('Start date cannot be more than 45 days from now.');
                        return;
                }
                let endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 90);
                formattedData.end_date = endDate.toISOString();
                }
                
                const endDate = new Date(formattedData.end_date);
                if (endDate <= now) {
                    console.error('End date must be in the future.');
                    return;
                }
                if (endDate > new Date (startDate.setDate(startDate.getDate() + 90))) {
                    console.error('End date must be within 90 days from start date.')
                }
                const response = await createProject(formattedData, auth.token);
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
                name="title"
                placeholder="Project Title"
                value={projectData.title}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                value={projectData.description}
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
                name="image"
                placeholder="Image URL"
                value={projectData.image}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="start_date">Start Date:</label>
                <input
                type="date"
                id="start_date"
                name="start_date"
                checked={projectData.start_date}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="end_date">End Date:</label>
                <input
                type="date"
                id="end_date"
                name="end_date"
                checked={projectData.end_date}
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
