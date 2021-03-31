import { InsuranceStatusEnum } from 'src/application/domain/insurance/enums/InsuranceStatusEnum'

export interface CalculateUserRiskProfileOutput {
  auto: InsuranceStatusEnum
  disability: InsuranceStatusEnum
  home: InsuranceStatusEnum
  life: InsuranceStatusEnum
}
