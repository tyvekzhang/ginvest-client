import httpClient from '@/lib/http';
import { StandardResponse } from '@/lib/http/types';
import { EmailAndCodeRequest, OAuth2PasswordRequestForm, SendVerificationCodeRequest, UserCredential, UserInfo, UserRegisterRequest } from '@/types/auth';

export function resetPassword(id: string, newPassword: string) {
  const data = {
    id: id,
    new_password: newPassword,
  };
  return httpClient.post<void>(
    '/auth:resetPassword', data
  );
}

export function fetchUserInfo() {
  return httpClient.get<UserInfo>(
    '/users:me',
  );
}

export function signInWithEmailAndPassword(req: OAuth2PasswordRequestForm) {
  return httpClient.post<UserCredential>(
    '/auth:signInWithEmailAndPassword',
    req,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}


export function signInWithEmailAndCode(req: EmailAndCodeRequest) {
  return httpClient.post<UserCredential>(
    '/auth:signInWithEmailAndCode',
    req,
  );
}


export function sendVerificationCode(req: SendVerificationCodeRequest) {
  return httpClient.post<StandardResponse>(
    '/auth:sendVerificationCode',
    req,
  );
}

export function register(req: UserRegisterRequest) {
  return httpClient.post<StandardResponse>(
    '/auth:register',
    req,
  );
}

