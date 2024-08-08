import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUpLocal(dto)
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
        console.log('Hey')
        return this.authService.signInLocal(dto)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number) {
        return this.authService.logout(userId);
    }

    @Public()
    @Post('refresh')
    @UseGuards(RtGuard)
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        this.authService.refreshToken(userId, refreshToken)
    }
}
