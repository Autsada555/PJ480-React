const apiUrl = "http://localhost:8080";

async function LoginUser(data: {EmailOrUsername: string, password: string}) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(`${apiUrl}/login`, requestOptions);
    let res = await response.json();
    if (res.data) {
      const cookieHeader = response.headers.entries().next().value
      console.log(cookieHeader);
      console.log(document.cookie);

      return { status: true, message: res.data };
    } else {

      return { status: false, message: res.error };
    }
  } catch (error) {
    return { status: false, message: 'An error occurred: ' + error };
  }
}

export {
  LoginUser
};
