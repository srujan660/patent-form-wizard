
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileText, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  id: string;
  label: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  required?: boolean;
  onChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  description,
  accept = '.pdf,.doc,.docx,.jpg,.png',
  maxSizeMB = 10,
  required = false,
  onChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    setFile(selectedFile);
    onChange(selectedFile);
    toast.success('File uploaded successfully.');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    onChange(null);
    toast.info('File removed.');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      
      {!file ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors',
            isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary/50'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById(id)?.click()}
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            {accept.split(',').join(', ')} (Max: {maxSizeMB}MB)
          </p>
          <input
            id={id}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            aria-label={label}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium truncate max-w-[200px] md:max-w-xs">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={removeFile} aria-label="Remove file">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
