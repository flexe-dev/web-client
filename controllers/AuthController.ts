interface EmailUser {
  email: string;
  password: string;
}

const CreateEmailUser = async (credentials: EmailUser) => {
  fetch(process.env.NEXT_API_URL + "/auth/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  console.log("User created");
};

const FindUserByEmail = async (email: string) => {
  //todo: Return User Object if successful
  const response = await fetch(
    process.env.NEXT_API_URL + `/auth/FindUserByEmail/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export { CreateEmailUser, FindUserByEmail };
