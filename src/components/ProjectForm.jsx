import React, { useState } from 'react';
import useAuth from "../hooks/use-auth.js";
import createProject from "..api/post-projects";

function ProjectForm() {
    const auth = useAuth();
    const [projectData, setProjectData] = useState({
        title: '',
        despription: '',
        goal: '',
        is_open: '',
        date_created: '',
        owner: '',
    })

    const handleChange = (event) => {
        setProjectData({...projectData, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await createProject(projectData, auth.token);
                console.log('Project created:', response);
            } catch (error) {
                console.error('Failed to create project:', error);


            if (error instanceof Response) {
                const errorData = await error.json();
                // if username already exists
                if (errorData.username) {
                    console.error('User with this username already exists.');
                // if email already exists
                } else if (errorData.email) {
                    console.error('User with this email already exists.');
                // all other errors
                } else {
                    console.error('An unknown error has occurred:', errorData);
                }
            }
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
                <label htmlFor="is_open">Email:</label>
                <input 
                type="boolean" 
                id="status" 
                placeholder="Active"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="date_created">Date Created</label>
                <input 
                type="date" 
                id="date_created" 
                placeholder="Date"
                onChange={handleChange}
                />
            </div>
            <button type="submit">Launch Project</button>
        </form>
    );
}

export default ProjectForm;
