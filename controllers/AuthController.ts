import { User } from "next-auth";

interface EmailUser {
  email: string;
  password: string;
}

const CreateEmailUser = async (credentials: EmailUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}auth/p/create`,
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

const AuthoriseUser = async (credentials: EmailUser): Promise<User | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}auth/p/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (response.status === 401) return null;

    return await response.json();
  } catch (err) {
    return null;
  }
};

export { AuthoriseUser, CreateEmailUser };
