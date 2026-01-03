import httpClient from '@/lib/http';
import { StandardResponse } from '@/lib/http/types';
import { EmailAndCodeRequest, OAuth2PasswordRequestForm, SendVerificationCodeRequest, UserCredential, UserInfo, UserRegisterRequest } from '@/types/auth';
import { encryptPassword } from '@/utils/crypto-util';

export function resetPassword(id: string,username: string, newPassword: string) {
  const data = {
    id: id,
    username: username,
    new_password: encryptPassword(username, newPassword),
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
  const encryptedReq = {
    ...req,
    password: encryptPassword(req.username, req.password)
  };
  return httpClient.post<UserCredential>(
    '/auth:signInWithEmailAndPassword',
    encryptedReq,
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
  const encryptedReq = {
    ...req,
    password: encryptPassword(req.email, req.password)
  };

  return httpClient.post<StandardResponse>(
    '/auth:register',
    encryptedReq
  );
}

