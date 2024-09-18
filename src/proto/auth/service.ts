// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v3.12.4
// source: auth/service.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";

export const protobufPackage = "";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser | undefined;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number | undefined;
}

export interface IsAuth {
  isAuthorized: boolean;
  userId?: string | undefined;
  tokens?: Tokens | undefined;
}

export interface AuthError {
  /** Código de error, como los códigos de estado HTTP */
  code: number;
  /** Mensaje de error descriptivo */
  message: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  auth?: Auth | undefined;
  error?: AuthError | undefined;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  auth?: Auth | undefined;
  error?: AuthError | undefined;
}

export interface SignOutRequest {
  refreshToken: string;
}

export interface SignOutResponse {
  success?: boolean | undefined;
  error?: AuthError | undefined;
}

export interface IsAuthorizedRequest {
  accessToken: string;
  refreshToken: string;
}

export interface IsAuthorizedResponse {
  data?: IsAuth | undefined;
  error?: AuthError | undefined;
}

function createBaseAuthUser(): AuthUser {
  return { id: "", name: "", email: "", verified: false };
}

export const AuthUser: MessageFns<AuthUser> = {
  encode(message: AuthUser, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.verified !== false) {
      writer.uint32(32).bool(message.verified);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AuthUser {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.verified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthUser {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      verified: isSet(object.verified) ? globalThis.Boolean(object.verified) : false,
    };
  },

  toJSON(message: AuthUser): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.verified !== false) {
      obj.verified = message.verified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthUser>, I>>(base?: I): AuthUser {
    return AuthUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthUser>, I>>(object: I): AuthUser {
    const message = createBaseAuthUser();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.verified = object.verified ?? false;
    return message;
  },
};

function createBaseAuth(): Auth {
  return { accessToken: "", refreshToken: "", expiresAt: 0, user: undefined };
}

export const Auth: MessageFns<Auth> = {
  encode(message: Auth, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    if (message.expiresAt !== 0) {
      writer.uint32(24).int64(message.expiresAt);
    }
    if (message.user !== undefined) {
      AuthUser.encode(message.user, writer.uint32(34).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Auth {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expiresAt = longToNumber(reader.int64());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.user = AuthUser.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Auth {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      expiresAt: isSet(object.expiresAt) ? globalThis.Number(object.expiresAt) : 0,
      user: isSet(object.user) ? AuthUser.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: Auth): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.expiresAt !== 0) {
      obj.expiresAt = Math.round(message.expiresAt);
    }
    if (message.user !== undefined) {
      obj.user = AuthUser.toJSON(message.user);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Auth>, I>>(base?: I): Auth {
    return Auth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Auth>, I>>(object: I): Auth {
    const message = createBaseAuth();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.expiresAt = object.expiresAt ?? 0;
    message.user = (object.user !== undefined && object.user !== null) ? AuthUser.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseTokens(): Tokens {
  return { accessToken: "", refreshToken: "", expiresAt: undefined };
}

export const Tokens: MessageFns<Tokens> = {
  encode(message: Tokens, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    if (message.expiresAt !== undefined) {
      writer.uint32(24).int64(message.expiresAt);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Tokens {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expiresAt = longToNumber(reader.int64());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tokens {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      expiresAt: isSet(object.expiresAt) ? globalThis.Number(object.expiresAt) : undefined,
    };
  },

  toJSON(message: Tokens): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.expiresAt !== undefined) {
      obj.expiresAt = Math.round(message.expiresAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tokens>, I>>(base?: I): Tokens {
    return Tokens.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Tokens>, I>>(object: I): Tokens {
    const message = createBaseTokens();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.expiresAt = object.expiresAt ?? undefined;
    return message;
  },
};

function createBaseIsAuth(): IsAuth {
  return { isAuthorized: false, userId: undefined, tokens: undefined };
}

export const IsAuth: MessageFns<IsAuth> = {
  encode(message: IsAuth, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.isAuthorized !== false) {
      writer.uint32(8).bool(message.isAuthorized);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.tokens !== undefined) {
      Tokens.encode(message.tokens, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): IsAuth {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIsAuth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.isAuthorized = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tokens = Tokens.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IsAuth {
    return {
      isAuthorized: isSet(object.isAuthorized) ? globalThis.Boolean(object.isAuthorized) : false,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : undefined,
      tokens: isSet(object.tokens) ? Tokens.fromJSON(object.tokens) : undefined,
    };
  },

  toJSON(message: IsAuth): unknown {
    const obj: any = {};
    if (message.isAuthorized !== false) {
      obj.isAuthorized = message.isAuthorized;
    }
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    if (message.tokens !== undefined) {
      obj.tokens = Tokens.toJSON(message.tokens);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IsAuth>, I>>(base?: I): IsAuth {
    return IsAuth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IsAuth>, I>>(object: I): IsAuth {
    const message = createBaseIsAuth();
    message.isAuthorized = object.isAuthorized ?? false;
    message.userId = object.userId ?? undefined;
    message.tokens = (object.tokens !== undefined && object.tokens !== null)
      ? Tokens.fromPartial(object.tokens)
      : undefined;
    return message;
  },
};

function createBaseAuthError(): AuthError {
  return { code: 0, message: "" };
}

export const AuthError: MessageFns<AuthError> = {
  encode(message: AuthError, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AuthError {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthError {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: AuthError): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthError>, I>>(base?: I): AuthError {
    return AuthError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthError>, I>>(object: I): AuthError {
    const message = createBaseAuthError();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSignInRequest(): SignInRequest {
  return { email: "", password: "" };
}

export const SignInRequest: MessageFns<SignInRequest> = {
  encode(message: SignInRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SignInRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignInRequest {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: SignInRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignInRequest>, I>>(base?: I): SignInRequest {
    return SignInRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignInRequest>, I>>(object: I): SignInRequest {
    const message = createBaseSignInRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseSignInResponse(): SignInResponse {
  return { auth: undefined, error: undefined };
}

export const SignInResponse: MessageFns<SignInResponse> = {
  encode(message: SignInResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.auth !== undefined) {
      Auth.encode(message.auth, writer.uint32(10).fork()).join();
    }
    if (message.error !== undefined) {
      AuthError.encode(message.error, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SignInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.auth = Auth.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = AuthError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignInResponse {
    return {
      auth: isSet(object.auth) ? Auth.fromJSON(object.auth) : undefined,
      error: isSet(object.error) ? AuthError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignInResponse): unknown {
    const obj: any = {};
    if (message.auth !== undefined) {
      obj.auth = Auth.toJSON(message.auth);
    }
    if (message.error !== undefined) {
      obj.error = AuthError.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignInResponse>, I>>(base?: I): SignInResponse {
    return SignInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignInResponse>, I>>(object: I): SignInResponse {
    const message = createBaseSignInResponse();
    message.auth = (object.auth !== undefined && object.auth !== null) ? Auth.fromPartial(object.auth) : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AuthError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseSignUpRequest(): SignUpRequest {
  return { name: "", email: "", password: "" };
}

export const SignUpRequest: MessageFns<SignUpRequest> = {
  encode(message: SignUpRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SignUpRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignUpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignUpRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: SignUpRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignUpRequest>, I>>(base?: I): SignUpRequest {
    return SignUpRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignUpRequest>, I>>(object: I): SignUpRequest {
    const message = createBaseSignUpRequest();
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseSignUpResponse(): SignUpResponse {
  return { auth: undefined, error: undefined };
}

export const SignUpResponse: MessageFns<SignUpResponse> = {
  encode(message: SignUpResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.auth !== undefined) {
      Auth.encode(message.auth, writer.uint32(10).fork()).join();
    }
    if (message.error !== undefined) {
      AuthError.encode(message.error, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SignUpResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignUpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.auth = Auth.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = AuthError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignUpResponse {
    return {
      auth: isSet(object.auth) ? Auth.fromJSON(object.auth) : undefined,
      error: isSet(object.error) ? AuthError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignUpResponse): unknown {
    const obj: any = {};
    if (message.auth !== undefined) {
      obj.auth = Auth.toJSON(message.auth);
    }
    if (message.error !== undefined) {
      obj.error = AuthError.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignUpResponse>, I>>(base?: I): SignUpResponse {
    return SignUpResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignUpResponse>, I>>(object: I): SignUpResponse {
    const message = createBaseSignUpResponse();
    message.auth = (object.auth !== undefined && object.auth !== null) ? Auth.fromPartial(object.auth) : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AuthError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseSignOutRequest(): SignOutRequest {
  return { refreshToken: "" };
}

export const SignOutRequest: MessageFns<SignOutRequest> = {
  encode(message: SignOutRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SignOutRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignOutRequest {
    return { refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "" };
  },

  toJSON(message: SignOutRequest): unknown {
    const obj: any = {};
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignOutRequest>, I>>(base?: I): SignOutRequest {
    return SignOutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignOutRequest>, I>>(object: I): SignOutRequest {
    const message = createBaseSignOutRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseSignOutResponse(): SignOutResponse {
  return { success: undefined, error: undefined };
}

export const SignOutResponse: MessageFns<SignOutResponse> = {
  encode(message: SignOutResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.success !== undefined) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      AuthError.encode(message.error, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SignOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = AuthError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignOutResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : undefined,
      error: isSet(object.error) ? AuthError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignOutResponse): unknown {
    const obj: any = {};
    if (message.success !== undefined) {
      obj.success = message.success;
    }
    if (message.error !== undefined) {
      obj.error = AuthError.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignOutResponse>, I>>(base?: I): SignOutResponse {
    return SignOutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignOutResponse>, I>>(object: I): SignOutResponse {
    const message = createBaseSignOutResponse();
    message.success = object.success ?? undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AuthError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseIsAuthorizedRequest(): IsAuthorizedRequest {
  return { accessToken: "", refreshToken: "" };
}

export const IsAuthorizedRequest: MessageFns<IsAuthorizedRequest> = {
  encode(message: IsAuthorizedRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): IsAuthorizedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIsAuthorizedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IsAuthorizedRequest {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
    };
  },

  toJSON(message: IsAuthorizedRequest): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IsAuthorizedRequest>, I>>(base?: I): IsAuthorizedRequest {
    return IsAuthorizedRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IsAuthorizedRequest>, I>>(object: I): IsAuthorizedRequest {
    const message = createBaseIsAuthorizedRequest();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseIsAuthorizedResponse(): IsAuthorizedResponse {
  return { data: undefined, error: undefined };
}

export const IsAuthorizedResponse: MessageFns<IsAuthorizedResponse> = {
  encode(message: IsAuthorizedResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.data !== undefined) {
      IsAuth.encode(message.data, writer.uint32(10).fork()).join();
    }
    if (message.error !== undefined) {
      AuthError.encode(message.error, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): IsAuthorizedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIsAuthorizedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = IsAuth.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = AuthError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IsAuthorizedResponse {
    return {
      data: isSet(object.data) ? IsAuth.fromJSON(object.data) : undefined,
      error: isSet(object.error) ? AuthError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: IsAuthorizedResponse): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = IsAuth.toJSON(message.data);
    }
    if (message.error !== undefined) {
      obj.error = AuthError.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IsAuthorizedResponse>, I>>(base?: I): IsAuthorizedResponse {
    return IsAuthorizedResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IsAuthorizedResponse>, I>>(object: I): IsAuthorizedResponse {
    const message = createBaseIsAuthorizedResponse();
    message.data = (object.data !== undefined && object.data !== null) ? IsAuth.fromPartial(object.data) : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AuthError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

export type AuthServiceService = typeof AuthServiceService;
export const AuthServiceService = {
  signIn: {
    path: "/AuthService/signIn",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SignInRequest) => Buffer.from(SignInRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SignInRequest.decode(value),
    responseSerialize: (value: SignInResponse) => Buffer.from(SignInResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SignInResponse.decode(value),
  },
  signUp: {
    path: "/AuthService/signUp",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SignUpRequest) => Buffer.from(SignUpRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SignUpRequest.decode(value),
    responseSerialize: (value: SignUpResponse) => Buffer.from(SignUpResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SignUpResponse.decode(value),
  },
  signOut: {
    path: "/AuthService/signOut",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SignOutRequest) => Buffer.from(SignOutRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SignOutRequest.decode(value),
    responseSerialize: (value: SignOutResponse) => Buffer.from(SignOutResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SignOutResponse.decode(value),
  },
  isAuthorized: {
    path: "/AuthService/isAuthorized",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IsAuthorizedRequest) => Buffer.from(IsAuthorizedRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => IsAuthorizedRequest.decode(value),
    responseSerialize: (value: IsAuthorizedResponse) => Buffer.from(IsAuthorizedResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => IsAuthorizedResponse.decode(value),
  },
} as const;

export interface AuthServiceServer extends UntypedServiceImplementation {
  signIn: handleUnaryCall<SignInRequest, SignInResponse>;
  signUp: handleUnaryCall<SignUpRequest, SignUpResponse>;
  signOut: handleUnaryCall<SignOutRequest, SignOutResponse>;
  isAuthorized: handleUnaryCall<IsAuthorizedRequest, IsAuthorizedResponse>;
}

export interface AuthServiceClient extends Client {
  signIn(
    request: SignInRequest,
    callback: (error: ServiceError | null, response: SignInResponse) => void,
  ): ClientUnaryCall;
  signIn(
    request: SignInRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SignInResponse) => void,
  ): ClientUnaryCall;
  signIn(
    request: SignInRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SignInResponse) => void,
  ): ClientUnaryCall;
  signUp(
    request: SignUpRequest,
    callback: (error: ServiceError | null, response: SignUpResponse) => void,
  ): ClientUnaryCall;
  signUp(
    request: SignUpRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SignUpResponse) => void,
  ): ClientUnaryCall;
  signUp(
    request: SignUpRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SignUpResponse) => void,
  ): ClientUnaryCall;
  signOut(
    request: SignOutRequest,
    callback: (error: ServiceError | null, response: SignOutResponse) => void,
  ): ClientUnaryCall;
  signOut(
    request: SignOutRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SignOutResponse) => void,
  ): ClientUnaryCall;
  signOut(
    request: SignOutRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SignOutResponse) => void,
  ): ClientUnaryCall;
  isAuthorized(
    request: IsAuthorizedRequest,
    callback: (error: ServiceError | null, response: IsAuthorizedResponse) => void,
  ): ClientUnaryCall;
  isAuthorized(
    request: IsAuthorizedRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: IsAuthorizedResponse) => void,
  ): ClientUnaryCall;
  isAuthorized(
    request: IsAuthorizedRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: IsAuthorizedResponse) => void,
  ): ClientUnaryCall;
}

export const AuthServiceClient = makeGenericClientConstructor(AuthServiceService, "AuthService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AuthServiceClient;
  service: typeof AuthServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
