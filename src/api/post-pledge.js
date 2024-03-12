async function postPledge(pledgeData, projectId, token, supporterId) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;

    const requestBody = JSON.stringify({
      ...pledgeData,
      project: projectId,
      supporter: supporterId,
    });

    console.log('Request Body:', requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // use token for authentication, header must be titled 'authorization' or can lead to CORS errors
      },
      body : requestBody
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