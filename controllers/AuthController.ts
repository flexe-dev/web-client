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
    `${process.env.NEXT_PUBLIC_API_URL}auth/findUserByEmail/${email}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}auth/signin`,
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

const UniqueUsernameCheck = async (username: string): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/findUserByUsername/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user: User | null = await response.json();
  return !!user;
};

//todo: handling image upload
const CompleteUserOnboard = async (
  userID: string,
  username: string,
  name: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/onboardUser`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, username, name }),
    }
  );
  return response.ok;
};

export {
  CreateEmailUser,
  FindUserByEmail,
  UniqueUsernameCheck,
  CompleteUserOnboard,
  CheckUserPassword,
};
