import { prisma } from "../common/prisma";
import { IncomingUser } from '../resources/users/schemas';



export async function createUser(incomingUser: IncomingUser) {
  const user = await prisma.user.create({
    data :{
        firstName: incomingUser.firstName,
        lastName:incomingUser.lastName,
        email: incomingUser.email,
        address: incomingUser.address
    }
  })
return user;
};