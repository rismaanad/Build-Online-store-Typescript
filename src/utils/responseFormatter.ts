interface Meta {
    [key: string]: any;
  }
  
  interface ResponseFormat<T> {
    status: number;
    data?: T;
    meta?: Meta;
  }
  
  export const formatResponse = <T>(status: number, data?: T, meta?: Meta): ResponseFormat<T> => ({
    status,
    data,
    meta,
  });