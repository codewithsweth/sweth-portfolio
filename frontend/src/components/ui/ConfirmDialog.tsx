"use client";

import { Button } from "./button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./dialog";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogFooter>
          <Button variant={"ghost"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
