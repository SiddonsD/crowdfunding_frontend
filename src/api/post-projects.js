async function createProject(projectData, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok){
        const errorData = await response.json().catch(() => {
            throw new Error('Failed to create project');
        });
        const errorMessage = errorData?.detail || 'An error occured while creating the project';
        throw new Error(errorMessage);
    }
    return await response.json();
}

export default createProject;