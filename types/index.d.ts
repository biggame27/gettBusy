// ====== USER PARAMS -> indicates what needs to be passed in parameter
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

declare type CreateTaskParams = {
  taskId: string,
  clerkId: string;
  name: string;
  date: Date;
  recurring: Boolean;
}


declare type UpdateTaskParams = {
  name: string;
  date: Number;
  month: Number;
  year: Number;
  recurring: Boolean;
};