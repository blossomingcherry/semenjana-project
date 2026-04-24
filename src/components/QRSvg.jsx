import { QRCodeSVG } from "qrcode.react";

export default function QRSvg({ size = 130, table = "" }) {
  const url = `https://domains-themes-gear-thru.trycloudflare.com/`;
  //                 ↑ ganti ini dengan IP kamu

  return (
    <QRCodeSVG
      value={url}
      size={size}
      bgColor="#ffffff"
      fgColor="#1A3A8F"
      level="M"
    />
  );
}