const apiUrl = "http://localhost:5173";
//
const GetAllHistory = async (id: number) => {
    const requestOptions :RequestInit= {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/history/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export { GetAllHistory }
