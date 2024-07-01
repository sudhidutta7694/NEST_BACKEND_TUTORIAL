import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateuserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    /*
    GET /users 
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }

    //Specific static routes should be defined before dynamic routes
    // @Get('interns') // GET /users/interns
    // findAllInterns() {
    //     return [];
    // }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) user: CreateuserDto) {
        return this.usersService.create(user);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateuserDto) {
        return this.usersService.update(id, userUpdate);
    }

    @Delete(':id') // DELETE /users/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
