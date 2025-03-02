import { model } from "@medusajs/framework/utils"

export const LaunchList = model.define("launch_list", {
  id: model.id().primaryKey(),
  email: model.text(),
  name: model.text().nullable(),
  link: model.text().nullable(),
  phone: model.text().nullable(),
  contacted: model.boolean().default(false),
  contacted_at: model.dateTime().nullable(),
})
.indexes([
  {
    on: ["email"],
    unique: true,
  },
]) 