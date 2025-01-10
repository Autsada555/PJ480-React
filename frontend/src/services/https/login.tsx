const apiUrl = "http://localhost:8080";

async function LoginUser(data: { EmailOrUsername: string, password: string }) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  };

  try {
    const response = await fetch(`${apiUrl}/login`, requestOptions);
    const res = await response.json();
    console.log(res);
    if (res.token && res.usertypeid && res.userid && res.usertype) {
      return { status: true, token: res.token, usertypeid: res.usertypeid, userid: res.userid, usertype: res.usertype};
    } else {

      return { status: false, message: res.error };
    }
  } catch (error) {
    return { status: false, message: 'An error occurred: ' + error };
  }
}

async function LogOutUser(id: string) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };

  try {
    const response = await fetch(`${apiUrl}/logout/${id}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log out");
    }
    const data = await response.json();
    return { status: true, message: "Logout successful", data };
  } catch (error: any) {
    console.error("Error logging out:", error.message);
    return { status: false, message: error.message };
  }
}

export {
  LoginUser,
  LogOutUser
};
