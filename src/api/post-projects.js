async function createProject(projectData, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects`;
    const response = await fetch(url, {
        method: "POST",
        // need to tell server we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token`
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok){
        const errorData = await response.json().catch(() => {
            throw new Error(errorData.message || 'Failed to create project');
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();
}

export default createProject;