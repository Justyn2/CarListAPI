import * as superagent from 'superagent';

interface IHttpRequest
{
  params?:any;
  data?:any;
  headers?:any;
  files?:any;
  fields?:any;
}

export default class ApiClient  {
  private token?: string;
  public request(method :'get'|'post'|'put'|'patch'|'del',) { 
        return (path:string, { params, data, headers, files, fields }:IHttpRequest = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](path);

        if (params) {
          request.query(params);
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          files.forEach((file:{key:string, value:any})=> request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach((item:{key:string, value:string}) => request.field(item.key, item.value));
        }
        if (data) {
          request.send(data)
          .then(x=>resolve(x), x=>reject(x),);
        }else{
          request.end((err:any, { body }:any = {}) => (err ? reject(body || err) : resolve(body)))
        }
      });
    }
}
