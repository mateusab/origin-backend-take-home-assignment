import { InsuranceLifeEnum } from '@user/enums/InsuranceLineEnum'

export interface CalculateUserRiskProfileOutput {
  auto: InsuranceLifeEnum
  disability: InsuranceLifeEnum
  home: InsuranceLifeEnum
  life: InsuranceLifeEnum
}
