async function postPledge(pledgeData, projectId, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledges`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": `Token ${token}`, // use token for authentication
      },
      body: JSON.stringify({
        ...pledgeData,
        project: projectId,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = "Error trying to submit pledge";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
    return await response.json();
  }
  
  export default postPledge;