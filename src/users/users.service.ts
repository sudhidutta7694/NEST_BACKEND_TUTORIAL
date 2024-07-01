import { Injectable } from '@nestjs/common';
import { CreateuserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'ENGINEER'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: 'INTERN'
        },
        {
            id: 3,
            name: 'Jim Doe',
            email: 'jim@example.com',
            role: 'ADMIN'
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role);

            if (!rolesArray.length) {
                throw new NotFoundException(`No user with role ${role}`);
            }

            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) throw new NotFoundException(`User ${id} not found`);

        return user;
    }

    create(user: CreateuserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return user;
    }

    update(id: number, userUpdate: UpdateuserDto) {
        const numericId = Number(id); // Convert id to a number
        this.users = this.users.map(user => {
            if (user.id === numericId) { // Compare with numericId
                return { ...user, ...userUpdate };
            }
            return user;
        })

        return this.findOne(id);
    }

    remove(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
