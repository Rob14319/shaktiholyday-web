
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const RichTextEditor = ({ value, onChange, label, placeholder, required = false }) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] font-mono text-sm"
        required={required}
      />
      <p className="text-xs text-muted-foreground">
        Supports basic formatting. Use line breaks for paragraphs.
      </p>
    </div>
  );
};

export default RichTextEditor;
