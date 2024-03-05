async function postPledge(pledgeData, projectId, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledges`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`, // use token for authentication, header must be titled 'authorization' or can lead to CORS errors
      },
      body: JSON.stringify({
        ...pledgeData,
        project: projectId,
        supporter: userName,
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

  const newPledge = await response.json();
  console.log('New pledge:', newPledge);
  return newPledge;
}
  
  export default postPledge;