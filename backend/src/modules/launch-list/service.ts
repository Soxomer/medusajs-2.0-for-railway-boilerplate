import { MedusaService } from "@medusajs/framework/utils"
import { LaunchList } from "./models/launch-list"

class LaunchListService extends MedusaService({
  LaunchList,
}) {
  async markAsContacted(id: string) {
    return await this.updateLaunchLists(
      { id },
      { 
        contacted: true,
        contacted_at: new Date()
      }
    )
  }
}

export default LaunchListService 