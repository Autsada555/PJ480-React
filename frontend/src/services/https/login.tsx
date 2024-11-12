const apiUrl = "http://localhost:8080";

async function LoginUser(data: {EmailOrUsername: string, password: string}) {
  const requestOptions :RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  };

  try {
    let response = await fetch(`${apiUrl}/login`, requestOptions);
    let res = await response.json();
    console.log(res);
    if (res.token && res.usertypeid && res.userid) {
      return { status: true, token: res.token, usertypeid: res.usertypeid, userid: res.userid};
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
