export declare namespace REST {
  export interface To {
    "/login": {
      email: string;
      password: string;
    };
    "/register": {
      email: string;
      password: string;
      username: string;
      phone: string;
    };
  }
}
