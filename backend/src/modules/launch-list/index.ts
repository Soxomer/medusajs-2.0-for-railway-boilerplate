import { Module } from "@medusajs/framework/utils"
import LaunchListService from "./service"

export const LAUNCH_LIST_MODULE = "launchListService"

export default Module(LAUNCH_LIST_MODULE, {
  service: LaunchListService,
}) 