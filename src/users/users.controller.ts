import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }
    @Post()
    create(@Body() user: { username: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        return this.usersService.create(user);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: { username?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.update(+id, userUpdate);
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
