async function makePledgeAPIRequest(projectId, amount, token) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({amount: parseFloat(amount)})
    });

    if (!response.ok){
        const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to make a pledge.');
        }
        
    return await response.json();
}