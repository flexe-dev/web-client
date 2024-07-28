import { User } from "next-auth";

interface EmailUser {
  email: string;
  password: string;
}

const CreateEmailUser = async (credentials: EmailUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/createUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.ok;
};

const FindUserByEmail = async (email: string): Promise<User | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/find/email/${email}`,
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
  const user: User = await response.json();
  return user;
};

const CheckUserPassword = async (userID: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/checkPassword`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, password }),
    }
  );
  return response.ok;
};

export { CheckUserPassword, CreateEmailUser, FindUserByEmail };
