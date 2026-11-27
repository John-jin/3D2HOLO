import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退货政策 | 3D2HOLO",
};

export default function ReturnPolicyPage() {
  return (
    <SimpleContentPage
      title="退货政策"
      description="由于每张成品都为订单单独定制，通常不支持无理由退换。损坏或瑕疵请在签收后 14 天内联系我们。"
    />
  );
}
