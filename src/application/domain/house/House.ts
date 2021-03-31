import { OwnershipStatusEnum } from 'src/application/domain/house/OwnershipStatusEnum'

export class House {
  ownership_status: OwnershipStatusEnum

  constructor(ownership_status?: OwnershipStatusEnum) {
    this.ownership_status = ownership_status
  }

  public isHouseMortgaged = (): boolean =>
    this.ownership_status === OwnershipStatusEnum.MORTGAGED
}
