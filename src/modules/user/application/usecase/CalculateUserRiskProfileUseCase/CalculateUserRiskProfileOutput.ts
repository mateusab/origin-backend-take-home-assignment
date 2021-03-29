import { InsuranceStatusEnum } from 'src/modules/insurance/enums/InsuranceStatusEnum'

export interface CalculateUserRiskProfileOutput {
  auto: InsuranceStatusEnum
  disability: InsuranceStatusEnum
  home: InsuranceStatusEnum
  life: InsuranceStatusEnum
}
