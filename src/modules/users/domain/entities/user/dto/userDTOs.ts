export interface CreateUserDTO {
   id?: string;
   name: string;
   email: string;
   password: string;
}

export interface LoginUserDTO {
   email: string;
   password: string;
}

export interface RefreshTokenDTO {
   token: string;
}

export interface ResponseUserDTO {
   id: string;
   name: string;
   password: string;
   email: string;
}
