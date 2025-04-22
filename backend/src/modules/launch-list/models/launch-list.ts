import { model } from "@medusajs/framework/utils"

export const LaunchList = model.define("launch_list", {
  id: model.id().primaryKey(),
  user_type: model.enum(["seller", "buyer"]),
  email: model.text(),
  name: model.text().nullable(),
  portfolio_link: model.text().nullable(),
  phone: model.text().nullable(),
  website_link: model.text().nullable(),
  other_marketplaces: model.text().nullable(),
  features: model.text().nullable(),
  test_full_form:model.json().nullable(),
  contacted: model.boolean().default(false),
  contacted_at: model.dateTime().nullable(),
})
.indexes([
  {
    on: ["email"],
    unique: true,
  },
]) 