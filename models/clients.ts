import {Schema, model, models} from "mongoose";

const clientSchema = new Schema(
  {
    company_name: {type: String, required: true},
    contact_name: {type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+@.+\..+/,
    },
    phone: {type: String, required: true},
    address: {type: String},
    website: {type: String},
    industry: {type: String},
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    image: {type: String},
    deleted: {type: Boolean, default: false},
    type: {
      type: String,
      enum: ["enterprise", "small_business", "individual"],
      default: "small_business",
    },
    tags: [{type: String}],
    projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
  },
  {timestamps: true},
);

export const Client = models.Client || model("Client", clientSchema);
