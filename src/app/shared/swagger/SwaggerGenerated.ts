/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.10.8.0 (NJsonSchema v10.3.11.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class AccountService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    signIn(body: InputSignInUserDto | undefined): Observable<OutputSignInUserDto> {
        let url_ = this.baseUrl + "/api/Account/SignIn";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSignIn(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSignIn(<any>response_);
                } catch (e) {
                    return <Observable<OutputSignInUserDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<OutputSignInUserDto>><any>_observableThrow(response_);
        }));
    }

    protected processSignIn(response: HttpResponseBase): Observable<OutputSignInUserDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = OutputSignInUserDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<OutputSignInUserDto>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    token(body: InputRefreshTokenDto | undefined): Observable<OutputRefreshTokenDto> {
        let url_ = this.baseUrl + "/api/Account/Token";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processToken(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processToken(<any>response_);
                } catch (e) {
                    return <Observable<OutputRefreshTokenDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<OutputRefreshTokenDto>><any>_observableThrow(response_);
        }));
    }

    protected processToken(response: HttpResponseBase): Observable<OutputRefreshTokenDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = OutputRefreshTokenDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<OutputRefreshTokenDto>(<any>null);
    }
}

@Injectable()
export class RoleService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getAll(): Observable<OutPutRoleDto[]> {
        let url_ = this.baseUrl + "/api/Role/GetAll";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<OutPutRoleDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<OutPutRoleDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<OutPutRoleDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(OutPutRoleDto.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<OutPutRoleDto[]>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addRole(body: CreateRoleDto | undefined): Observable<boolean> {
        let url_ = this.baseUrl + "/api/Role/AddRole";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAddRole(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddRole(<any>response_);
                } catch (e) {
                    return <Observable<boolean>><any>_observableThrow(e);
                }
            } else
                return <Observable<boolean>><any>_observableThrow(response_);
        }));
    }

    protected processAddRole(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<boolean>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateRole(body: UpdateRoleDto | undefined): Observable<boolean> {
        let url_ = this.baseUrl + "/api/Role/UpdateRole";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdateRole(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateRole(<any>response_);
                } catch (e) {
                    return <Observable<boolean>><any>_observableThrow(e);
                }
            } else
                return <Observable<boolean>><any>_observableThrow(response_);
        }));
    }

    protected processUpdateRole(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<boolean>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    deleteRole(id: number | undefined): Observable<boolean> {
        let url_ = this.baseUrl + "/api/Role/DeleteRole?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteRole(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteRole(<any>response_);
                } catch (e) {
                    return <Observable<boolean>><any>_observableThrow(e);
                }
            } else
                return <Observable<boolean>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteRole(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<boolean>(<any>null);
    }
}

@Injectable()
export class UserService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getAllUsers(): Observable<OutputUserDto[]> {
        let url_ = this.baseUrl + "/api/User/GetAllUsers";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllUsers(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllUsers(<any>response_);
                } catch (e) {
                    return <Observable<OutputUserDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<OutputUserDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllUsers(response: HttpResponseBase): Observable<OutputUserDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(OutputUserDto.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<OutputUserDto[]>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addUser(body: CreateUserDto | undefined): Observable<boolean> {
        let url_ = this.baseUrl + "/api/User/AddUser";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAddUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddUser(<any>response_);
                } catch (e) {
                    return <Observable<boolean>><any>_observableThrow(e);
                }
            } else
                return <Observable<boolean>><any>_observableThrow(response_);
        }));
    }

    protected processAddUser(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<boolean>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateUser(body: UpdateUserDto | undefined): Observable<boolean> {
        let url_ = this.baseUrl + "/api/User/UpdateUser";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdateUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateUser(<any>response_);
                } catch (e) {
                    return <Observable<boolean>><any>_observableThrow(e);
                }
            } else
                return <Observable<boolean>><any>_observableThrow(response_);
        }));
    }

    protected processUpdateUser(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<boolean>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    deleteUser(id: number | undefined): Observable<boolean> {
        let url_ = this.baseUrl + "/api/User/DeleteUser?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteUser(<any>response_);
                } catch (e) {
                    return <Observable<boolean>><any>_observableThrow(e);
                }
            } else
                return <Observable<boolean>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteUser(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<boolean>(<any>null);
    }
}

