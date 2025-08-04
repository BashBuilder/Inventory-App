"use client";

import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface DownloadOptionsProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  filename?: string;
}

export const DownloadOptions = ({
  targetRef,
  filename = "receipt",
}: DownloadOptionsProps) => {
  const downloadAsImage = async () => {
    if (!targetRef.current) {
      toast.error("Receipt not found");
      return;
    }
    const loader = toast.loading("Generating image...");

    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    } finally {
      toast.dismiss(loader);
    }
  };

  const downloadAsPDF = async () => {
    if (!targetRef.current) {
      toast.error("Receipt not found");
      return;
    }
    const loader = toast.loading("Generating PDF...");

    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the receipt properly
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const margin = 20;
      const availableWidth = pdfWidth - 2 * margin;
      const ratio = Math.min(
        availableWidth / (imgWidth * 0.264583),
        (pdfHeight - 2 * margin) / (imgHeight * 0.264583),
      );

      const finalWidth = imgWidth * 0.264583 * ratio;
      const finalHeight = imgHeight * 0.264583 * ratio;

      const x = (pdfWidth - finalWidth) / 2;
      const y = margin;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

      const blob = await pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);

      const printWindow = window.open(blobUrl);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
        };
      }

      toast.success("PDF ready for printing!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      toast.dismiss(loader);
    }
  };

  return (
    <div className="mt-6 flex justify-center gap-2">
      <Button
        onClick={downloadAsImage}
        variant="outline"
        className="flex items-center gap-2"
      >
        <FileImage className="h-4 w-4" />
        Download PNG
      </Button>
      <Button
        onClick={downloadAsPDF}
        variant="outline"
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};
