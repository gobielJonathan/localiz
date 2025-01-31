'use client'

import { useTranslation } from "localiz/react";

export default function TextTranlation() {
  const { t } = useTranslation();
  return <div>{t("hello", { name: "jhon doe" })}</div>;
}
