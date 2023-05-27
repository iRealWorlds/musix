import { Injectable } from '@nestjs/common';
import { User } from "@api/database/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly _userRepository: Repository<User>
    ) {
    }

    async findByEmail(emailAddress: string): Promise<User|null> {
        return this._userRepository.findOneBy({
            emailAddress
        });
    }

    async findByKey(key: number): Promise<User|null> {
        return this._userRepository.findOneBy({
            id: key
        });
    }

    async create(user: User): Promise<User> {
        return this._userRepository.save(user)
    }
}
