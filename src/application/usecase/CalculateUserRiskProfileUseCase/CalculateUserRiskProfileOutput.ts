import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'

export interface CalculateUserRiskProfileOutput {
  auto: InsuranceStatusEnum
  disability: InsuranceStatusEnum
  home: InsuranceStatusEnum
  life: InsuranceStatusEnum
}