export class CreateRoleDto {
    name?: string | undefined;
    hasFullAccess?: boolean;

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.hasFullAccess = _data["hasFullAccess"];
        }
    }

    static fromJS(data: any): CreateRoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateRoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["hasFullAccess"] = this.hasFullAccess;
        return data; 
    }
}

export class CreateUserDto {
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    userName?: string | undefined;
    mobile?: string | undefined;
    roles?: number[] | undefined;

    init(_data?: any) {
        if (_data) {
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
            this.email = _data["email"];
            this.password = _data["password"];
            this.userName = _data["userName"];
            this.mobile = _data["mobile"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
        }
    }

    static fromJS(data: any): CreateUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        data["email"] = this.email;
        data["password"] = this.password;
        data["userName"] = this.userName;
        data["mobile"] = this.mobile;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        return data; 
    }
}

export class InputRefreshTokenDto {
    token?: string | undefined;
    refreshToken?: string | undefined;

    init(_data?: any) {
        if (_data) {
            this.token = _data["token"];
            this.refreshToken = _data["refreshToken"];
        }
    }

    static fromJS(data: any): InputRefreshTokenDto {
        data = typeof data === 'object' ? data : {};
        let result = new InputRefreshTokenDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["token"] = this.token;
        data["refreshToken"] = this.refreshToken;
        return data; 
    }
}

export class InputSignInUserDto {
    email?: string | undefined;
    password?: string | undefined;

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): InputSignInUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new InputSignInUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        return data; 
    }
}

export class OutputRefreshTokenDto {
    token?: string | undefined;
    refreshToken?: string | undefined;

    init(_data?: any) {
        if (_data) {
            this.token = _data["token"];
            this.refreshToken = _data["refreshToken"];
        }
    }

    static fromJS(data: any): OutputRefreshTokenDto {
        data = typeof data === 'object' ? data : {};
        let result = new OutputRefreshTokenDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["token"] = this.token;
        data["refreshToken"] = this.refreshToken;
        return data; 
    }
}

export class OutPutRoleDto {
    id?: number;
    name?: string | undefined;
    hasFullAccess?: boolean;

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.hasFullAccess = _data["hasFullAccess"];
        }
    }

    static fromJS(data: any): OutPutRoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new OutPutRoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["hasFullAccess"] = this.hasFullAccess;
        return data; 
    }
}

export class OutputSignInUserDto {
    token?: string | undefined;
    refreshToken?: string | undefined;
    name?: string | undefined;

    init(_data?: any) {
        if (_data) {
            this.token = _data["token"];
            this.refreshToken = _data["refreshToken"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): OutputSignInUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new OutputSignInUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["token"] = this.token;
        data["refreshToken"] = this.refreshToken;
        data["name"] = this.name;
        return data; 
    }
}

export class OutputUserDto {
    id?: number;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    userName?: string | undefined;
    mobile?: string | undefined;
    roles?: number[] | undefined;

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
            this.email = _data["email"];
            this.userName = _data["userName"];
            this.mobile = _data["mobile"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
        }
    }

    static fromJS(data: any): OutputUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new OutputUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        data["email"] = this.email;
        data["userName"] = this.userName;
        data["mobile"] = this.mobile;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        return data; 
    }
}

export class UpdateRoleDto {
    id?: number;
    name?: string | undefined;
    hasFullAccess?: boolean;

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.hasFullAccess = _data["hasFullAccess"];
        }
    }

    static fromJS(data: any): UpdateRoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateRoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["hasFullAccess"] = this.hasFullAccess;
        return data; 
    }
}

export class UpdateUserDto {
    id?: number;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    userName?: string | undefined;
    mobile?: string | undefined;
    roles?: number[] | undefined;

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
            this.email = _data["email"];
            this.userName = _data["userName"];
            this.mobile = _data["mobile"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
        }
    }

    static fromJS(data: any): UpdateUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        data["email"] = this.email;
        data["userName"] = this.userName;
        data["mobile"] = this.mobile;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        return data; 
    }
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}