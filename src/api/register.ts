import axios from "./request";

export async function register(username: string, password: string, mail: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve,1000));

    const response = {
        status:"success",
        message:"注册成功",
        data:{username,mail}
    }
    return response
  }