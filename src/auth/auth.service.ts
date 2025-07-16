import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { SigninDto, SignupDto } from "./dto";
import * as argon from 'argon2';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}
    async signup(dto: SignupDto){
        // check existing user
        const existingUser = await this.userRepo.findOne({
            where: {email: dto.email},
        });

        if(existingUser){
            throw new ConflictException('Email already registered');
        }

        // generate the password
        const hashedPassword = await argon.hash(dto.password);
        
        // create new user
        const user = this.userRepo.create({
            email: dto.email,
            password: hashedPassword,
            name: dto.name,
        })
        // save the new user
        const savedUser = await this.userRepo.save(user);

        // Remove password before returning (for security)
        const { password, ...rest } = savedUser;
        return rest;     
    }
    
    async signin(dto: SigninDto){
        // find the user
        const existingUser = await this.userRepo.findOne({
            where: {email: dto.email},
        });

        // if user doesn't exists throw error
        if(!existingUser){
            throw new BadRequestException('Invalid email or password');
        }

        // compare password
        const isPasswordMatch = await argon.verify(existingUser.password, dto.password);

        // if password incorrect throw exception
        if(!isPasswordMatch){
            throw new BadRequestException("Invalid email or password");
        }

        return this.signToken(existingUser.id, existingUser.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {access_token: token,}
    }
}
