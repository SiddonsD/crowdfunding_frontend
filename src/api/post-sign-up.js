async function postSignUp(username, email, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/register`;
    const response = await fetch(url, {
        method: "POST",
        // need to tell server we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
        }),
    });

    if (!response.ok){
        const fallbackError = `Username or email already exists`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();
}

export default postSignUp;