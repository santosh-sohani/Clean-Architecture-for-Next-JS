interface UserInput  {
    username: string;
    email: string;
  };
  
  interface UserOutput  {
    username: string;
    email: string;
    isActive: boolean;
  };
  
  export const ExampleFunction = (user: UserInput): UserOutput => {
    return {
      ...user,
      isActive: true,
    };
  };
  