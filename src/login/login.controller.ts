import { Body, Controller, Get, Post, Query, Redirect, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import * as kakao_auth from '../config/kakao_auth';
import { Response } from 'express';
import { URLSearchParams } from 'url';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('카카오 인증1')
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    
    @Get('callbacks/kakao/sign_in')
    @Redirect('', 307)
    getKakao(@Query() query) {
        return { url: `webauthcallback://success?${new URLSearchParams(query).toString()}` };
    }

    @Post('callbacks/kakao/token')
    getKakaoToken(@Body() body, @Res() response: Response) {
        kakao_auth.createFirebaseToken(body["accessToken"], (results) => {
            response.send(results);
        });
    }
}
