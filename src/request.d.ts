declare namespace Express {
  export interface Request {
    property:
      | (import("mongoose").Document<
          unknown,
          {},
          import("./properties.model").Property
        > &
          import("./properties.model").Property & {
            _id: Types.ObjectId;
          })
      | null;
  }

  export interface Request {
    property:
      | (import("mongoose").Document<
          unknown,
          {},
          import("./messages.model").Message
        > &
          import("./messages.model").Message & {
            _id: Types.ObjectId;
          })
      | null;
  }
}
