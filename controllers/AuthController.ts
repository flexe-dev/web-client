import { User } from "next-auth";

interface EmailUser {
  email: string;
  password: string;
}

const CreateEmailUser = async (credentials: EmailUser): Promise<User> => {
  fetch(process.env.NEXT_API_URL + "/auth/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  console.log("User created");
};

const FindUserByEmail = async (email: string): Promise<User | null> => {
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
  if (response.status === 404) {
    return null;
  }
  const user: User = JSON.parse(await response.json());
  return user;
};

export { CreateEmailUser, FindUserByEmail };
