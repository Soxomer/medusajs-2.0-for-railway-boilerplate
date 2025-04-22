import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { LAUNCH_LIST_MODULE } from "../../../modules/launch-list"
import LaunchListService from "../../../modules/launch-list/service"

type LaunchListBody = {
  email: string
  name?: string
  user_type: "seller" | "buyer"
  portfolio_link?: string
  website_link?: string
  other_marketplaces?: string
  features?: string
  phone?: string
  full_form?: LaunchListBody
}

export async function POST(
  req: MedusaRequest<LaunchListBody>,
  res: MedusaResponse
): Promise<void> {
  const launchListService: LaunchListService = req.scope.resolve(
    LAUNCH_LIST_MODULE
  )

  const { email, name, portfolio_link, website_link, other_marketplaces, features, user_type, phone, full_form } = req.body

  try {
    const entry = await launchListService.createLaunchLists({
      email,
      name,
      user_type,
      portfolio_link,
      phone,
      website_link,
      other_marketplaces,
      features,
      test_full_form: full_form,
    })

    res.json({
      launch_list: entry,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).json(error)
  }
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const launchListService: LaunchListService = req.scope.resolve(
    LAUNCH_LIST_MODULE
  )

  try {
    const entries = await launchListService.listLaunchLists()

    res.json({
      launch_list: entries,
    })
  } catch (error) {
    res.status(400).json(error)
  }
} 