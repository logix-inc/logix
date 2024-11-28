import {Schema, model, models} from "mongoose";

const projectSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
    start_date: {type: Date},
    end_date: {type: Date},
    status: {
      type: String,
      enum: ["active", "completed", "on-hold", "cancelled"],
      default: "active",
    },
    budget: {type: Number},
    documents: [{type: String}],
    team_members: [{type: Schema.Types.ObjectId, ref: "User"}],
    client: {type: Schema.Types.ObjectId, ref: "Client", required: true},
  },
  {timestamps: true},
);

export const Project = models.Project || model("Project", projectSchema);
