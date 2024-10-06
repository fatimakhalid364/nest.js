import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "username": "john_doe",
            "email": "john.doe@example.com",
          
            "role": "ADMIN"
          },
          {
            "id": 2,
            "username": "jane_smith",
            "email": "jane.smith@example.com",
            "createdAt": "2024-02-20T12:30:00Z",
            "role": "ENGINEER"
          },
          {
            "id": 3,
            "username": "alice_jones",
            "email": "alice.jones@example.com",
          
            "role": "INTERN"
          },
          {
            "id": 4,
            "username": "bob_brown",
            "email": "bob.brown@example.com",
            
            "role": "ADMIN"
          }
    ]
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter (user => user.role === role)
        }
        return this.users;
    }
    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        return user;
    }
    create(user: { username: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        const userByHighestId = this.users.sort((a,b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser;
    }
    update(id: number, updatedUser: { username?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            return user; // Return the original user if the ID does not match
        });
        return this.findOne(id)
    }
    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;

    }
}
