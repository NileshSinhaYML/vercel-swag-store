export type PromoCodeResponseData = {
  active: boolean;
  code: string;
  description: string;
  discountPercent: number;
  id: string;
  title: string;
  validFrom: string;
  validUntil: string;
};

export interface PromoCodeResponse {
  success: boolean;
  data: PromoCodeResponseData;
}
